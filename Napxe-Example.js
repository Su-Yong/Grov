window.onload = function() {
  var material = new Material();
  material.setTexture("#7D7D7D");
  material.setBounce(1);
  material.setSolid(true);

  var e = new Environment();
  e.useGravity = true;
  e.gravityDirection = 270;
  e.gravityValue = 0.98;
  e.useFriction = true;
  e.frictionValue = 0.5;

  var we = new Environment();
  we.useGravity = true;
  we.gravityDirection = 270;
  we.gravityValue = 0.098;

  var gm = new Material();
  gm.setTexture("#4d4d4d");
  gm.setSolid(true);

  var wm = new Material();
  wm.setTexture("#03a7fa");
  wm.setSolid(true);

  var P = new Component();
  P.setMaterial(material);
  P.setEnvironment(e);
  P.setId("Player");
  P.setWidth(1).setHeight(1);
  P.isMove = true;

  var G = new Component();
  G.setMaterial(gm);
  G.setWidth(1).setHeight(1);

  var W = new Component();
  W.setMaterial(wm);
  W.setEnvironment(we);
  W.setWidth(1).setHeight(1);
  W.isMove = true;

  var camera = new Camera();
  camera.setViewPos(P);
  camera.setViewSize(new Vec2(16, 16));

  var map = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 2, 1, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];

  var data = [
    null,
    Object.create(G),
    Object.create(P),
    Object.create(W)
  ];

  Napxe.link(camera);
  Napxe.setCanvas(document.getElementById("canvas"));
  Napxe.loadMap(map);
  Napxe.mapLinker(data);
  Napxe.run();

  window.onkeydown = function(e) {
    var key = e.keyCode;
    if(key == 65) {
      Napxe.get("Player").setVel(180, 3);
    } else if(key == 68) {
      Napxe.get("Player").setVel(0, 3);
    } else if(key == 87) {
      Napxe.get("Player").setVel(90, 6);
    }
  }
}
