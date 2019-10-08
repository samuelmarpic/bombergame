var fs=require("fs");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;
var port=config.port;
var exp=require("express");
var app=exp();
var modelo=require("./servidor/modelo.js");

var juego=new modelo.Juego();
//app.use(app.router);
app.use(exp.static(__dirname + "/cliente"));

/*
app.get("/",function(request,response){
	response.send("hola");
});
*/
app.get("/agregarUsuario/:nick",function(request,response){
	//esta ruta sirve para crear usuarios
	var nick=request.params.nick;
	juego.agregarUsuario(nick,function(usr){
		response.send(usr);
	});
});
app.get("/crearPartida/:partida/:nick",function(request,response){
	//esta ruta sirve para crear usuarios
	var partida=request.params.partida;
	var nick=request.params.nick;
	juego.crearPartida(partida,nick,function(partida){
		response.send(partida);
	});
});
app.get("/obtenerPartidas",function(request,response){
	//esta ruta sirve para crear usuarios
	juego.obtenerPartidas(function(partidas){
		response.send(partidas);
	})
});
app.get("/obtenerUsuarios",function(request,response){
	//esta ruta sirve para crear usuarios
	juego.obtenerUsuarios(function(usuarios){
		response.send(usuarios);
	})
});
app.get("/unirAPartida/:partida/:nick",function(request,response){
	//esta ruta sirve para crear usuarios
	var partida=request.params.partida;
	var nick=request.params.nick;
	juego.unirAPartida(partida,nick,function(partida){
		response.send(partida);
	});
});
app.get("/obtenerJugadores/:partida",function(request,response){
	//esta ruta sirve para crear usuarios
	var partida=request.params.partida;
	juego.obtenerJugadores(partida,function(jugadores){
		response.send(jugadores);
	});
});
console.log("Servidor escuchando en "+host+":"+port);
app.listen(port,host);