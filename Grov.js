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
  Frame: 120,
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
  this.isStatic = false;

  this.speed = [0, 0];
  this.direction = [0, 0];
  this.angle = 0;

  this._ = { // private
    indexAngle: 0,
    maxLength: 0,
    maxInLength: 0,
    isCollision: false
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
Component.prototype.angleUpdate = function() {
  this._.maxInLength = Math.hypot((this.width / 2), (this.height / 2));
  this._.indexAngle = Math.asin(this._.maxInLength / (this.width / 2));
  this._.maxLength = this._.maxInLength * ((this._.indexAngle - this.angle > this._.indexAngle / 2) ? Math.cos(this._.indexAngle - this.angle - this._.indexAngle / 2) : Math.cos(this._.indexAngle - this.angle));
  return this;
};
Component.prototype.collisionUpdate = function(element) {
  //console.log(Math.hypot((this.width / 2), (this.height / 2)) + Math.hypot((element.width / 2), (element.height / 2)));
  console.log(Math.hypot(Math.abs(this.x - element.x), Math.abs(this.y - element.y)));
  if(Math.hypot(Math.abs(this.x - element.x), Math.abs(this.y - element.y)) <= Math.hypot((this.width / 2), (this.height / 2)) + Math.hypot((element.width / 2), (element.height / 2))) {
    this._.isCollision = true;
  } else {
    this._.isCollision = false;
  }
};
Component.prototype.update = function() {
  var me = this;
  Grov.Level[Grov.Stage].Elements.forEach(function(e, i) {
    me.collisionUpdate(e);
  });
  if(!this._.isCollision) {
    this.y += 0.01;
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
