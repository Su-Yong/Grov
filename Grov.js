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

var Grov = {
  Level: [],
  Canvas: null,
  Context: null,
  KeyBinder: null,
  Frame: 30,
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
};
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

  this.speed = [0, 0];
  this.direction = [0, 0];
  this.angle = 0;

  this._ = { // private
    indexAngle: 0,
    maxLength: 0,
    maxInLength: 0,
    isCollision: [],
  };
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
  this._.indexAngle = Math.acos((this.width / 2) / this._.maxInLength);
  this._.maxLength = this._.maxInLength * ((this._.indexAngle - this.angle > this._.indexAngle / 2) ? Math.cos(this._.indexAngle - this.angle - this._.indexAngle / 2) : Math.cos(this._.indexAngle - this.angle));
  //console.log(this._.maxInLength + " : " + this._.indexAngle + " : " + this._.maxLength);
  return this;
};
Component.prototype.collisionUpdate = function(element) {
  if(Math.hypot(Math.abs(this.x - element.x), Math.abs(this.y - element.y)) <= 1.5 * (this._.maxInLength + element._.maxInLength)) {
    var axis = []; // this x, this y, element x, element y
    var leng = [];
    var lengA = []; // this
    var lengB = []; // element

    axis[0] = (this.angle) % 180;
    axis[1] = (this.angle + 90) % 180;
    axis[2] = (element.angle) % 180;
    axis[3] = (element.angle + 90) % 180;

    lengA[0] = Math.abs(this.width / 2).toFixed(4);
    lengB[0] = Math.abs(element._.maxInLength * Math.cos(element.angle - axis[0])).toFixed(4);

    lengA[1] = Math.abs(this.height / 2).toFixed(4);
    lengB[1] = Math.abs(element._.maxInLength * Math.cos((element.angle + 90) - axis[1])).toFixed(4);

    lengA[2] = Math.abs(this._.maxInLength * Math.cos(this.angle - axis[2])).toFixed(4);
    lengB[2] = Math.abs(element.width / 2).toFixed(4);

    lengA[3] = Math.abs(this._.maxInLength * Math.cos((this.angle + 90) - axis[3])).toFixed(4);
    lengB[3] = Math.abs(element.height / 2).toFixed(4);

    var L = Math.hypot(Math.abs(this.x - element.x), Math.abs(this.y - element.y));
    leng[0] = Math.abs(L * Math.cos(axis[0])).toFixed(4);
    leng[1] = Math.abs(L * Math.cos(axis[1])).toFixed(4);
    leng[2] = Math.abs(L * Math.cos(axis[2])).toFixed(4);
    leng[3] = Math.abs(L * Math.cos(axis[3])).toFixed(4);
    if(lengA[0] > leng[0] - lengB[0] &&
       lengA[1] > leng[1] - lengB[1] &&
       lengA[2] > leng[2] - lengB[2] &&
       lengA[3] > leng[3] - lengB[3]) {
      console.log("Collision!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    }
    //console.log(element.id + ":\n  " + leng + "\n  " + lengA + "\n  " + lengB);
    /*if(this.y < element.y) {
      //console.log((this.y + this._.maxLength).toFixed(2) + " : " + (element.y - element._.maxLength).toFixed(2));
      if(this.y + this._.maxLength >= element.y - element._.maxLength) {
        console.log("collision");
      }
    } else if(this.y > element.y) {
      if(this._.y + this._.maxLength <= element.y - element._.maxLength) {
        console.log("collision");
      }
    } else {

    }
    this._.isCollision[element.id] = true;
  } else {
    this._.isCollision[element.id] = false;
  }*/
  }
};
var a = 0;
Component.prototype.update = function() {
  var me = this;
  Grov.Level[Grov.Stage].Elements.forEach(function(e, i) {
    if(e.getId() !== me.getId()) {
      me.collisionUpdate(e);
    }
  });
  if(a===0)
    this.y += 0.01;
  if(a===1)
    this.y -= 0.01;
  if(a===2)
    this.x += 0.01;
  if(a===3)
    this.x -= 0.01;
  for(var i in this._.isCollision) {
    if(!this._.isCollision[i]) {
      this.y += 0.001;
      //collision
    } else {
      //console.log("stop");
      //not
    }
  }
};
Component.prototype.setVel = function(direction, speed) {
  if((direction < 45 && direction > -45) || (direction < 225 && direction > 155)) {
    this.direction[0] = direction;
    this.speed[1] = speed;
  } else {
    this.direction[1] = direction;
    this.speed[1] = speed;
  }
  return this;
};
Component.prototype.render = function() {
  Grov.Context.fillStyle = "#00A4FF";
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
