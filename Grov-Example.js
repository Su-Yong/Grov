window.onload = function() {
  var canvas = document.getElementById("canvas");

  var grass = createComponent("grass", "tile_ground_grass.png", true);
  var dirt = createComponent("dirt", "tile_ground_dirt.png", true);
  var jumper = createComponent("jumper", "tile_jumper.png", true);
  var star = createComponent("star", "tile_star.png", false);

  var ball = createComponent("ball", "tile_ball.png", true, function(component) {
    component.type = "circle";
    component.width = 0.6;
    component.height = 0.6;
    component.useGravity = true;
    component.isStatic = false;
    component.gravity = 0.064;
  });

  ball.listener.collision = function(e, a) {
    if(e.getId() === "star") {
      e.delete();
      Grov.Stage++;
    }
    if(a < 45 || a > 315) {
      if(e.getId() == "jumper")
        ball.setVel(0, -4, "smooth");
      else
        ball.setVel(0, -2.5, "smooth");
    }
  };

  var linker = [
    null,
    ball,
    grass,
    dirt,
    jumper,
    star
  ];

  var level = [];
  for(var i = 0; i < Object.keys(map).length; i++) {
    level[i] = createLevel(map["map" + (i + 1)], linker);
    Grov.addLevel(level[i]);
  }

  Grov.Scale = 20;
  Grov.setCanvas(canvas);
  Grov.run();

  /* DEBUG
  Grov.keyBinder.setKeyBind("w", function() {
    ball.setVel(0, -1.7);
  });
  Grov.keyBinder.setKeyBind("s", function() {
    ball.setVel(0, 1.7);
  });*/
  Grov.keyBinder.setKeyBind("a", function() {
    ball.setVel(100, -1.7);
  });
  Grov.keyBinder.setKeyBind("d", function() {
    ball.setVel(100, 1.7);
  });
};

function createComponent(id, texture, isSolid, func) {
  var component = new Component("Rect");
  component.setWidth(1);
  component.setHeight(1);
  component.setRotate(0);
  component.isSolid = isSolid;

  var image = new Image();
  image.src = texture;
  component.setTexture(image);
  component.id = id;

  if(typeof func === "function") {
    func(component);
  }

  return component;
}

function createLevel(map, linker) {
  var level = new Level();

  level.setWidth(25);
  level.setHeight(25);
  level.setMapLinker(linker);
  level.setMap(map);

  return level;
}
