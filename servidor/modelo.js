var dao=require("./dao.js");
var ObjectID=require("mongodb").ObjectID;
var cifrado=require("./cifrado.js");
var niv=1;
function Juego(){
	this.partidas={};
	this.usuarios={};
	this.dao=new dao.Dao();

	this.crearPartida=function(nombre,nick,callback){
		var idp=nombre+nick;
		var partida;
		if (!this.partidas[idp]){
			console.log("Nueva partida");
			partida=new Partida(nombre,idp);
			partida.agregarJugador(this.usuarios[nick]);
			//partida.jugadores[nick]=this.usuarios[nick];
			this.partidas[idp]=partida;
		}
		else{
			partida=this.partidas[idp];
		}
		callback(partida);
	}
	this.agregarUsuario=function(nombre,callback){
		if (!this.usuarios[nombre]){
			console.log("Nuevo usuario: "+nombre);
			this.usuarios[nombre]=new Usuario(nombre);
			callback(this.usuarios[nombre]);
		}
		else{
			callback({nick:""});
		}
	}
	this.obtenerUsuario=function(nick,callback){
		if (this.usuarios[nick]){
			callback(this.usuarios[nick]);
		}
		else{
			callback({nick:""});
		}
	}

	this.obtenerPartidas=function(callback){
		callback(this.partidas);
	}
	this.obtenerPartidasInicial=function(callback){
		partidas={};
		for (var key in this.partidas){
		  if (this.partidas[key].fase.nombre=="inicial"){
		    partidas[key]=this.partidas[key];
			}
		}
		callback(partidas);
	}
	this.unirAPartida=function(nombre,nick){
		var partida={};
		if (this.partidas[nombre] && this.usuarios[nick]){
			this.partidas[nombre].agregarJugador(this.usuarios[nick]);
			partida=this.partidas[nombre];
		}
		return partida;
	}
	this.cambioNivel=function(lvl){
		this.niv=lvl;
	}
	this.salir=function(idp,nick){
		if (this.partidas[idp]){
			this.partidas[idp].salir(nick);
			if (this.comprobarJugadores(idp)==0){
				this.eliminarPartida(idp);
			}
		}
		return this.partidas[idp];
	}
	this.comprobarJugadores=function(nombrePartida){
		return Object.keys(this.partidas[nombrePartida].jugadores).length;
	}
	this.eliminarPartida=function(nombrePartida){
		delete this.partidas[nombrePartida];
	}
	this.obtenerJugadoresPartida=function(nombrePartida,callback){
		var jugadores={};
		if (this.partidas[nombrePartida]){
			jugadores=this.partidas[nombrePartida].obtenerJugadores();
		}
		callback(jugadores);
	}
	this.jugadorPreparado=function(idp,nick,callback){
		//var jugadores=[];
		if (this.partidas[idp]){
			this.partidas[idp].jugadorPreparado(nick);
			this.partidas[idp].jugadores;
		}
		callback(this.partidas[idp]);
	}
	this.cerrarSesion=function(nick,callback){
		var data={res:"nook"};
		if(this.usuarios[nick]){
			delete this.usuarios[nick];			
			data={res:"ok"};
			console.log("Usuario "+nick+" cierra sesión");
		}
		callback(data);
	}
	this.enviarResultado=function(idp,nick,callback){
		if (this.partidas[idp]){
			this.partidas[idp].enviarResultado(nick);
			//this.partidas[idp].jugadores;
		}
		callback(this.partidas[idp]);
	}
	this.muereEnemigo=function(idp,nick,enemy,callback){
		if (this.partidas[idp]){
			this.partidas[idp].muereEnemigo(nick,enemy);
			//this.partidas[idp].jugadores;
		}
		callback(this.partidas[idp]);
	}
	this.jugadorHerido=function(idp,nick,callback){
		if (this.partidas[idp]){
			this.partidas[idp].jugadorHerido(nick);
			//this.partidas[idp].jugadores;
		}
		callback(this.partidas[idp]);	
	}
	this.bombaUtilizada=function(idp,nick){
		console.log(this.partidas[idp].bombasUsadas);
		if(this.partidas[idp]){
			this.partidas[idp].bombasUsadas++;
		}
	}
	this.añadirEnemigo=function(idp){
		if(this.partidas[idp]){
			this.partidas[idp].numeroBichos++;
		}
	}
	this.obtenerResultados=function(callback){
		var ju=this;
		this.dao.connect(function(db){
			ju.dao.obtenerResultados(callback);
			db.close();
		});
		
	}
	this.obtenerUsuarios=function(callback){
		var ju=this;
		this.dao.connect(function(db){
			ju.dao.obtenerUsuarios(callback);
			db.close();
		});
	}
	this.obtenerResultadosPorNick=function(nick,callback){
		var ju=this;
		this.dao.connect(function(db){
			ju.dao.obtenerResultadosCriterio({nickGanador:nick},callback);
		db.close();
	})
	}

	this.anotarResultado=function(partida, callback){
		if(this.niv==null)
			this.niv=1;
		var ju=this;
		var puntos = partida.numeroBichos*100/partida.bombasUsadas;
		var resultado=new Resultado(partida.nombre,partida.nickGanador,this.niv , partida.obtenerNickJugadores(), partida.bombasUsadas,puntos);
		this.dao.connect(function(db){
			ju.dao.insertarResultado(resultado,callback);
		db.close();
	})
	}

	this.registrarUsuario=function(usuario,callback){
		var ju=this;
		this.dao.connect(function(db){
			ju.dao.obtenerUsuarioCriterio({$or:[{nick:usuario.nick},{email:usuario.email}]},function(usr){
				if(!usr){
					usuario.clave=cifrado.encrypt(usuario.clave);
					ju.dao.registrarUsuario(usuario,function(usu){
						ju.usuarios[usu.nick]=new Usuario(usu.nick,usu._id);
						callback(usu);
					});
				}
				else{
					callback({"nick":""});
				}
				db.close();
			});
		});
	}

	this.iniciarSesion=function(usuario,callback){
		var ju=this;
		var pass=cifrado.encrypt(usuario.clave);
		this.dao.connect(function(db){
			ju.dao.obtenerUsuarioCriterio({$and:[{nick:usuario.nick},{clave:pass}]},function(usr){
				if(usr){
					ju.usuarios[usr.nick]=new Usuario(usr.nick,usr._id);
					callback(usr);
				}
				else{
					callback({"nick":""});
				}
				db.close();
			});
		})
	}

	this.actualizarUsuario=function(nuevo,callback){
		var ju=this;
        var oldC=cifrado.encrypt(nuevo.oldpass);
        var newC=cifrado.encrypt(nuevo.newpass);
		var pers=this.dao;
		this.dao.connect(function(db){
			ju.dao.obtenerUsuarioCriterio({_id:ObjectID(nuevo.uid),clave:oldC},function(usr){
				if(usr){
					usr.clave=newC;
					pers.modificarColeccionUsuarios(usr,function(nusu){
						   console.log("Usuario modificado");
						   callback(usr);
					});
				}
				else{
					callback({email:undefined});    
				}
				db.close();
			});
		});
    }
	this.eliminarUsuario=function(uid,callback){
		var ju = this;
		var json={'resultados':-1};
		this.dao.connect(function(db){
			ju.dao.eliminarUsuario(uid,function(result){
				if (result.result.n==0){
					console.log("No se pudo eliminar de usuarios");
				}
				else{
					json={"resultados":1};
					console.log("Usuario eliminado de usuarios");
					callback(json);
				}
				db.close();
			}); 
		})

    }

}

function Partida(nombre,idp){
	this.nombre=nombre;
	this.nickGanador="los bichos";
	this.nivel=1;
	this.idp=idp;
	this.jugadores={};
	this.enemigos={};
	this.numeroEnemigos=4;
	this.fase=new Inicial();
	this.numJugadores=0;
	this.bombasUsadas=0;
	this.numeroBichos=0;
	this.posiciones=[{x:16,y:32},{x:16,y:224}];

	this.agregarJugador=function(usr){
		this.fase.agregarJugador(usr,this);
	}
	this.puedeAgregarJugador=function(usr){
		usr.ini();
		this.jugadores[usr.nick]=usr;
	}
	this.obtenerJugadores=function(){
		return this.jugadores;
	}
	this.salir=function(nick){
		delete this.jugadores[nick];
	}
	this.jugadorPreparado=function(nick){
		this.fase.jugadorPreparado(nick,this);
	}
	this.todosPreparados=function(){
		res=true;
		for (var key in this.jugadores){
		  if (this.jugadores[key].estado=="no preparado"){
		    res=false;
			}
		}
		return res;
	}
	this.setTodosVivos=function(){        
        for (var key in this.jugadores){
          this.jugadores[key].estado="vivo";          
        }
        this.numJugadores=Object.keys(this.jugadores).length;
	}
	this.asignarPosicion=function(){
        var ind=0;
        for (var key in this.jugadores){
             this.jugadores[key].posicion=this.posiciones[ind];
             ind++;
        }
    }


	this.todosMuertos=function(){
		res=true;
		for (var key in this.jugadores){
		  if (this.jugadores[key].estado!="muerto"){
		    res=false;
			}
		}
		return res;
	}
	this.enviarResultado=function(nick){
		this.fase.enviarResultado(nick,this);
	}
	this.comprobarJugadores=function(){
		//console.log(jugadores);
		for (var key in this.jugadores){
		  if (this.jugadores[key].vidas<=0){
		    this.jugadores[key].estado="muerto";
		    console.log("jugador muere");
			}
		}
	}
	this.comprobarGanador=function(){
		ganador={vidas:0};
		for (var key in this.jugadores){
		  if (this.jugadores[key].vidas>ganador.vidas){
			ganador=this.jugadores[key];
			this.nickGanador=key;
			}
		}
	}
	this.muereEnemigo=function(nick,enemy){
		this.fase.muereEnemigo(nick,enemy,this);
	}
	this.jugadorHerido=function(nick){
		this.fase.jugadorHerido(nick,this);
	}
	this.obtenerNickJugadores=function(){
		res=[];
		for (var key in this.jugadores){
			res.push(key);
		}
		return res;
	}
}

function Inicial(){
	var contexto=this;
	this.nombre="inicial";
	this.agregarJugador=function(usr,partida){
		partida.puedeAgregarJugador(usr);
	}
	this.jugadorPreparado=function(nick,partida){
        partida.jugadores[nick].estado="preparado";
        if (partida.todosPreparados()){
            partida.fase=new Jugando();
            partida.setTodosVivos();
			partida.asignarPosicion();
        }
    }

	this.enviarResultado=function(nick,partida){
		console.log("La partida no se ha iniciado");
	}
	this.muereEnemigo=function(nick,partida){
		console.log("La partida no se ha iniciado");
	}
	this.jugadorHerido=function(nick,partida){
		console.log("La partida no se ha iniciado");
	}
}

function Jugando(){
	this.nombre="jugando";
	this.agregarJugador=function(usr,partida){
		console.log("El juego ya ha comenzado");
	}
	this.jugaddorPreparado=function(nick,partida){
		console.log("la partida ya ha comenzado");
	}
	this.enviarResultado=function(nick,partida){
		//anotar resultado
		// if (resultado.vidas<=0){
		// 	partida.jugadores[nick].estado="muerto";
		// }
		partida.comprobarJugadores();

		if (partida.todosMuertos()){
			partida.fase=new Final();
		}
		//comprobar que alguien haya ganado
	}
	this.muereEnemigo=function(nick,enemy,partida){
		//partida.numeroEnemigos=partida.numeroEnemigos-1;
		partida.enemigos[enemy]=enemy;
		console.log("muere enemigo");
		if (Object.keys(partida.enemigos).length>=partida.numeroEnemigos){
			partida.comprobarGanador();
			partida.fase=new Final();
		}
	}
	this.jugadorHerido=function(nick,partida){
		if (partida.jugadores[nick].estado=="vivo"){
			partida.jugadores[nick].vidas=partida.jugadores[nick].vidas-1;
			console.log("Jugador pierde 1 vida");
			partida.comprobarJugadores();
			if (partida.todosMuertos()){
				partida.fase=new Final();
			}
		}
	}
}

function Final(){
	this.nombre="final";
	this.agregarJugador=function(usr,partida){
		console.log("El juego ya ha terminado");
	}
	this.enviarResultado=function(nick,partida){
		console.log("La partida ha terminado");
	}
	this.muereEnemigo=function(nick,partida){
		console.log("La partida ha terminado");
	}
	this.jugadorHerido=function(nick,partida){
		console.log("La partida ha terminado");
	}
}

function Usuario(nick){
	this.nick=nick;
	this.estado="no preparado";
	this.vidas=3;
	this.ini=function(){
		this.estado="no preparado";
		this.vidas=3;
	}
}
function Resultado(nombrePartida,nickGanador,nivel,jugadores,bombas,puntos){
	this.nivel=nivel;
	this.nickGanador=nickGanador;
	this.nombrePartida=nombrePartida;
	this.jugadores=jugadores; //son solo los nicks de los jugadores
	this.bombas=bombas;
	this.puntos=puntos;
}

module.exports.Juego=Juego;