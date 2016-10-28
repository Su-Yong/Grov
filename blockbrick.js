window.onload = function() {
  var canvas = document.getElementById("canvas");
  var Block = {
    Soft: createComponent("brick-soft", 1, 1, "tile_ground_gray.png", false),
    Hard: createComponent("brick-hard", 1, 1, "tile_ground_blue_white.png", false),
  };
  var mover = createComponent("move-bar", 5, 1, "tile_ground_once.png", true);
  var ball = {
    component: createComponent("ball", 0.4, 0.4, "tile_ball.png", true, function(component) {
      component.isStatic = false;
    }),
    direction: 120,
  };

  ball.component.direction[0] = 45;
  ball.component.listener.tick = function(me) {
    ball.component.speed[0] = 2;
    ball.component.direction[0] = ball.direction;
    console.log(ball.component.direction[0] + " " + ball.direction + " " + me.x + " " + me.y);
  };

  ball.component.listener.collision = function(element, angle) {
    element.delete();
    if(angle < 45 || angle >= 315) { // up
      ball.direction = reverseAngleAxisY(ball.direction);
    } else if(angle >= 45 && angle < 135) { // right
      ball.direction = reverseAngleAxisX(ball.direction);
    } else if(angle >= 135 && angle < 225) { // down
      ball.direction = reverseAngleAxisY(ball.direction);
    } else if(angle >= 225 && angle < 315) { // left
      ball.direction = reverseAngleAxisX(ball.direction);
    }
  };

  var linker = [
    null,
    ball.component,
    Block.Soft,
    Block.Hard
  ];

  var level = [];
  for(var i = 0; i < Object.keys(map).length; i++) {
    level[i] = createLevel(25, 25, map["map" + (i + 1)], linker);
  }

  for(var j in level) {
    Grov.addLevel(level[j]);
  }

  Grov.Scale = 20;
  Grov.setCanvas(canvas);
  Grov.run();

  function reverseAngleAxisX(angle) {
    var r = (180 - angle);
    return angle + r * 2;
  }

  function reverseAngleAxisY(angle) {
    var r = (90 - angle);
    return angle + r * 2;
  }

  function createComponent(id, width, height, texture, isSolid, func) {
    var component = new Component("Rect");
    component.setWidth(width);
    component.setHeight(height);
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

  function createLevel(width, height, map, linker) {
    var level = new Level();

    level.setWidth(width);
    level.setHeight(height);
    level.setMapLinker(linker);
    level.setMap(map);

    return level;
  }
};
