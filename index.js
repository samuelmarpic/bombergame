var fs=require("fs");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;
var port=config.port;
var exp=require("express");
var app=exp(); 
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var srvWS=require('./servidor/servidorWS.js');
var ws=new srvWS.ServidorWS();
var modelo=require("./servidor/modelo.js");
var bodyParser=require("body-parser");

var juego=new modelo.Juego();

app.set('port', (process.env.PORT || 5000));
app.use(exp.static(__dirname + "/cliente"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


// app.get("/",function(request,response){
// 	response.send("hola");
// });

app.post("/registrarUsuario", function(request,response){
	juego.registrarUsuario(request.body, function(res){
		response.send(res)
	});
});

app.post("/iniciarSesion",function(request,response){
	juego.iniciarSesion(request.body, function(res){
		response.send(res);
	})
});


app.get("/agregarUsuario/:nick",function(request,response){
	var nick=request.params.nick;
	juego.agregarUsuario(nick,function(usr){
		response.send(usr);
	});
});

app.get("/comprobarUsuario/:nick",function(request,response){
	var nick=request.params.nick;
	juego.obtenerUsuario(nick,function(usr){
		response.send(usr);
	})
});

app.put("/actualizarUsuario",function(request,response){
    juego.actualizarUsuario(request.body,function(result){
            response.send(result);
        });
});


app.delete("/eliminarUsuario/:uid",function(request,response){
    var uid=request.params.uid;
    juego.eliminarUsuario(uid,function(result){
        response.send(result);
    });
});


app.get("/crearPartida/:nombrePartida/:nick",function(request,response){
	var nick=request.params.nick;
	var nombrePartida=request.params.nombrePartida;
	console.log("Usuario "+nick+" crea la partida "+nombrePartida);
	juego.crearPartida(nombrePartida,nick,function(partida){
		response.send(partida);
	});
});

app.get("/obtenerPartidas",function(request,response){
	juego.obtenerPartidas(function(partidas){
		response.send(partidas);
	})
});


app.get("/obtenerUsuarios",function(request,response){
	juego.obtenerUsuarios(function(usuarios){
		response.send(usuarios);
	})
});

app.get("/unirAPartida/:nombrePartida/:nick",function(request,response){
	var nick=request.params.nick;
	var nombrePartida=request.params.nombrePartida;
	console.log("Usuario "+nick+" se une a la partida "+nombrePartida);
	var partida={};
	partida=juego.unirAPartida(nombrePartida,nick);
	response.send(partida);
});

app.get("/obtenerJugadores/:nombrePartida",function(request,response){
	var nombrePartida=request.params.nombrePartida;
	juego.obtenerJugadoresPartida(nombrePartida,function(jugadores){
		response.send(jugadores);
	})
});

app.get("/cerrarSesion/:nick",function(request,response){
	var nick=request.params.nick;
	//var data={res:"nook"};
	juego.cerrarSesion(nick,function(data){
		response.send(data);
	});
});

app.get("/obtenerResultados", function(request,response){
	juego.obtenerResultados(function(resultados){
		response.send(resultados);
	})
});

app.get("/obtenerResultadosPorNick/:nick", function(request,response){
	var nick=request.params.nick;
	juego.obtenerResultadosPorNick(nick,function(resultados){
		response.send(resultados);
	})
});




//console.log("Servidor escuchando en "+host+":"+port);
//app.listen(port,host);
/*
server.listen(port, function() {
  console.log('Node app se está ejecutando en el puerto', port);
});
*/
server.listen(app.get('port'), function() {
	console.log('Node app se está ejecutando en el puerto', port);
  });

ws.lanzarSocketSrv(io,juego);