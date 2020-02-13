var modelo=require("./../modelo.js");

describe("Bombergame", function() {
  var juego;

  beforeEach(function() {
    juego=new modelo.Juego();
  });

  it("comprobaciones iniciales", function() {
    expect(Object.keys(juego.usuarios).length).toEqual(0);
    expect(Object.keys(juego.partidas).length).toEqual(0);
  });

  xit("registrar usuario test",function(done){
    juego.registrarUsuario({email:"test@test.es",nick:"test",clave:"test"}, function(usr){
      expect(usr.nick).toBe("test");
      done();
    });
  });

  it("comprobar usuario test crea partida una", function(done){
    juego.iniciarSesion({nick:'test',clave:"test"},function(usr){
      juego.crearPartida("una",usr.nick,function(partida){
      expect(Object.keys(juego.partidas).length).toEqual(1);
      expect(partida.idp).toBe("unatest");
      
    });
    juego.obtenerPartidas(function(listaPartidas){
      expect(Object.keys(listaPartidas).length).toEqual(1);
      done();
    });
    });
  });

  it("comprobar agregar usuario",function(){
    juego.agregarUsuario('pepe',function(usr){
      expect(Object.keys(juego.usuarios).length).toEqual(1);
      expect(juego.usuarios["pepe"]).not.toBe(undefined);
      expect(juego.usuarios["pepe"].nick).toBe("pepe");
      });
  });

  it("comprobar usuario pepe crea partida una",function(){
    juego.agregarUsuario("pepe",function(){});
    juego.crearPartida("una","pepe",function(){});
    expect(Object.keys(juego.partidas).length).toEqual(1);
    expect(juego.partidas["unapepe"]).not.toBe(undefined);
    expect(juego.partidas["unapepe"].jugadores["pepe"]).not.toBe(undefined);
    expect(juego.partidas["unapepe"].idp).toBe("unapepe");
  });

  it("comprobar usuario ana se une a partida unapepe",function(){
    juego.agregarUsuario("pepe",function(){});
    juego.crearPartida("una","pepe",function(){});
    juego.agregarUsuario("ana",function(){});
    expect(Object.keys(juego.usuarios).length).toEqual(2);
    juego.unirAPartida("unapepe","ana");
    expect(Object.keys(juego.partidas).length).toEqual(1);
    expect(Object.keys(juego.partidas["unapepe"].jugadores).length).toEqual(2);
    expect(juego.partidas["unapepe"].jugadores["ana"]).not.toBe(undefined);
  });

it("comprobar usuario pepe sale de partida unapepe (dos jugadores)",function(){
    juego.agregarUsuario("pepe",function(){});
    juego.crearPartida("una","pepe",function(){});
    var partida=juego.partidas["unapepe"];
    expect(Object.keys(juego.partidas).length).toEqual(1);
    expect(partida).not.toBe(undefined);
    expect(partida.jugadores["pepe"]).not.toBe(undefined);
    expect(partida.idp).toBe("unapepe");
    juego.agregarUsuario("ana",function(){});
    juego.unirAPartida("unapepe","ana");
    juego.salir("unapepe","pepe");
    expect(partida.jugadores["pepe"]).toBe(undefined);
    expect(Object.keys(partida.jugadores).length).toBe(1);
  });

it("comprobar usuario pepe sale de partida unapepe y se elimina",function(){
    juego.agregarUsuario("pepe",function(){});
    juego.crearPartida("una","pepe",function(){});
    expect(Object.keys(juego.partidas).length).toEqual(1);
    expect(juego.partidas["unapepe"]).not.toBe(undefined);
    expect(juego.partidas["unapepe"].jugadores["pepe"]).not.toBe(undefined);
    expect(juego.partidas["unapepe"].idp).toBe("unapepe");
    juego.salir("unapepe","pepe");
    expect(juego.partidas["unapepe"]).toBe(undefined);
  });
  it("comprobar usuario pepe crea partida una de nivel 3",function(){
    juego.agregarUsuario("pepe",function(){});
    juego.crearPartida("una","pepe",function(){});
    juego.cambioNivel(3);
    expect(Object.keys(juego.partidas).length).toEqual(1);
    expect(juego.partidas["unapepe"]).not.toBe(undefined);
    expect(juego.partidas["unapepe"].jugadores["pepe"]).not.toBe(undefined);
    expect(juego.partidas["unapepe"].idp).toBe("unapepe");
    expect(juego.niv).toBe(3);
  });
  it("comprobar usuario pepe crea partida una de nivel 3 y utiliza dos bombas",function(){
    juego.agregarUsuario("pepe",function(){});
    juego.crearPartida("una","pepe",function(){});
    juego.cambioNivel(3);
    juego.bombaUtilizada("unapepe","pepe");
    juego.bombaUtilizada("unapepe","pepe");
    expect(Object.keys(juego.partidas).length).toEqual(1);
    expect(juego.partidas["unapepe"]).not.toBe(undefined);
    expect(juego.partidas["unapepe"].jugadores["pepe"]).not.toBe(undefined);
    expect(juego.partidas["unapepe"].idp).toBe("unapepe");
    expect(juego.niv).toBe(3);
    expect(juego.partidas["unapepe"].bombasUsadas).toBe(2);
  });
});
