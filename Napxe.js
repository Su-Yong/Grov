var Napxe = {
  per: 16,
  count: 0,
  frame: 60,
  canvas: null,
  rc: null,
  map: null,
  list: [],
  linker: null,
  camera: null,
  keys: [],
};

var keyCodes = {
  3 : "break",
  8 : "backspace / delete",
  9 : "tab",
  12 : "clear",
  13 : "enter",
  16 : "shift",
  17 : "ctrl ",
  18 : "alt",
  19 : "pause/break",
  20 : "caps lock",
  27 : "escape",
  32 : "spacebar",
  33 : "page up",
  34 : "page down",
  35 : "end",
  36 : "home ",
  37 : "left arrow ",
  38 : "up arrow ",
  39 : "right arrow",
  40 : "down arrow ",
  41 : "select",
  42 : "print",
  43 : "execute",
  44 : "Print Screen",
  45 : "insert ",
  46 : "delete",
  48 : "0",
  49 : "1",
  50 : "2",
  51 : "3",
  52 : "4",
  53 : "5",
  54 : "6",
  55 : "7",
  56 : "8",
  57 : "9",
  58 : ":",
  59 : "semicolon (firefox), equals",
  60 : "<",
  61 : "equals (firefox)",
  63 : "ß",
  64 : "@ (firefox)",
  65 : "a",
  66 : "b",
  67 : "c",
  68 : "d",
  69 : "e",
  70 : "f",
  71 : "g",
  72 : "h",
  73 : "i",
  74 : "j",
  75 : "k",
  76 : "l",
  77 : "m",
  78 : "n",
  79 : "o",
  80 : "p",
  81 : "q",
  82 : "r",
  83 : "s",
  84 : "t",
  85 : "u",
  86 : "v",
  87 : "w",
  88 : "x",
  89 : "y",
  90 : "z",
  91 : "Windows Key / Left ⌘ / Chromebook Search key",
  92 : "right window key ",
  93 : "Windows Menu / Right ⌘",
  96 : "numpad 0 ",
  97 : "numpad 1 ",
  98 : "numpad 2 ",
  99 : "numpad 3 ",
  100 : "numpad 4 ",
  101 : "numpad 5 ",
  102 : "numpad 6 ",
  103 : "numpad 7 ",
  104 : "numpad 8 ",
  105 : "numpad 9 ",
  106 : "multiply ",
  107 : "add",
  108 : "numpad period (firefox)",
  109 : "subtract ",
  110 : "decimal point",
  111 : "divide ",
  112 : "f1 ",
  113 : "f2 ",
  114 : "f3 ",
  115 : "f4 ",
  116 : "f5 ",
  117 : "f6 ",
  118 : "f7 ",
  119 : "f8 ",
  120 : "f9 ",
  121 : "f10",
  122 : "f11",
  123 : "f12",
  124 : "f13",
  125 : "f14",
  126 : "f15",
  127 : "f16",
  128 : "f17",
  129 : "f18",
  130 : "f19",
  131 : "f20",
  132 : "f21",
  133 : "f22",
  134 : "f23",
  135 : "f24",
  144 : "num lock ",
  145 : "scroll lock",
  160 : "^",
  161: "!",
  163 : "#",
  164: "$",
  165: "ù",
  166 : "page backward",
  167 : "page forward",
  169 : "closing paren (AZERTY)",
  170: "*",
  171 : "~ + * key",
  173 : "minus (firefox), mute/unmute",
  174 : "decrease volume level",
  175 : "increase volume level",
  176 : "next",
  177 : "previous",
  178 : "stop",
  179 : "play/pause",
  180 : "e-mail",
  181 : "mute/unmute (firefox)",
  182 : "decrease volume level (firefox)",
  183 : "increase volume level (firefox)",
  186 : "semi-colon / ñ",
  187 : "equal sign ",
  188 : "comma",
  189 : "dash ",
  190 : "period ",
  191 : "forward slash / ç",
  192 : "grave accent / ñ",
  193 : "?, / or °",
  194 : "numpad period (chrome)",
  219 : "open bracket ",
  220 : "back slash ",
  221 : "close bracket ",
  222 : "single quote ",
  223 : "`",
  224 : "left or right ⌘ key (firefox)",
  225 : "altgr",
  226 : "< /git >",
  230 : "GNOME Compose Key",
  233 : "XF86Forward",
  234 : "XF86Back",
  255 : "toggle touchpad"
};

Napxe.loadMap = function(data) {
  Napxe.map = data;

  return Napxe;
};

Napxe.mapLinker = function(data) {
  Napxe.linker = data;

  return Napxe;
};

Napxe.link = function(camera) {
  Napxe.camera = camera;

  return Napxe;
};

Napxe.setCanvas = function(canvas) {
  Napxe.canvas = canvas.getContext("2d");
  Napxe.rc = canvas;

  return Napxe;
};

Napxe.setKeyBind = function(key, func) {
  var keycode = 0;
  for(var i in keyCodes) {
    if(keyCodes[i] === key) {
      keycode = i;
      console.log(key + " " + i);

      Napxe.keys.push({key: keycode, func: func});
      return;
    }
  }
  for(var j in keyCodes) {
    if(keyCodes[j].indexOf(key)) {
      keycode = j;
      console.log(key + " " + j);

      Napxe.keys.push({key: keycode, func: func});
      return;
    }
  }
};

Napxe.get = function(id) {
  for(var x in Napxe.list) {
    for(var y in Napxe.list[x]) {
      if(Napxe.list[x][y] !== null)
      if(Napxe.list[x][y].id === id)
        return Napxe.list[x][y];
    }
  }
};

Napxe.run = function() {
  window.onkeydown = function(e) {
    var key = e.keyCode;
    for(var i in Napxe.keys) {
      if(Napxe.keys[i].key === key) {
        Napxe.keys[i].func();
      }
    }
  };
  window.onkeyup = function(e) {
    for(var x in Napxe.list) {
      for(var y in Napxe.list[x]) {
        if(Napxe.list[x][y] !== null)
        if(Napxe.list[x][y].isMove)
          Napxe.list[x][y].speed = 0;
      }
    }
  };

  Napxe.list = [];
  var c = 0;
  // {c} is defined but never used.

  for(var x = 0; x < Napxe.map.length; x++) {
    Napxe.list[x] = [];
    for(var y = 0; y < Napxe.map[x].length; y++) {
      var obj = Napxe.linker[Napxe.map[x][y]];

      Napxe.list[x][y] = (typeof obj !== "object" || obj === null) ? null : Object.create(obj);
      if(typeof obj === "object" && obj !== null)
        Napxe.list[x][y].init(y, x); // reverse
    }
  }

  setInterval(function() {
    Napxe.canvas.clearRect(0, 0, Napxe.rc.width, Napxe.rc.width);
    Napxe.list.forEach(function(e, i) {
      e.forEach(function(e, i) {
        if(e !== null) {
          e.update(i);
          e.render(Napxe.canvas);
        }
      });
    });
  }, 1000 / Napxe.frame);
};

Napxe.Error = function() {
  this.cause = "Error: Unknown";
};

Napxe.log = function(value) {
  if(Util.getObjectName(value) === "Napxe.Error")
    console.log(value.cause);
  else
    console.log(value);
};

var Component = function() {
  this.id = 0;
  this.x = 0;
  this.y = 0;
  this.isMove = false;
  this.width = 1;
  this.height = 1;
  this.material = null;
  this.environment = null;
  this.direction = 0;
  this.last_direction = 0;
  this.speed = 0;
  this.last_speed = 0;
  this.collisionListener = null;

  this.tag = "";
  this.count = 0;
  this.count2 = 0;
};

Component.prototype.setId = function(id) {
  this.id = id;

  return this;
};

Component.prototype.setCollisionListener = function(listener) {
  this.collisionListener = listener;

  return this;
};

Component.prototype.setMaterial = function(material) {
  this.material = material;

  return this;
};

Component.prototype.setEnvironment = function(environment) {
  this.environment = environment;

  return this;
};

Component.prototype.setX = function(value) {
  this.x = value;

  return this;
};

Component.prototype.setY = function(value) {
  this.y = value;

  return this;
};

Component.prototype.setWidth = function(value) {
  this.width = value;

  return this;
};

Component.prototype.setHeight = function(value) {
  this.height = value;

  return this;
};

Component.prototype.setVel = function(direction, speed) {
  this.last_direction = -direction * (Math.PI / 180);
  this.speed = speed;
};

Component.prototype.update = function(tag) {
  if(this.isMove) {
    if(this.last_direction.toFixed(2) !== this.direction.toFixed(2)) {
      if(Math.abs(this.direction - this.last_direction) < 0.3) {
        this.direction = this.last_direction;
      }
      if(this.direction < this.last_direction) {
        this.direction += (20 / Napxe.frame);
      } else {
        this.direction -= (20 / Napxe.frame);
      }
    }
    console.log(this.direction.toFixed(2) + " : " + this.last_direction.toFixed(2));

    if(this.speed.toFixed(2) !== this.last_speed.toFixed(2)) {
      if(Math.abs(this.speed - this.last_speed) < 0.7) {
        this.last_speed = this.speed;
      }
      if(this.speed > this.last_speed) {
        this.last_speed += (20 / Napxe.frame) * this.environment.frictionValue;
      } else {
        this.last_speed -= (20 / Napxe.frame) * this.environment.frictionValue;
      }
    } else {
      this.speed = 0;
    }

    var lists = [];
    try {
      lists.push(Napxe.list[Math.floor(this.y + 1.5)][Math.floor(this.x + 0.5)]); //right
    } catch(err) {
      lists.push(0);
    }
    try {
      lists.push(Napxe.list[Math.floor(this.y + 0.5)][Math.floor(this.x - 0.5)]); //left
    } catch(err) {
      lists.push(0);
    }
    try {
      lists.push(Napxe.list[Math.floor(this.y + 0.5)][Math.floor(this.x + 1.5)]); //down
    } catch(err) {
      lists.push(0);
    }
    try {
      lists.push(Napxe.list[Math.floor(this.y - 0.5)][Math.floor(this.x + 0.5)]); //up
    } catch(err) {
      lists.push(0);
    }

    var me = this;
    lists.forEach(function(e, i) {
      try {
        if(e !== null)
        if(e.material.solid > 0)
        if(Math.abs(me.x - e.x) <= 1 && Math.abs(me.y - e.y) <= 1 && (me.x !== e.x || me.y !== e.y)) {

          var mx = Math.floor(me.x) + 0.5;
          var my = Math.floor(me.y) + 0.5;
          var bx = Math.floor(e.x);
          var by = Math.floor(e.y);
          // {mx}, {my}, {bx}, and {by} are defined but never used.

          if(me.collisionListener !== null) {
            me.collisionListener(me, e, i);
          }

          if(i === 2) {
            me.x = e.x - 1.001;
            //console.log("right wall");
            me.count *= 1 - Math.cos(me.environment.gravityDirection);
          }else if (i === 1) {
            me.x = e.x + 1.001;
            //console.log("left wall");
            me.count *= Math.cos(me.environment.gravityDirection);
          } else if(i === 3) {
            me.y = e.y + 1.001;
            //console.log("roof");
            me.count *= Math.sin(me.environment.gravityDirection);
          } else if(i === 0) {
            me.y = e.y - 1.001;
            //console.log("floor");
            me.count *= 1 - Math.sin(me.environment.gravityDirection);
          }
        } else {
          if(me.collisionListener !== null) {
            me.collisionListener(me, e, i);
          }
        }
      } catch(err) {}
    });
    if(this.count > 0)
    if(this.environment !== null)
    if(this.environment.useGravity) {
      this.x += Math.cos(this.environment.gravityDirection) * this.environment.gravityValue * Napxe.per * 0.00001 * (60 / Napxe.frame)  * this.count * this.count;
      this.y += Math.sin(this.environment.gravityDirection) * this.environment.gravityValue * Napxe.per * 0.00001 * (60 / Napxe.frame)  * this.count * this.count;
    }

    if(this.last_speed > 0) {
      this.y += Math.sin(this.direction) * this.last_speed * 0.1;
      this.x += Math.cos(this.direction) * this.last_speed * 0.1;
    }

  }

  this.count++;
};

Component.prototype.init = function(x, y) {
  this.x = x;
  this.y = y;
};

Component.prototype.render = function(canvas) {
  if(typeof this.material.texture === "string") {
    canvas.fillStyle = this.material.texture;
    canvas.fillRect(this.x * Napxe.per, this.y * Napxe.per, this.width * Napxe.per, this.height * Napxe.per);/*
    canvas.fillStyle = "#ff0000";
    canvas.fillRect((this.x + this.height) * Napxe.per, (this.y + this.height) * Napxe.per, -4, -4);
    canvas.fillStyle = "#00ff00";
    canvas.fillRect(this.x* Napxe.per, this.y * Napxe.per, 4, 4);*/
  } else {
    canvas.drawImage(this.material.texture, this.x * Napxe.per, this.y * Napxe.per, this.width * Napxe.per, this.height * Napxe.per);
  }
};

var Environment = function() {
  this.useGravity = true;
  this.gravityDirection = 0;
  this.gravityValue = 0.98;

  this.useFriction = false;
  this.frictionValue = 1;
};

Environment.prototype.setGravityDirection = function(direction) {
    this.gravityDirection = -direction * (Math.PI / 180);
};

var Material = function() {
  this.bounce = 0;
  this.solid = 1;
  this.texture = null;
};

Material.prototype.setBounce = function(v) {
  this.bounce = v;

  return this;
};

Material.prototype.setSolid = function(v) {
  this.solid = Math.max(0, Math.min(v, 1));

  return this;
};

Material.prototype.setTexture = function(v) {
  this.texture = v;

  return this;
};

var Particle = function() {
  this.texture = null;
  this.time = 1000;
  this.speed = 1;
  this.animation = null;
};

var Animation = { // Enum
  ALPHA: 0,
  SIZE_SMALL: 1,
};

var Camera = function() {
  this.x = 0;
  this.y = 0;
  this.width = 10;
  this.height = 10;
  this.followId = 0;
};

Camera.prototype.setViewPos = function(x, y) {
  if(y !== null) {
    this.x = x;
    this.y = y;
  } else {
    this.followId = x;
  }
  return this;
};

Camera.prototype.setViewSize = function(x, y) {
  this.width = x;
  this.height = y;

  return this;
};

var Util = {
  getObjectName: function(obj) {
    var funcNameRegex = /function (.{1,})\(/;
    var results = (funcNameRegex).exec((obj).constructor.toString());

    return (results && results.length > 1) ? results[1] : "";
  },
  sign: function(num) {
    if(num < 0)
      return -1;
    else if(num > 0)
      return 1;
    else
      return 0;
  }
};

window.onload = function() {
  var material = new Material();
  material.setTexture("#7D7D7D");
  material.setBounce(1);
  material.setSolid(true);

  var e = new Environment();
  e.useGravity = true;
  e.setGravityDirection(270);
  e.gravityValue = 0.98;
  e.useFriction = true;
  e.frictionValue = 0.5;

  var gm = new Material();
  gm.setTexture("#4d4d4d");
  gm.setSolid(true);

  var P = new Component();
  P.setMaterial(material);
  P.setEnvironment(e);
  P.setId("Player");
  P.setWidth(1).setHeight(1);
  P.isMove = true;

  P.setCollisionListener(function(me, element, side) {
    //me.setVel(90, 2);
  });

  var G = new Component();
  G.setMaterial(gm);
  G.setWidth(1).setHeight(1);

  var camera = new Camera();
  camera.setViewPos(P);
  camera.setViewSize(16, 16);

  var map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  ];

  var data = [
    null,
    Object.create(G),
    Object.create(P),
  ];

  Napxe.setKeyBind("d", function() {
    Napxe.get("Player").setVel(0, 3);
  });
  Napxe.setKeyBind("e", function() {
    Napxe.get("Player").setVel(45, 3);
  });
  Napxe.setKeyBind("a", function() {
    Napxe.get("Player").setVel(180, 3);
  });
  Napxe.setKeyBind("w", function() {
    Napxe.get("Player").setVel(90, 3);
  });
  Napxe.setKeyBind("q", function() {
    Napxe.get("Player").setVel(135, 3);
  });
  Napxe.setKeyBind("s", function() {
    Napxe.get("Player").setVel(270, 3);
  });

  Napxe.link(camera);
  Napxe.setCanvas(document.getElementById("canvas"));
  Napxe.loadMap(map);
  Napxe.mapLinker(data);
  Napxe.run();
};
