/*
*  Napxe for JS
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

var Napxe = {
  Level: null,
  Canvas: null,
  Context: null
};

var Level = function() {
  this.width = 0;
  this.height = 0;
  this.Elements: [],
};

Level.prototype.addElement = function(element) {
  this.Elements.push(element);
  return this;
};

Level.prototype.setElements = function(elements) {
  this.Elements = elements;
  return this;
}

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
  this.isStatic = false;

  this.speed = [0, 0];
  this.direction = [0, 0];
  this.angle = 0;
};

Component.prototype.setWidth = function(width) {
  this.width = width;
  return this;
};
Component.prototype.setHeight = function(height) {
  this.height = height;
  return this;
};
Component.prototype.setX = function(x) {
  this.x = x;
  return this;
};
Component.prototype.setY = function(y) {
  this.y = y;
  return this;
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
Component.prototype.collistionUpdate = function(element) {
  if(Math.hypot(Math.abs(this.x - element.x), Math.abs(this.y - element.y)) <= Math.hypot((this.width / 2), (this.height / 2)) + Math.hypot((element.width / 2), (element.height / 2))) {
    this.angle
  }
}
Component.prototype.render = function() {

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
}
UI.Button.prototype.render = function() {

};
