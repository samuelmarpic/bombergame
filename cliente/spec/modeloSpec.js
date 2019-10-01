describe("Bombergame", function() {
  var juego;

  beforeEach(function() {
    juego=new Juego();
  });

  it("comprobaciones iniciales", function() {
    expect(juego.usuarios.length).toEqual(0);
    expect(juego.partidas.length).toEqual(0);
  });
  it("agregar usuarios", function() {
    juego.agregarUsuario('pepe');
    expect(Object.keys(juego.usuarios).length).toEqual(1);
  });
  it("agregar 2 usuarios iguales, da error", function() {
    juego.agregarUsuario('pepe');
    var usrs=juego.usuarios;
    juego.agregarUsuario('pepe');
    expect(Object.keys(usrs).length).toEqual(1);
    expect(Object.keys(juego.usuarios).length).toEqual(1);
  });
  it("crear partida", function() {
    juego.agregarUsuario('pepe');
    juego.crearPartida("una","pepe");
    expect(Object.keys(juego.partidas).length).toEqual(1);
  });
  it("unirse a una partida", function() {
    juego.agregarUsuario('pepe');
    juego.agregarUsuario('ana');
    juego.crearPartida("una","pepe");
    juego.unirAPartida("unapepe","ana");
    expect(Object.keys(juego.partidas.unapepe.jugadores).length).toEqual(2);
  });
  it("agregar usuarios correctamente", function() {
    juego.agregarUsuario('pepe');
    expect(juego.usuarios["pepe"].nick).toBe("pepe");
  });
});
