window.onload = function() {
  var canvas = document.getElementById("canvas");

  var grass = createComponent("grass", "tile_ground_grass.png", true);
  var dirt = createComponent("dirt", "tile_ground_dirt.png", true);
  var jumper = createComponent("jumper", "tile_jumper.png", true);
  var once = createComponent("once", "tile_ground_once.png", true);
  var jumperOnce = createComponent("jumperOnce", "tile_ground_blue_white.png", true);
  var gray = createComponent("gray", "tile_ground_gray.png", true);
  var spine = createComponent("spine", "tile_spine_grass.png", true, function(component) {
    component.height = 0.8;
  });
  var star = createComponent("star", "http://tlasy2205.dothome.co.kr/js/tile_star.png", false);

  var ball = createComponent("ball", "http://tlasy2205.dothome.co.kr/js/tile_ball.png", true, function(component) {
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
      var isExists = false;
      for(var i in Grov.Level[Grov.Stage].Elements) {
        if(Grov.Level[Grov.Stage].Elements[i].getId() === "star") {
          isExists = true;
          break;
        }
      }
      if(!isExists) {
        setTimeout(function() {
          Grov.Stage++;
        }, 1000);
      }
    }

    if(a < 45 || a > 315) {
      if(e.getId() === "once") {
      ball.setVel(0, -2.5, "smooth");
      e.delete();
      console.log(ball.speed);
    } else if(e.getId() === "jumperOnce") {
      ball.setVel(0, -70);
      e.delete();
      console.log(ball.speed);
    }
      if(e.getId() === "spine") {
        ball.delete();
        setTimeout(function() {
          Grov.reloadLevel();
        }, 500);
      }
      if(e.getId() === "jumper")
        ball.setVel(0, -4, "smooth");
      else
        ball.setVel(0, -2.5, "smooth");
    }
  };
  ball.listener.tick = function() {
    //console.log(ball.speed + " " + ball.direction);
  };

  var tutorial = createTextUIComponent("A·D를 눌러 좌·우로 이동", 50, 50, 400, 200, "#4D4D4D");

  var linker = [
    null,
    ball,
    grass,
    dirt,
    jumper,
    star,
    once,
    spine,
    gray,
    jumperOnce
  ];

  var level = [];
  for(var i = 0; i < Object.keys(map).length; i++) {
    level[i] = createLevel(map["map" + (i + 1)], linker);
  }
  level[0].UIElements.push(tutorial);

  for(var j in level) {
    Grov.addLevel(level[j]);
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
    ball.setVel(100, -1.8);
  });
  Grov.keyBinder.setKeyBind("d", function() {
    ball.setVel(100, 1.8);
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
