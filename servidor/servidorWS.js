function ServidorWS(){
	this.enviarRemitente=function(socket,mens,datos){
        socket.emit(mens,datos);
    }
    this.enviarATodos=function(io,nombre,mens,datos){
        io.sockets.in(nombre).emit(mens,datos);
    }
    this.enviarATodosMenosRemitente=function(socket,nombre,mens,datos){
        socket.broadcast.to(nombre).emit(mens,datos)
    };
    this.lanzarSocketSrv=function(io,juego){
    	var cli=this;
    	io.on('connection',function(socket){
    		console.log("Nueva conexión");
    		socket.on('crearPartida', function(nick,nombrePartida){
    			juego.crearPartida(nombrePartida,nick,function(partida){
					cli.enviarRemitente(socket,"partidaCreada",partida);
					socket.join(partida.idp);
				});
    		});
    		socket.on('obtenerPartidas',function(){
    			juego.obtenerPartidasInicial(function(partidas){
					cli.enviarRemitente(socket,"partidas",partidas);
				});
            });
            socket.on('historialPartidas', function(){
                juego.obtenerResultados(function(resultados){
                    cli.enviarRemitente(socket,"resultados",resultados);
                })
            })
    		socket.on("unirAPartida",function(idp,nick){
    			var partida=juego.unirAPartida(idp,nick);
    			socket.join(idp);
    			cli.enviarRemitente(socket,"unido",partida);
    			cli.enviarATodosMenosRemitente(socket,idp,"nuevoJugador",partida.jugadores);
    		});
    		socket.on("salir",function(idp,nick){
    			var partida=juego.salir(idp,nick);                
    			cli.enviarRemitente(socket,"saliste");
                if (partida!=undefined){
        			cli.enviarATodosMenosRemitente(socket,idp,"saleJugador",partida.jugadores);
                }
    		});
            socket.on("preparado",function(idp,nick){
                juego.jugadorPreparado(idp,nick,function(partida){
                    cli.enviarATodos(io,idp,"otropreparado",partida.jugadores);                    
                    if (partida.fase.nombre=="jugando"){
                        cli.enviarATodos(io,idp,"aJugar",{numJugadores:partida.numJugadores,jugadores:partida.jugadores});
                    }
                });                
            });

            socket.on("enviarResultado",function(idp,nick){
                juego.enviarResultado(idp,nick,function(partida){ //function(resultados) 
                    if (partida && partida.fase.nombre=="final"){
                        cli.enviarATodos(io,idp,"finPartida",{}); //resultados
                        juego.anotarResultado(partida);
                    }
                    else{
                        juego.anotarResultado(partida,function(){}); // ,resultados);
                    }
                });
            });
            socket.on("muereEnemigo",function(idp,nick,enemy){
                juego.muereEnemigo(idp,nick,enemy,function(partida){
                    if (partida && partida.fase.nombre=="final"){
                        cli.enviarATodos(io,idp,"finPartida",{}); //resultados
                        juego.anotarResultado(partida,function(){});
                    }
                    else{
                        cli.enviarRemitente(socket,"anotado"); // ,resultados);
                    }
                })
            });
            socket.on("jugadorHerido",function(idp,nick){
                juego.jugadorHerido(idp,nick,function(partida){
                    if (partida && partida.fase.nombre=="final"){
                        cli.enviarATodos(io,idp,"finPartida",{}); //resultados
                        juego.anotarResultado(partida,function(){});
                    }
                    else{
                        cli.enviarRemitente(socket,"sigueVivo"); // ,resultados);
                    }
                })
            });
            socket.on("bombaUtilizada",function(idp,nick){
                juego.bombaUtilizada(idp,nick,function(){});
            });
            socket.on("añadirEnemigo",function(idp){
                juego.añadirEnemigo(idp,function(partida){});
            });
            socket.on("mover",function(idp,nick,operacion,posicion){
                cli.enviarATodosMenosRemitente(socket,idp,"mover",operacion,posicion);
            });
            socket.on("cambioNivel",function(lvl){
                juego.cambioNivel(lvl);
            })
    	});
    }
}

module.exports.ServidorWS=ServidorWS;