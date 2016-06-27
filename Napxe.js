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
};

Napxe.loadMap = function(data) {
  Napxe.map = data;

  return Napxe;
},

Napxe.mapLinker = function(data) {
  Napxe.linker = data;

  return Napxe;
},

Napxe.link = function(camera) {
  Napxe.camera = camera;

  return Napxe;
}

Napxe.setCanvas = function(canvas) {
  Napxe.canvas = canvas.getContext("2d");
  Napxe.rc = canvas;

  return Napxe;
}

Napxe.get = function(id) {
  for(var x in Napxe.list) {
    for(var y in Napxe.list[x]) {
      if(Napxe.list[x][y] != null)
      if(Napxe.list[x][y].id == id)
        return Napxe.list[x][y];
    }
  }
}

Napxe.run = function() {
  Napxe.list = new Array();
  var c = 0;
  for(var x = 0; x < Napxe.map.length; x++) {
    Napxe.list[x] = new Array();
    for(var y = 0; y < Napxe.map[x].length; y++) {
      var obj = Napxe.linker[Napxe.map[x][y]];

      Napxe.list[x][y] = (typeof obj != "object") ? null : Object.create(obj);
      if(typeof obj == "object")
        Napxe.list[x][y].init(y, x); // reverse
    }
  }

  setInterval(function() {
    Napxe.canvas.clearRect(0, 0, Napxe.rc.width, Napxe.rc.width);
    Napxe.list.forEach(function(e, i) {
      e.forEach(function(e, i) {
        if(e != null) {
          e.update(i);
          e.render(Napxe.canvas);
        }
      });
    });
  }, 1000 / Napxe.frame);
}

Napxe.Error = function() {
  this.cause = "Error: Unknown";
};

Napxe.log = function(value) {
  if(Util.getObjectName(value) == "Napxe.Error")
    console.log(value.xause);
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
  this.speed = 0;
  this.real_speed = 0;
  this.collisionListener = null;

  this.tag = "";
  this.count = 0;
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
  this.direction = -direction * (Math.PI / 180);
  this.speed = speed;
};

Component.prototype.update = function(tag) {
  if(this.isMove) {
    /*if(this.real_speed < this.speed) {
      this.real_speed += this.speed * (1 - this.environment.frictionValue);
    } else if(this.real_speed > this.speed) {
      this.real_speed = this.speed;
    }*/
    this.real_speed = this.speed;
    this.speed *= 0.95;
    if(this.speed > 0) {
      var addy = Math.sin(this.direction) * this.real_speed * 0.1;
      if(addy < 0)
        this.y += addy;
      this.x += Math.cos(this.direction) * this.real_speed * 0.1;
    }

    var lists = [];
    try {
      lists.push(Napxe.list[Math.floor(this.y + 1.5)][Math.floor(this.x + 0.5)]); //right
    } catch(err) {}
    try {
      lists.push(Napxe.list[Math.floor(this.y + 0.5)][Math.floor(this.x - 0.5)]); //left
    } catch(err) {}
    try {
      lists.push(Napxe.list[Math.floor(this.y + 0.5)][Math.floor(this.x + 1.5)]); //down
    } catch(err) {}
    try {
      lists.push(Napxe.list[Math.floor(this.y + 0.5)][Math.floor(this.x - 0.5)]); //up
    } catch(err) {}

    var me = this;
    lists.forEach(function(e, i) {
      if(e != null)
      if(e.material.solid > 0)
      if(Math.abs(me.x - e.x) <= 1 && Math.abs(me.y - e.y) <= 1 && (me.x != e.x || me.y != e.y)) {
        me.real_speed *= 1 - me.environment.frictionValue + 0.001;

        var mx = Math.floor(me.x);// + 0.5;
        var my = Math.floor(me.y);// + 0.5;
        var bx = Math.floor(e.x);
        var by = Math.floor(e.y);

        if(me.collisionListener != null) {
          me.collisionListener(me, e, i);
        }

        if(i == 2) {
          me.x = e.x - 1.001;
          //console.log("right wall");
        } else if (i == 1) {
          me.x = e.x + 1.001;
          //console.log("left wall");
        } else if(i == 0) {
          me.y = e.y - 1.001;
          me.count = 0;
          //console.log("floor");
        } else if(i == 3) {
          me.y = e.y + 1.001;
          //console.log("roof");
        }
      }
    });
    if(this.count > 0)
    if(this.environment != null)
    if(this.environment.useGravity) {
      this.y += this.environment.gravityValue * Napxe.per * (0.001 / Napxe.frame)  * this.count * this.count;
    }
  }

  this.count++;
  this.count2++;
}

Component.prototype.init = function(x, y) {
  this.x = x;
  this.y = y;
};

Component.prototype.render = function(canvas) {
  if(typeof this.material.texture == "string") {
    canvas.fillStyle = this.material.texture;
    canvas.fillRect(this.x * Napxe.per, this.y * Napxe.per, this.width * Napxe.per, this.height * Napxe.per);
    canvas.fillStyle = "#ff0000";
    canvas.fillRect((this.x + this.height) * Napxe.per, (this.y + this.height) * Napxe.per, -4, -4);
    canvas.fillStyle = "#00ff00";
    canvas.fillRect(this.x* Napxe.per, this.y * Napxe.per, 4, 4);
  } else {
    canvas.drawImage(this.material.texture, this.width * Napxe.per, this.height * Napxe.per);
  }
};

var Environment = function() {
  this.useGravity = true;
  this.gravityDirection = 0;
  this.gravityValue = 0.98;

  this.useFriction = false;
  this.frictionValue = 1;
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

};

var Camera = function() {
  this.x = 0;
  this.y = 0;
  this.width = 10;
  this.height = 10;
  this.followId = 0;
};

Camera.prototype.setViewPos = function(vec) {
  if(Util.getObjectName(vec) == "Vec2") {
    this.x = vec.x;
    this.y = vec.y;
  } else {
    this.followId = vec;
  }
  return this;
};

Camera.prototype.setViewSize = function(vec) {
  this.width = vec.x;
  this.height = vec.y;

  return this;
};

var Vec2 = function(x = 0, y = 0) {
  this.x = x;
  this.y = y;
};

var Util = {
  VecPlus: function(vec1, vec2) {
    return new Vec2(vec1.x + vec2.x, vec1.y + vec2.y);
  },
  VecMinus: function(vec1, vec2) {
    return new Vec2(vec1.x - vec2.x, vec1.y - vec2.y);
  },
  VecAdd: function(vec1, vec2) {
    return new Vec2(vec1.x * vec2.x, vec1.y * vec2.y);
  },
  VecDivid: function(vec1, vec2) {
    return new Vec2(vec1.x / vec2.x, vec1.y / vec2.y);
  },
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

  P.setCollisionListener(function(me, other, side) {
    if(side == 0) {
      me.setVel(90, 4);
    }
  });

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
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  var data = [
    Object.create(W),
    Object.create(G),
    Object.create(P),
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
      Napxe.get("Player").setVel(90, 4);
    }
  }
}
