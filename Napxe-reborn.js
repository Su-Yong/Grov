/*
*  Napxe for JS
*  Apatch Lisence 2.0
*  Copyright 2016. SY all rights reserved.
*/

var Napxe = {
  Level: null,
};

var Level = function() {
  this.width = 0;
  this.height = 0;
  Elements: null,
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
  this.listener = {
    click: null,
    longClick: null,
    doubleClick: null,
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
UI.Button.prototype.render = function() {

};
