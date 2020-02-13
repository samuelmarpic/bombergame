function ClienteRest(){

	this.agregarUsuario=function(nick){
		$.getJSON("/agregarUsuario/"+nick,function(data){    
    		console.log(data);
    		if (data.nick!=""){
    			
	    		mostrarUsuario(data);
	    	}
	    	else{
	    		mostrarAviso("Utiliza otro nick");	
	    	}
		});
	}
	this.comprobarUsuario=function(){
		var usr=JSON.parse($.cookie("usr"));
		$.getJSON("/comprobarUsuario/"+usr.nick,function(data){
			console.log(data);
    		if (data.nick!=""){
    			//$.cookie("usr",JSON.stringify(data));
	    		mostrarUsuario(data);
	    	}
	    	else{
				$.removeCookie("usr");
				iniciarSesion();	
	    	}
		});
	}
	this.crearPartida=function(nombrePartida){
		var usr=JSON.parse($.cookie("usr"));
		$.getJSON("/crearPartida/"+nombrePartida+"/"+usr.nick,function(data){    
    		console.log(data);
    		mostrarPartida(data);
		});
	}
	this.unirAPartida=function(nombrePartida,nick){
		$.getJSON("/unirAPartida/"+nombrePartida+"/"+nick,function(data){    
    		console.log(data);
    		mostrarPartida(data);
		});
	}
	this.obtenerPartidas=function(){
		$.getJSON("/obtenerPartidas",function(data){    
    		console.log(data);
    		mostrarListaPartidas(data);
		});
	}
	this.obtenerJugadores=function(nombrePartida){
		$.getJSON("/obtenerJugadores/"+nombrePartida,function(data){
			console.log(data);
		})
	}
	this.cerrarSesion=function(){
		var usr=JSON.parse($.cookie("usr"));
		$.getJSON("/cerrarSesion/"+usr.nick,function(data){
			console.log(data);
    		if (data.res!="ok"){
	    		mostrarUsuario(data);
	    	}
	    	else{
	    		$.removeCookie("usr");
				iniciarSesion();	
	    	}
		});
	}
	this.registrarUsuario=function(nick,email,clave){
		var rest=this;
		$.ajax({
		  type:'POST',
		  url:'/registrarUsuario',
		  data:JSON.stringify({nick:nick,email:email,clave:clave}),
		  success:function(data){
			if (data.nick!=""){
				$.cookie("usr",JSON.stringify(data));
				mostrarUsuario(data);
			}
			else{
				console.log('No se ha podido registrar');
			  	mostrarAviso("Utiliza otro nick u otro email que no se hayan registrado previamente");	
			}
		   },
		  contentType:'application/json',
		  dataType:'json'
		});
	}
  
	this.iniciarSesion=function(nick,clave){
		$.ajax({
			type:'POST',
			url:'/iniciarSesion',
			data:JSON.stringify({nick:nick,clave:clave}),
			success:function(data){
			  if (data.nick!=""){
				console.log('Usuario inicia sesión');
			  	$.cookie("usr",JSON.stringify(data));
				 mostrarUsuario(data);
			  }
			  else{
				iniciarSesion();
				mostrarAviso("Usuario no ha podido iniciar sesión");
			  }
			 },
			contentType:'application/json',
			dataType:'json'
		  });
	}

	this.actualizarUsuario=function(oldpass,newpass){
		var usr=JSON.parse($.cookie("usr"));
	   $.ajax({
		  type:'PUT',
		  url:'/actualizarUsuario',
		  data:JSON.stringify({uid:usr._id,oldpass:oldpass,newpass:newpass}),
		  success:function(data){
			if (!data.email){
				console.log("no se ha podido actualizar");
				mostrarAviso("La contraseña NO se ha podido actualizar");
			    mostrarCrearPartida();
			}
			else{
			  $.cookie("usr",JSON.stringify(data));
			  console.log("se ha actualizado correctamente")
			  mostrarAviso("La contraseña se ha actualizado correctamente");
			  mostrarCrearPartida();
			}
			},
		  contentType:'application/json',
		  dataType:'json'
		});
	}

	this.eliminarUsuario=function(){
		var usr=JSON.parse($.cookie("usr"));
		$.ajax({
		  type:'DELETE',
		  url:'/eliminarUsuario/'+usr._id,
		  data:'{}',
		  success:function(data){
			if (data.resultados==1)
			{
			  iniciarSesion();
			  //mostrarNavLogin();
			  console.log("Usuario eliminar");
			}
			},
		  contentType:'application/json',
		  dataType:'json'
		});
	  }
  

}