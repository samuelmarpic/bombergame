
function Juego(){
	this.partidas={};
	this.usuarios={};

	this.crearPartida=function(nombre,nick,callback){
		var idp=nombre+nick;
		var partida;
		if(!this.partidas[idp]){
			console.log("Nueva partida:"+nombre+nick);
			partida=new Partida(nombre,idp);
			partida.agregarJugador(this.usuarios[nick]);
			this.partidas[idp]=partida;
		}
		else{
			partida=this.partidas[idp];
		}
		callback(partida);
	}
	this.agregarUsuario=function(nombre,callback){
		if(!this.usuarios[nombre]){
			console.log("Nuevo usuario:"+nombre);
			this.usuarios[nombre]=new Usuario(nombre);
		}
		callback(this.usuarios[nombre]);
	}
	this.obtenerPartidas=function(callback){
		callback(this.partidas);
	}
	this.obtenerUsuarios=function(callback){
		callback(this.usuarios);
	}
	this.obtenerJugadores=function(partida,callback){
		if(this.partidas[partida]){
			var jugadores= this.partidas[partida].obtenerJugadores();
		}
		callback(jugadores);
	}
	this.unirAPartida=function(nombre,nick, callback){
		if(this.partidas[nombre] && this.usuarios[nick]){
			console.log("Se ha unido a la partida:"+nombre+" el jugador " +nick);
			this.partidas[nombre].agregarJugador(this.usuarios[nick]);
		}
		callback(this.partidas[nombre]);
	}
	this.salir=function(nombrePartida,nick){
		this.partidas[nombrePartida].salir(nick);
		if(this.comprobarJugadores(nombrePartida)==0){
			this.eliminarPartida(nombrePartida);
		}
	}
	this.comprobarJugadores=function(nombrePartida){
		return Object.keys(this.partidas[nombrePartida].jugadores).length;
	}
	this.eliminarPartida=function(nombrePartida){
		delete this.partidas[nombrePartida];
	}
}

function Partida(nombre,idp){
    this.nombre=nombre;
    this.idp=idp;
    this.jugadores={}
    this.fase=new Inicial();
    this.agregarJugador=function(usr){
        this.fase.agregarJugador(usr,this);
    }
    this.puedeAgregarJugador=function(usr){
        this.jugadores[usr.nick]=usr;
    }
    this.salir=function(nick){
    	delete this.jugadores[nick];
    }
    this.obtenerJugadores=function(){
    	return this.jugadores;
    }
}


function Inicial(){
	this.nombre="inicial";
	this.agregarJugador=function(usr,partida){
		partida.puedeAgregarJugador(usr);
	}
}

function Jugando(){
	this.nombre="jugando";
	this.agregarJugador=function(usr,partida){
		console.log("El juego ya ha comenzado");
	}
}

function Final(){
	this.nombre="final";
	this.agregarJugador=function(usr,partida){
		console.log("El juego ya ha terminado")
	}
}

function Usuario(nick){
	this.nick=nick;
}
module.exports.Juego=Juego;
