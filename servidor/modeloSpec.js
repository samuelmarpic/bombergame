var modelo=require("./modelo.js");

describe("Bombergame", function() {
  var juego;

  beforeEach(function() {
    juego=new modelo.Juego();
  });

  it("comprobaciones iniciales", function() {
    expect(Object.keys(juego.usuarios).length).toEqual(0);
    expect(Object.keys(juego.partidas).length).toEqual(0);
  });
  it("agregar usuarios", function() {
    juego.agregarUsuario('pepe',function(){});
    expect(Object.keys(juego.usuarios).length).toEqual(1);
  });
  it("agregar 2 usuarios iguales, da error", function() {
    juego.agregarUsuario('pepe',function(){});
    var usrs=juego.usuarios;
    juego.agregarUsuario('pepe',function(){});
    expect(Object.keys(usrs).length).toEqual(1);
    expect(Object.keys(juego.usuarios).length).toEqual(1);
  });
  it("crear partida", function() {
    juego.agregarUsuario('pepe',function(){});
    juego.crearPartida("una","pepe",function(){});
    expect(Object.keys(juego.partidas).length).toEqual(1);
  });
  it("unirse a una partida", function() {
    juego.agregarUsuario('pepe',function(){});
    juego.agregarUsuario('ana',function(){});
    juego.crearPartida("una","pepe",function(){});
    juego.unirAPartida("unapepe","ana",function(){});
    expect(Object.keys(juego.partidas.unapepe.jugadores).length).toEqual(2);
  });
  it("agregar usuarios correctamente", function() {
    juego.agregarUsuario('pepe',function(){});
    expect(juego.usuarios["pepe"].nick).toBe("pepe");
  });
  it("salir usuario", function() {
    juego.agregarUsuario('pepe',function(){});
    juego.agregarUsuario('ana',function(){});
    juego.crearPartida("una","pepe",function(){});
    juego.unirAPartida("unapepe","ana",function(){});
    juego.salir("unapepe","pepe");
    expect(juego.partidas.unapepe.jugadores.pepe).toBe(undefined);
    expect(Object.keys(juego.partidas.unapepe.jugadores).length).toEqual(1);
  });
  it("salir eliminar partida", function() {
    juego.agregarUsuario('pepe',function(){});
    juego.crearPartida("una","pepe",function(){});
    juego.salir("unapepe","pepe");
    expect(juego.partidas.unapepe).toBe(undefined);
  });
});
