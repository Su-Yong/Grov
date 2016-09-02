/*
*  Grov for JS
*
*  ---------------------GNU General Public License----------------------
*  This program is free software: you can redistribute it and/or modify
*  it under the terms of the GNU General Public License as published by
*  the Free Software Foundation, either version 3 of the License, or
*  (at your option) any later version.
*
*  This program is distributed in the hope that it will be useful,
*  but WITHOUT ANY WARRANTY; without even the implied warranty of
*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*  GNU General Public License for more details.
*
*  You should have received a copy of the GNU General Public License
*  along with this program.  If not, see .
*  ---------------------------------------------------------------------
*
*  Copyright 2016. SY all rights reserved.
*/

var Direction = {
  LEFT: 0,
  LEFT_UP: 1,
  LEFT_DOWN: 2,
  RIGHT: 3,
  RIGHT_UP: 4,
  RIGHT_DOWN: 5,
  UP: 6,
  DOWN: 7,
  MIDDLE: 8,
  STOP: 9,
  START: 10
};

var Grov = {
  Level: [],
  Canvas: null,
  Context: null,
  KeyBinder: null,
  Frame: 500,
  Scale: 16,
  Stage: 0,
};

Grov.setCanvas = function(canvas) {
  Grov.Canvas = canvas;
  Grov.Context = canvas.getContext("2d");
  return Grov;
};

Grov.addLevel = function(level) {
  Grov.Level.push(level);
};
/*
Grov.keyBinder = function() {
  this.keys = [];
  var map = [];
  window.onkeydown = function(e) {
    e = e || event;
    map[e.keyCode] = e.type == 'keydown';
    for(var i in this.keys) {
      var keys = this.keys.key;
      if(keys.length == 2) {
        if(map[keys[0]]) {
          keys[0].func();
        }
        if(map[keys[1]]) {
          keys[1].func();
        }
      } else if(map[keys]) {
        keys.func();
      }
    }
  };
};

Grov.keyBinder.prototype.setKeyBind = function(keys, func) {
  this.keys.push({key: keys, func: func});
  return this;
};*/
Grov.run = function() {
  setInterval(function() {
    Grov.Context.clearRect(0, 0, Grov.Canvas.width, Grov.Canvas.height);
    Grov.Level[Grov.Stage].Elements.forEach(function(e, i) {
      if(e.weight == 1)
        e.update();
      e.render();
    });
  }, 1000 / Grov.Frame);
};

var Level = function() {
  this.width = 0;
  this.height = 0;
  this.linker = [];
  this.Elements = [];
};

Level.prototype.setWidth = function(width) {
  this.width = width;
  return this;
};
Level.prototype.setHeight = function(height) {
  this.height = height;
  return this;
};
Level.prototype.setMapLinker = function(linker) {
  this.Linker = linker;
  return this;
};
Level.prototype.setMap = function(map) {
  for(var i in map) {
    if(map[i] > 0) {
      var element = Object.create(this.Linker[map[i]]);
      element.x = Math.floor(i / this.width);
      element.y = i % this.width;
      element.id += "#" + element.x + ":" + element.y;
      this.Elements.push(element);
    }
  }

  return this;
};

var Camera = function() {
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;
};

var Component = function() {
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;
  this.weight = 1;
  this.id = "Component";
  this.isStatic = false;
  this.useGravity = true;
  this.gravity = 0.98;
  this.gravityDirection = 0;

  this.speed = [0, 0];
  this.direction = [0, 0];
  this.angle = 0;
  this.tick = 0;
  this.tick2 = 0;

  this._ = { // private
    indexAngle: 0,
    maxInLength: 0,
    collision: [],
  };
};
Component.Collision = function() {
  this.isCollision = false;
  this.me = null;
  this.element = null;
  this.meAngle = 0;
  this.elementAngle = 0;
  this.angle = 0;
  this.direction = Direction.STOP;
};

Component.prototype.setWidth = function(width) {
  this.width = width;
  this.angleUpdate();
  return this;
};
Component.prototype.setHeight = function(height) {
  this.height = height;
  this.angleUpdate();
  return this;
};
Component.prototype.setWeight = function(weight) {
  this.weight = weight;
  return this;
};
Component.prototype.setRotate = function(angle) {
  this.angle = angle;
  this.angleUpdate();
  return this;
};
Component.prototype.getId = function() {
  return this.id.split("#")[0];
};
Component.prototype.angleUpdate = function() {
  this._.maxInLength = Math.hypot((this.width / 2), (this.height / 2));
  this._.indexAngle = Math.acos(this.width / (2 * this._.maxInLength)) * (180 / Math.PI) * 2;
  return this;
};
Component.prototype.collisionUpdate = function(element) {
  if(Math.hypot(Math.abs(this.x - element.x), Math.abs(this.y - element.y)) <= 1.5 * (this._.maxInLength + element._.maxInLength)) {
    var axis = [];
    var leng = [];
    var lengA = []; // this
    var lengB = []; // element

    axis[0] = Math.abs((this.angle) % 90);
    axis[1] = Math.abs((this.angle + 90) % 90);
    axis[2] = Math.abs((element.angle) % 90);
    axis[3] = Math.abs((element.angle + 90) % 90);

    lengA[0] = Math.abs(this.width / 2);
    lengB[0] = Math.abs(element._.maxInLength * Math.cos((((element._.indexAngle / 2) - axis[0] - element.angle) % 90) * (Math.PI / 180)));

    lengA[1] = Math.abs(this.height / 2);
    lengB[1] = Math.abs(element._.maxInLength * Math.cos((((element._.indexAngle / 2) - axis[1] - element.angle) % 90) * (Math.PI / 180)));

    lengA[2] = Math.abs(this._.maxInLength * Math.cos((((this._.indexAngle / 2) - axis[2] - this.angle) % 90) * (Math.PI / 180)));
    lengB[2] = Math.abs(element.width / 2);

    lengA[3] = Math.abs(this._.maxInLength * Math.cos((((this._.indexAngle / 2) - axis[3] - this.angle) % 90) * (Math.PI / 180)));
    lengB[3] = Math.abs(element.height / 2);

    var L = Math.hypot(Math.abs(this.x - element.x), Math.abs(this.y - element.y));
    leng[0] = Math.abs(L * Math.cos(axis[1] * (Math.PI / 180)));
    leng[1] = Math.abs(L * Math.cos(axis[0] * (Math.PI / 180)));
    leng[2] = Math.abs(L * Math.cos(axis[3] * (Math.PI / 180)));
    leng[3] = Math.abs(L * Math.cos(axis[2] * (Math.PI / 180)));
    if(lengA[0] > leng[0] - lengB[0] &&
       lengA[1] > leng[1] - lengB[1] &&
       lengA[2] > leng[2] - lengB[2] &&
       lengA[3] > leng[3] - lengB[3]) {
      var data = new Component.Collision();
      data.isCollision = true;
      data.me = this;
      data.element = element;
      data.meAngle = this.angle % 90;
      data.elementAngle = element.angle % 90;
      data.angle = element.angle % 90 - this.angle % 90;
      console.log(data.angle);
      if(element.angle % 90 - (45 - this.angle % 90) > 2.5) {
        data.direction = Direction.RIGHT;
      } else if(element.angle % 90 - (45 - this.angle % 90) < -2.5) {
        data.direction = Direction.LEFT;
      } else {
        data.direction - Direction.MIDDLE;
      }
      this._.collision[element.id] = data;
    } else {
      try {
        this._.collision[element.id] = null;
      } catch(err) {}
    }
  }
};
Component.prototype.moveUpdate = function(collision) {
  this.x += Math.sin(this.direction[0] * (Math.PI / 180)) * this.speed[0] * (Grov.Frame / 500) * 0.01;
  this.y += Math.cos(this.direction[0] * (Math.PI / 180)) * this.speed[0] * (Grov.Frame / 500) * 0.01;
  this.x += Math.sin(this.direction[1] * (Math.PI / 180)) * this.speed[1] * (Grov.Frame / 500) * 0.01;
  this.y += Math.cos(this.direction[1] * (Math.PI / 180)) * this.speed[1] * (Grov.Frame / 500) * 0.01;

  if(collision !== null) {
    if(collision.direction == Direction.LEFT) {
      this.angle -= (45 - collision.angle) * (Grov.Frame / 500) * 0.03;
      this.x -= (45 - collision.angle) * (Grov.Frame / 500) * 0.0001;
      this.tick2++;
    } else if(collision.direction == Direction.RIGHT) {
      this.angle += (45 - collision.angle) * (Grov.Frame / 500) * 0.03;
      this.x += (45 - collision.angle) * (Grov.Frame / 500) * 0.0001;
      this.tick2++;
    } else {
      this.angle = 0;
      this.tick2 = 0;
    }
  }
  if(collision === null || !collision.isCollision) {
    if(this.useGravity) {
      this.x += Math.sin(this.gravityDirection * (Math.PI / 180)) * this.gravity * this.tick * this.tick * (Grov.Frame / 500) * 0.00005;
      this.y += Math.cos(this.gravityDirection * (Math.PI / 180)) * this.gravity * this.tick * this.tick * (Grov.Frame / 500) * 0.00005;
    }
  }
};
Component.prototype.update = function() {
  var me = this;
  Grov.Level[Grov.Stage].Elements.forEach(function(e, i) {
    if(e.getId() !== me.getId()) {
      me.collisionUpdate(e);
    }
  });

  var isCollision = null;
  for(var i in this._.collision) {
    if(this._.collision[i] !== null) {
      if(this._.collision[i].isCollision) {
        this.y -= 0.01;
        isCollision = this._.collision[i];
      }
    }
  }
  this.moveUpdate(isCollision);
  if(!isCollision) {
    this.tick++;
  } else {
    this.tick = 0;
  }
};
Component.prototype.setVel = function(direction, speed) {
  direction = direction % 360;
  if((direction < 45 && direction > -45) || (direction < 225 && direction > 155)) {
    this.direction[0] = direction;
    this.speed[0] = speed;
  } else {
    this.direction[1] = direction;
    this.speed[1] = speed;
  }
  return this;
};
Component.prototype.render = function() {
  Grov.Context.fillStyle = "#00A4FF";
  if(this.getId() == "player")
    Grov.Context.fillStyle = "#BDBDBD";
  Grov.Context.save();
  Grov.Context.translate(this.x * Grov.Scale + (this.width * Grov.Scale / 2), this.y * Grov.Scale + (this.height * Grov.Scale / 2));
  Grov.Context.rotate(this.angle * Math.PI / 180);
  Grov.Context.translate(-(this.x * Grov.Scale + (this.width * Grov.Scale / 2)), -(this.y * Grov.Scale + (this.height * Grov.Scale / 2)));
  Grov.Context.fillRect(this.x * Grov.Scale, this.y * Grov.Scale, this.width * Grov.Scale, this.height * Grov.Scale);
  Grov.Context.restore();
};

var Particle = function() {
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;
};

var UI = {};
UI.Button = function() {
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;
  this.background = null;
  this.text = "";
  this.listener = {
    click: null,
    longClick: null,
    doubleClick: null
  };
};

UI.Button.prototype.setWidth = function(width) {
  this.width = width;
  return this;
};
UI.Button.prototype.setHeight = function(height) {
  this.height = height;
  return this;
};
UI.Button.prototype.setX = function(x) {
  this.x = x;
  return this;
};
UI.Button.prototype.setY = function(y) {
  this.y = y;
  return this;
};
UI.Button.prototype.setClickListener = function(listener) {
  this.listener.click = listener;
  return this;
};
UI.Button.prototype.setLongClickListener = function(listener) {
  this.listener.longClick = listener;
  return this;
};
UI.Button.prototype.setDoubleClickListener = function(listener) {
  this.listener.doubleClick = listener;
  return this;
};
UI.Button.prototype.setText = function(text) {
  this.text = text;
  return this;
};
UI.Button.prototype.render = function() {

};
