
var nick;
var lvl = 1;
var bombas = 0;

function comprobarUsuario(){
	if ($.cookie("usr")){
		console.log("no inicio sesion")
		rest.comprobarUsuario();
	}
	else{
		//registrarUsuario();
		iniciarSesion();
		
	}
}

function mostrarAgregarUsuario(){
	$('#mLP').remove();
	$('#mP').remove();
	$('#mCP').remove();
	var cadena="<div id='mAU'>";
	cadena=cadena+"<h3>Usuario</h3>";
	cadena=cadena+"<div class='row'><div class='col-sm-6'>";
	cadena=cadena+'<input id="nombre" type="text" class="form-control" name="nombre" placeholder="Nombre usuario">';		
	cadena=cadena+"</div><div class='col-sm-6'>"
	cadena=cadena+'<button type="button" id="inicioBtn" class="btn btn-primary btn-md">Iniciar Usuario</button>';	
	cadena=cadena+"</div></div>";

	$('#inicio').append(cadena);
	$('#inicioBtn').on('click',function(){
		
		//control xss
		if($('#nombre').val().indexOf("<")==-1){
			var nombre=$('#nombre').val();
		};	
        if (nombre==""){
        	nombre="Neutro";
        }
        rest.agregarUsuario(nombre);
     });
}

function mostrarUsuario(data){
	$('#mAU').remove();
	$('#registroUsuario').remove();
	ws=new ClienteWS(data.nick);
	ws.ini();
	nick=data.nick;
	mostrarCrearPartida(data.nick);
}

function mostrarAviso(msg){
	alert(msg);
	$('#nombre').val("Email o nick no disponibles");
}
function registrarUsuario(){
	$('#mCP').remove();
	$('#iniciarSesion').remove();
	var formulario = this;

	var cadena="<div id='registrarUsuario'>";
	cadena=cadena+'<div class="container">';
	cadena=cadena+'<div class="d-flex justify-content-center h-100">';
	cadena=cadena+'<div class="card">';
	cadena=cadena+'<div class="card-header">';
	cadena=cadena+'<h3>Registrarme</h3>';
	cadena=cadena+'</div>';
	cadena=cadena+'<div class="card-body">';
	cadena=cadena+'<form>';
	cadena=cadena+'<div class="input-group form-group">';
	cadena=cadena+'<div class="input-group-prepend">';
	cadena=cadena+'<span class="input-group-text"><i class="fas fa-envelope"></i></span>';
	cadena=cadena+'</div>';
	cadena=cadena+'<input id="email" type="text" class="form-control" placeholder="email">';
	cadena=cadena+'</div>';
	cadena=cadena+'<div class="input-group form-group">';
	cadena=cadena+'<div class="input-group-prepend">';
	cadena=cadena+'<span class="input-group-text"><i class="fas fa-envelope"></i></span>';
	cadena=cadena+'</div>';
	cadena=cadena+'<input id="email2" type="text" class="form-control" placeholder="repetir email">';
	cadena=cadena+'</div>';
	cadena=cadena+'<div class="input-group form-group">';
	cadena=cadena+'<div class="input-group-prepend">';
	cadena=cadena+'<span class="input-group-text"><i class="fas fa-user"></i></span>';
	cadena=cadena+'</div>';
	cadena=cadena+'<input id="nick" type="text" class="form-control" placeholder="nick">';
	cadena=cadena+'</div>';
	cadena=cadena+'<div class="input-group form-group">';
	cadena=cadena+'<div class="input-group-prepend">';
	cadena=cadena+'<span class="input-group-text"><i class="fas fa-key"></i></span>';
	cadena=cadena+'</div>';
	cadena=cadena+'<input id="clave" type="password" class="form-control" placeholder="contraseña">';
	cadena=cadena+'</div>';
	cadena=cadena+'<div class="form-group">';
	cadena=cadena+'<button type="button" id="registrarUsuarioBtn" class="btn float-right login_btn">Registrarme</button>';
	cadena=cadena+'</div>';
	cadena=cadena+'</form>';
	cadena=cadena+'</div>';
	cadena=cadena+'<div class="card-footer">';
	cadena=cadena+'<div class="d-flex justify-content-center links">';
	cadena=cadena+'Ya tienes cuenta?<button type="button" id="iniciarSesionBtn" >Iniciar Sesion</button>';
	cadena=cadena+'</div>';
	cadena=cadena+'</div>';
	cadena=cadena+'</div>';
	cadena=cadena+'</div>';
	cadena=cadena+'</div>';
	cadena=cadena+'</div>';

/*
	var cadena="<div id='registroUsuario'>";
	cadena=cadena+"<h3>Sign Up</h3>";
	cadena=cadena+"<div class='row'><div class='col-sm-6'>";
	cadena=cadena+'<input id="email" type="text" class="form-control" name="email" placeholder="Email del usuario">';
	cadena=cadena+"<h3>Repetir email</h3>";		
	cadena=cadena+'<input id="email2" type="text" class="form-control" name="email2" placeholder="Repetir email del usuario">';
	cadena=cadena+'<input id="nick" type="text" class="form-control" name="nick" placeholder="Nick del usuario">';
	cadena=cadena+'<input id="clave" type="text" class="form-control" name="clave" placeholder="Clave del usuario">';
	cadena=cadena+"</div><div class='col-sm-6'>"
	cadena=cadena+'<button type="button" id="registrarUsuarioBtn" class="btn btn-primary btn-md">Registrar</button>';	
	cadena=cadena+"</div></div>";
*/
	$('#inicio').append(cadena);
	$('#registrarUsuarioBtn').on('click',function(){

		//control xss
		if($('#email').val().indexOf("<")==-1){
			var email=$('#email').val();
		}
		else{
			var email="";
		}
		//control xss
		if($('#email2').val().indexOf("<")==-1){
			var email2=$('#email2').val();
		}
		else{
			var email2="";
		}
		//control xss
		if($('#nick').val().indexOf("<")==-1){
			var nick=$('#nick').val();
		}
		else{
			var nick="";
		}
		//control xss
		if($('#clave').val().indexOf("<")==-1){
			var clave=$('#clave').val();
		}
		else{
			var clave="";
		}
		if(email==email2){
			rest.registrarUsuario(nick,email,clave);
		}
		else {
			alert("Los emails no coinciden");
		}
		
});
$('#iniciarSesionBtn').on('click',function(){
	formulario.iniciarSesion();
})
}

function iniciarSesion(){
	var formulario = this;
	$('#mCP').remove();
	$('#registrarUsuario').remove();
	$('#iniciarSesion').remove();
	$('#modificarUsr').remove();

	var cadena="<div id='iniciarSesion'>";
	cadena=cadena+'<div class="container">';
	cadena=cadena+'<div class="d-flex justify-content-center h-100">';
	cadena=cadena+'<div class="card">';
	cadena=cadena+'<div class="card-header">';
	cadena=cadena+'<h3>Iniciar Sesión</h3>';
	cadena=cadena+'<div class="d-flex justify-content-end social_icon">';
	cadena=cadena+'<span><i class="fab fa-facebook-square"></i></span>';	
	cadena=cadena+'<span><i class="fab fa-google-plus-square"></i></span>';
	cadena=cadena+'<span><i class="fab fa-twitter-square"></i></span>';
	cadena=cadena+'</div>';
	cadena=cadena+'</div>';
	cadena=cadena+'<div class="card-body">';
	cadena=cadena+'<form>';
	cadena=cadena+'<div class="input-group form-group">';
	cadena=cadena+'<div class="input-group-prepend">';
	cadena=cadena+'<span class="input-group-text"><i class="fas fa-user"></i></span>';
	cadena=cadena+'</div>';
	cadena=cadena+'<input id="nick" type="text" class="form-control" placeholder="nick">';
	cadena=cadena+'</div>';
	cadena=cadena+'<div class="input-group form-group">';
	cadena=cadena+'<div class="input-group-prepend">';
	cadena=cadena+'<span class="input-group-text"><i class="fas fa-key"></i></span>';
	cadena=cadena+'</div>';
	cadena=cadena+'<input id="clave" type="password" class="form-control" placeholder="contraseña">';
	cadena=cadena+'</div>';
	cadena=cadena+'<div class="row align-items-center remember">';
	cadena=cadena+'<input type="checkbox">Recuérdame';
	cadena=cadena+'</div>';
	cadena=cadena+'<div class="form-group">';
	cadena=cadena+'<button type="button" id="iniciarSesionBtn" class="btn float-right login_btn">Iniciar Sesión</button>';
	cadena=cadena+'</div>';
	cadena=cadena+'</form>';
	cadena=cadena+'</div>';
	cadena=cadena+'<div class="card-footer">';
	cadena=cadena+'<div class="d-flex justify-content-center links">';
	cadena=cadena+'No tienes cuenta?<button type="button" id="registrarseBtn" >Regístrate</button>';
	cadena=cadena+'</div>';
	cadena=cadena+'<div class="d-flex justify-content-center">';
	cadena=cadena+'<a href="#">¿Has olvidado tu contraseña?</a>';
	cadena=cadena+'</div>';
	cadena=cadena+'</div>';
	cadena=cadena+'</div>';
	cadena=cadena+'</div>';
	cadena=cadena+'</div>';
	cadena=cadena+'</div>';

	$('#inicio').append(cadena);


	$('#iniciarSesionBtn').on('click',function(){
		
		//control xss
		if($('#nick').val().indexOf("<")==-1){
			var nick=$('#nick').val();
		}
		else{
			var nick="";
		}

		//control xss
		if($('#clave').val().indexOf("<")==-1){
			var clave=$('#clave').val();
		}
		else{
			var clave="";
		}

		rest.iniciarSesion(nick,clave);
	});
	
	$('#registrarseBtn').on('click',function(){
		formulario.registrarUsuario();
	});
}
function modificarUsr(){
	$('#mCP').remove();
	var cadena="<div id='modificarUsr'>";
	cadena=cadena+"<h3>Modificar contraseña de "+nick+"</h3>";
	cadena=cadena+'<div class="input-group form-group">';
	cadena=cadena+'<div class="input-group-prepend">';
	cadena=cadena+'<span class="input-group-text"><i class="fas fa-key"></i></span>';
	cadena=cadena+'</div>';
	cadena=cadena+'<input id="vieja" type="password" class="form-control" placeholder="Contraseña vieja">';
	cadena=cadena+'</div>';
	cadena=cadena+'<div class="input-group form-group">';
	cadena=cadena+'<div class="input-group-prepend">';
	cadena=cadena+'<span class="input-group-text"><i class="fas fa-key"></i></span>';
	cadena=cadena+'</div>';
	cadena=cadena+'<input id="nueva" type="password" class="form-control" placeholder="Contraseña nueva">';
	cadena=cadena+'</div>';
	cadena=cadena+'<div class="input-group form-group">';
	cadena=cadena+'<div class="input-group-prepend">';
	cadena=cadena+'<span class="input-group-text"><i class="fas fa-key"></i></span>';
	cadena=cadena+'</div>';
	cadena=cadena+'<input id="nueva2" type="password" class="form-control" placeholder="Repetir contraseña nueva">';
	cadena=cadena+'</div>';
	cadena=cadena+'<div class="form-group">';
	cadena=cadena+'<button type="button" id="modificarBtn" class="btn float-right login_btn">Cambiar Contraseña</button>';
	cadena=cadena+'</div>';

	$('#inicio').append(cadena);
	//poner los imputs, los botones y llamar  la api, a la vuelta volver al login

	$('#modificarBtn').on('click',function(){
		
		//control xss
		if($('#vieja').val().indexOf("<")==-1){
			var vieja=$('#vieja').val();
		}
		else{
			var vieja="";
		}
		//control xss
		if($('#nueva').val().indexOf("<")==-1){
			var nueva=$('#nueva').val();
		}
		else{
			var nueva="";
		}
		//control xss
		if($('#nueva2').val().indexOf("<")==-1){
			var nueva2=$('#nueva2').val();
		}
		else{
			var nueva2="";
		}



		if(nueva==nueva2){
			rest.actualizarUsuario(vieja,nueva);
		}
		else{
			alert("La contraseña nueva no coincide");
		}
	});

}
function mostrarCrearPartida(nick){
	var formulario = this;
	$('#mCP').remove();
	$('#mLP').remove();
	$('#mP').remove();
	$('#iniciarSesion').remove();
	$('#registrarUsuario').remove();
	$('#modificarUsr').remove();
	var cadena="<div id='mCP'>";
	cadena=cadena+"<h3>Bienvenido "+nick+"</h3>";
	cadena=cadena+"<div class='row'>";
	cadena=cadena+'<p><button type="button" id="cerrarSesion" class="btn float-left crearPartida_btn" onclick="rest.cerrarSesion()">Cerrar sesión</button></p>';
	cadena=cadena+'<p><button type="button" id="modificarUsuario" class="btn float-left crearPartida_btn" >Modificar usuario</button></p>';
	cadena=cadena+'<p><button type="button" id="eliminarUsuario" class="btn float-left crearPartida_btn" >Eliminar usuario</button></p><br></br>';
	cadena=cadena+"</div>";
	cadena=cadena+"<div class='row'><div class='col-sm-8'>";
	cadena=cadena+"<h3>Crear Partida</h3>";
	cadena=cadena+'<input id="nombrePartida" type="text" class="form-control" name="nombrePartida" placeholder="Nombre partida"><br></br>';		
	cadena=cadena+'<button type="button" id="crearPartidaBtn" class="btn float-left crearPartida_btn">Crear partida</button>';	
	cadena=cadena+'<button type="button" id="historialPartidasBtn" class="btn float-left historialPartidas_btn">Historial de Partidas</button>';
	cadena=cadena+"</div><div class='col-sm-4'><h3>Unirse</h3>";
	cadena=cadena+'<button type="button" id="unirseAPartidaBtn" class="btn float-left crearPartida_btn">Unirse a partida</button>';
	cadena=cadena+"</div></div>";

	$('#inicio').append(cadena);
	$('#crearPartidaBtn').on('click',function(){
		//control xss
		if($('#nombrePartida').val().indexOf("<")==-1){
			var nombre=$('#nombrePartida').val();
		};		
        if (nombre==""){
        	nombre="SinNombre";
        }
        //rest.crearPartida(nombre,nick);
        ws.crearPartida(nombre);
	 });
	 $('#historialPartidasBtn').on('click',function(){
		ws.historialPartidas();
		console.log("boton funciona");
     }); 
	
	$('#unirseAPartidaBtn').on('click',function(){
        //rest.obtenerPartidas();
        ws.obtenerPartidas();
     });
	$('#eliminarUsuario').on('click',function(){

		rest.eliminarUsuario();
	});
	$('#modificarUsuario').on('click',function(){
		formulario.modificarUsr();
	});
}

function mostrarPartida(data){
	$('#mCP').remove();
	$('#mLP').remove();
	var cadena="<div id='mP'>";
	cadena=cadena+"<h3>Bienvenido a la partida: "+data.nombre+"</h3>";
	cadena=cadena+'<p><button type="button" id="preparadoBtn" class="btn crearPartida_btn" onclick="ws.preparado()"">Preparado</button>';
	cadena=cadena+' <button type="button" id="salirBtn" class="btn crearPartida_btn" onclick="ws.salir()"">Salir</button></p>';

	cadena=cadena+' <div id="mainselection"><select id="seleccion"><option>Nivel 1</option><option>Nivel 2</option><option>Nivel 3</option></select></div></div>';
	$('#inicio').append(cadena);
	const checkbox = document.getElementById('seleccion')
	this.lvl=1;
	checkbox.addEventListener('change', () => {
		if(document.getElementById("seleccion").value == "Nivel 1"){
			ws.cambioNivel(1);
			this.lvl = 1
		}
		else if (document.getElementById("seleccion").value == "Nivel 2"){
			ws.cambioNivel(2);
			this.lvl = 2
		}
		else if (document.getElementById("seleccion").value == "Nivel 3"){
			ws.cambioNivel(3);
			this.lvl = 3
		}
		else {
			this.lvl = 1;
		}
		 
	})
}
function mostrarHistorialPartidas(data){
	console.log(Object.keys(data).length);
	for(var i in data){
		if(data[i].nickGanador!=(nick)){
			delete data[i];
		}
	}
	$('#mCP').remove();
	//tabla de resultados
	var cadena="<div id='historialPartidasJug'>";
	cadena=cadena+"<h3>Historial de partidas</h3>";
  	cadena=cadena+'<table class="table"><thead><tr>';
    cadena=cadena+'<th scope="col">Nivel</th><th scope="col">nickGanador</th><th scope="col">nombrePartida</th><th scope="col">Nº Jugadores</th><th scope="col">Bombas usadas</th><th scope="col">Puntuación</th>';
    cadena=cadena+'</tr></thead>';
    cadena=cadena+'<tbody>';
  	for(var key in data){
  		cadena=cadena+'<tr>'
		cadena=cadena+'<td>'+data[key].nivel+'</td>';
		cadena=cadena+'<td>'+data[key].nickGanador+'</td>';
		cadena=cadena+'<td>'+data[key].nombrePartida+'</td>';
		cadena=cadena+'<td>'+Object.keys(data[key].jugadores).length+'</td>';
		cadena=cadena+'<td>'+data[key].bombas+'</td>';
		cadena=cadena+'<td>'+data[key].puntos+'</td>';
 		cadena=cadena+'</tr>';
  	};
  	cadena=cadena+"</tbody></table></div>";
	  $('#inicio').append(cadena);
	  
}
function mostrarListaPartidas(data){
	$('#mCP').remove();
	var numeroPartidas=Object.keys(data).length;
	var cadena="<div id='mLP'>";
	cadena=cadena+"<h3>Lista de partidas</h3>";
	//cadena=cadena+'<ul class="list-group">';
  	cadena=cadena+'<table class="table"><thead><tr>';
    cadena=cadena+'<th scope="col">Nombre</th><th scope="col">Número jugadores</th><th>Unirse</th>';
    cadena=cadena+'</tr></thead>';
    cadena=cadena+'<tbody>';
  	for(var key in data){
  		cadena=cadena+'<tr>'
  		cadena=cadena+'<td>'+data[key].nombre+'</td>';
  		cadena=cadena+'<td>'+Object.keys(data[key].jugadores).length+'</td>';
 		cadena=cadena+'<td><button type="button" id="unirmeAPartidaBtn" class="btn crearPartida_btn" onclick="ws.unirAPartida(\''+data[key].idp+'\',\''+nick+'\')">Unirse a partida</button></td>';
 		cadena=cadena+'</tr>';
  	};
  	cadena=cadena+"</tbody></table></div>";
  	$('#inicio').append(cadena);
}

function mostrarListaJugadores(jugadores){
	//$('#mCP').remove();
	$('#mLJ').remove();
	//var numeroPartidas=Object.keys(data).length;
	var cadena="<div id='mLJ'>";
	cadena=cadena+"<h3>Lista de jugadores</h3>";
  	cadena=cadena+'<table class="table"><thead><tr>';
    cadena=cadena+'<th scope="col">Nick</th><th scope="col">Vidas</th><th>Otros</th>';
    cadena=cadena+'</tr></thead>';
    cadena=cadena+'<tbody>';
  	for(var key in jugadores){
  		cadena=cadena+'<tr>'
  		cadena=cadena+'<td>'+jugadores[key].nick+'</td>';
  		cadena=cadena+'<td>-</td>';
 		cadena=cadena+'<td>'+jugadores[key].estado+'</td>';
 		cadena=cadena+'</tr>';
  	};
  	cadena=cadena+"</tbody></table></div>";
  	$('#mP').append(cadena);
}

function mostrarCanvas(num){
	$('#mLJ').remove();
	console.log(num);
	game = new Phaser.Game(240, 240, Phaser.CANVAS,"juego");
	game.state.add("BootState", new Bomberman.BootState());
	game.state.add("LoadingState", new Bomberman.LoadingState());
	game.state.add("TiledState", new Bomberman.TiledState());
	game.state.start("BootState", true, false, "assets/levels/level"+lvl+"-"+num+".json", "TiledState");
}
function borrarCanvas(){
	$('canvas').remove();
}