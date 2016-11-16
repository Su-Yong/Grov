window.onload = function() {
  var canvas = document.getElementById("canvas");

  var block = createComponent("block", "tile_ground_gray.png", true, function(e) {
    e.isStatic = false;
    e.useGravity = true;
    e.gravityAcceleration = false;
    e.gravity = 0.55;
    e.gravityDirection = 180;
  });

  block.listener.collision = function(e, a) {

  };

  var tutorial = createTextUIComponent("A·D를 눌러 좌·우로 이동", 50, 50, 400, 200, "#4D4D4D");

  var linker = [
    null,
    block,
  ];

  var level = [createLevel([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ], linker)];
  level[0].UIElements.push(tutorial);

  for(var j in level) {
    Grov.addLevel(level[j]);
  }
  Grov.Scale = 20;
  Grov.setCanvas(canvas);
  Grov.run();

  Grov.keyBinder.setKeyBind("a", function() {
    block.setVel(270, 2.4);
  });
  Grov.keyBinder.setKeyBind("d", function() {
    block.setVel(90, 2.4);
  });
  Grov.keyBinder.setKeyBind(",", function() {
    block.rotate(1);
  });
  Grov.keyBinder.setKeyBind(".", function() {
    block.rotate(-1);
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

function createTextUIComponent(text, x, y, width, height, color, func) {
  var component = new UI.Text();
  component.text = text;
  component.x = x;
  component.y = y;
  component.width = width;
  component.height = height;
  component.background = color;

  if(typeof func === "function") {
    func(component);
  }

  return component;
}
function createImageUIComponent(color, x, y, width, height, func) {
  var component = new UI.Image();
  component.x = x;
  component.y = y;
  component.width = width;
  component.height = height;
  component.background = color;

  if(typeof func === "function") {
    func(component);
  }

  return component;
}

function createButtonUIComponent(text, x, y, width, height, color, listener, func) {
  var component = new UI.Button();
  component.text = text;
  component.x = x;
  component.y = y;
  component.width = width;
  component.height = height;
  component.background = color;
  component.listener = listener;

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
