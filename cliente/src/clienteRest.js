function ClienteRest(){

	this.agregarUsuario=function(nick){
			console.log(data);
			mostrarUsuario(data);
        });
	};
	this.crearPartida=function(partida,nick){
		$.getJSON("/crearPartida/" +partida+ "/" +nick,function(data){    
			console.log(data);
        });
	};
	this.obtenerPartidas=function(){
		$.getJSON("/obtenerPartidas",function(data){    
            console.log(data);
        });
	};
	this.obtenerUsuarios=function(){
		$.getJSON("/obtenerUsuarios",function(data){    
            console.log(data);
        });
	};
	this.unirAPartida=function(partida,nick){
		$.getJSON("/unirAPartida/" +partida+ "/" +nick,function(data){    
            console.log(data);
        });
	};
	this.obtenerJugadores=function(partida,nick){
		$.getJSON("/obtenerJugadores/" +partida,function(data){    
            console.log(data);
        });
	};
};