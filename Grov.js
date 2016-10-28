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

// CAPTION - You CANNOT edit component's width and height!!!!!!!!!
// CAPTION - You CANNOT edit component's width and height!!!!!!!!!
// CAPTION - You CANNOT edit component's width and height!!!!!!!!!
// CAPTION - You CANNOT edit component's width and height!!!!!!!!!
// CAPTION - You CANNOT edit component's width and height!!!!!!!!!

(function() {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'https://fonts.googleapis.com/earlyaccess/nanumgothic.css?family=Nanum+Gothic';
  var link2 = document.createElement('link');
  link2.rel = 'stylesheet';
  link2.type = 'text/css';
  link2.href = 'https://fonts.googleapis.com/css?family=Product+Sans';

  document.getElementsByTagName('head')[0].appendChild(link);
  document.getElementsByTagName('head')[0].appendChild(link2);
})();

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
  Backup: [],
  Canvas: null,
  Context: null,
  KeyBinder: null,
  Frame: 500,
  Scale: 16,
  Stage: 0,
  process: null,
};

Grov.setCanvas = function(canvas) {
  Grov.Canvas = canvas;
  Grov.Context = canvas.getContext("2d");
  Grov.Canvas.onmousemove = function(event) {
    var x = event.clientX - Grov.Canvas.offsetLeft;
    var y = event.clientY - Grov.Canvas.offsetTop;
    Grov.Level[Grov.Stage].UIElements.forEach(function(e, i) {
      if(e.type === "button") {
        if(e.x < x && x < e.x + e.width) {
          if(e.y < y && y < e.y + e.height) {
            try {
              e.listener.over();
            } catch(err) {}
            e._.isOver = true;
          } else {
            e._.isOver = false;
          }
        } else {
          e._.isOver = false;
        }
      }
    });
  };

  Grov.Canvas.onmouseout = function(event) {
    var x = event.clientX - Grov.Canvas.offsetLeft;
    var y = event.clientY - Grov.Canvas.offsetTop;
    Grov.Level[Grov.Stage].UIElements.forEach(function(e, i) {
      if(e.type === "button") {
        if(e.x < x && x < e.x + e.width) {
          if(e.y < y && y < e.y + e.height) {
            e._.isOver = false;
          }
        }
      }
    });
  };
  Grov.Canvas.onmousedown = function(event) {
    var x = event.clientX - Grov.Canvas.offsetLeft;
    var y = event.clientY - Grov.Canvas.offsetTop;
    Grov.Level[Grov.Stage].UIElements.forEach(function(e, i) {
      if(e.type === "button") {
        if(e.x < x && x < e.x + e.width) {
          if(e.y < y && y < e.y + e.height) {
            e._.isPressed++;
            e._.isPressed = true;
          } else {
            e._.pressValue = 0;
            e._.isPressed = false;
          }
        } else {
          e._.pressValue = 0;
          e._.isPressed = false;
        }
      }
    });
  };
  Grov.Canvas.onmouseup = function(event) {
    var x = event.clientX - Grov.Canvas.offsetLeft;
    var y = event.clientY - Grov.Canvas.offsetTop;
    Grov.Level[Grov.Stage].UIElements.forEach(function(e, i) {
      if(e.type === "button") {
        e._.isPressed = false;
        if(e.x < x && x < e.x + e.width) {
          if(e.y < y && y < e.y + e.height) {
            if(e._.pressValue < Grov.Frame * 0.08 && e._.pressValue > 0) {
              e.listener.click();
            }
            if(e._.pressValue > Grov.Frame * 0.12) {
              e.listener.longClick();
            }
          }
        }
      }
    });
  };
  return Grov;
};

Grov.addLevel = function(level) {
  Grov.Level.push(Object.create(level));
  Grov.Backup = Object.clone(Grov.Level);
};
Grov.keyBinder = {
  customKeys: [],
  key: {},
};
//-----------------------
Object.prototype.clone = function() {
  var newObj = (this instanceof Array) ? [] : {};
  for (var i in this) {
    if (i == 'clone') continue;
    if (this[i] && typeof this[i] == "object") {
      newObj[i] = this[i].clone();
    } else newObj[i] = this[i]
  } return newObj;
};
//------------------------------------
Grov.keyBinder.setKeyBind = function(keys, func) {
  Grov.keyBinder.customKeys.push({key: keys, func: func});
  return this;
};
Grov.keyBinder.start = function() {
  window.onkeypress = function(e) {
    e = e || window.event;
    Grov.keyBinder.key[String.fromCharCode(e.keyCode || e.which).toLowerCase()] = true;
  };
  window.onkeyup = function(e) {
    e = e || window.event;
    Grov.keyBinder.key[String.fromCharCode(e.keyCode || e.which).toLowerCase()] = false;
  };
};

Grov.run = function() {
  Grov.keyBinder.start();
  Grov.process = setInterval(function() {
    for(var i in Grov.keyBinder.customKeys) {
      if(Grov.keyBinder.key[Grov.keyBinder.customKeys[i].key]) {
        Grov.keyBinder.customKeys[i].func();
      }
    }
    Grov.Context.clearRect(0, 0, Grov.Canvas.width, Grov.Canvas.height);
    Grov.Context.imageSmoothingEnabled = true;
    Grov.Level[Grov.Stage].Elements.forEach(function(e, i) {
      if(!e.isStatic)
        e.update();
      e.render();
    });
    Grov.Level[Grov.Stage].UIElements.forEach(function(e, i) {
      e.render();
      if(e.type === "button") {
        if(e._.isPressed) {
          e._.pressValue++;
        } else {
          e._.pressValue = 0;
        }
      }
    });
  }, 1000 / Grov.Frame);
};

Grov.reloadLevel = function() {
  clearInterval(Grov.process);
  Grov.Context.clearRect(0, 0, Grov.Canvas.width, Grov.Canvas.height);
  Grov.Level[Grov.Stage] = Object.clone(Grov.Backup[Grov.Stage]);
  Grov.run();
};

var Level = function() {
  this.width = 0;
  this.height = 0;
  this.linker = [];
  this.Elements = [];
  this.UIElements = [];
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
      element.x = i % this.width;
      element.y = Math.floor(i / this.width);
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

var Component = function(type) {
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;
  this.weight = 1;
  this.id = "Component";
  this.isStatic = true;
  this.isSolid = true;
  this.useGravity = false;
  this.gravity = 0.98;
  this.gravityDirection = 180;

  this.type = type;
  this.speed = [0, 0];
  this.direction = [0, 0];
  this.angle = 0;
  this.tick = 0;
  this.tick2 = 0;
  this.smooth = [];

  this._ = { // private
    indexAngle: 0,
    maxLength: 0,
    collision: [],
    isDebug: false,
  };

  this.listener = {
    collision: null,
    tick: null
  };
};
Component.Collision = function() {
  this.isCollision = false;
  this.me = null;
  this.element = null;
  this.deep = 0;
  this.direction = Direction.STOP;
};

Component.prototype.setWidth = function(width) {
  this.width = width;
  this.height = width;
  this.angleUpdate();
  return this;
};
Component.prototype.setHeight = function(height) {
  this.height = height;
  this.width = height;
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
Component.prototype.getX = function() {
  return this.x + this.width / 2;
};
Component.prototype.getY = function() {
  return this.y + this.height / 2;
};

Component.prototype.setTexture = function(texture) {
  this.texture = texture;
};

Component.prototype.angleUpdate = function() {
  this._.maxLength = Math.hypot((this.width / 2), (this.height / 2));
  this._.indexAngle = Math.acos((this.width / 2) / this._.maxLength) * 180 / Math.PI;
};
Component.prototype.collisionUpdate = function(element) {
  if(Math.hypot(Math.abs(this.x - element.x), Math.abs(this.y - element.y)) <= 1.5 * (this._.maxLength + element._.maxLength)) {
    var axis = [];
    var realAngle = [];
    var leng = [];
    var lengA = []; // this
    var lengB = []; // element

    axis[0] = (this.angle);
    axis[1] = (this.angle + 90);
    axis[2] = (element.angle);
    axis[3] = (element.angle + 90);

    realAngle[0] = 90 - Math.abs(element._.indexAngle - (90 - axis[0] % 90) - element.angle) % 90;
    realAngle[1] = 90 - Math.abs(element._.indexAngle - (90 - axis[1] % 90) - element.angle) % 90;
    realAngle[2] = 90 - Math.abs(this._.indexAngle - (90 - axis[2] % 90) - this.angle) % 90;
    realAngle[3] = 90 - Math.abs(this._.indexAngle - (90 - axis[3] % 90) - this.angle) % 90;

    lengA[0] = Math.abs(this.width / 2);
    lengB[0] = Math.abs(element._.maxLength * Math.cos(realAngle[0] / 180 * Math.PI));

    lengA[1] = Math.abs(this.height / 2);
    lengB[1] = Math.abs(element._.maxLength * Math.cos(realAngle[1] / 180 * Math.PI));

    lengA[2] = Math.abs(this._.maxLength * Math.sin(realAngle[2] / 180 * Math.PI));
    lengB[2] = Math.abs(element.width / 2);

    lengA[3] = Math.abs(this._.maxLength * Math.sin(realAngle[3] / 180 * Math.PI));
    lengB[3] = Math.abs(element.height / 2);

    var xleng = Math.abs((this.x + this.width / 2) - (element.x + element.width / 2));
    var yleng = Math.abs((this.y + this.height / 2) - (element.y + element.height / 2));
    leng[0] = Math.abs(Math.cos(axis[0] / 180 * Math.PI) * (xleng - (yleng * Math.tan(axis[0] / 180 * Math.PI))));
    leng[1] = Math.abs(Math.cos(axis[1] / 180 * Math.PI) * (xleng - (yleng * Math.tan(axis[1] / 180 * Math.PI))));
    leng[2] = Math.abs(Math.cos(axis[2] / 180 * Math.PI) * (xleng - (yleng * Math.tan(axis[2] / 180 * Math.PI))));
    leng[3] = Math.abs(Math.cos(axis[3] / 180 * Math.PI) * (xleng - (yleng * Math.tan(axis[3] / 180 * Math.PI))));

    if(leng[0] - lengA[0] < lengB[0] &&
       leng[1] - lengA[1] < lengB[1] &&
       leng[2] - lengA[2] < lengB[2] &&
       leng[3] - lengA[3] < lengB[3]) {
      var data = new Component.Collision();
      data.isCollision = true;
      data.me = this;
      data.element = element;
      data.angle = 180 - (Math.atan2(this.getX() - element.getX(), this.getY() - element.getY()) * 180 / Math.PI);
      this.listener.collision(element, data.angle);
      this._.collision[element.id] = data;
    } else {
      try {
        this._.collision[element.id] = null;
      } catch(err) {}
    }
  }
};
Component.prototype.moveUpdate = function(collision) {
  if(this.speed[0] !== 0) {
    this.x += Math.sin(this.direction[0] * (Math.PI / 180)) * this.speed[0] * (Grov.Frame / 500) * 0.01;
    this.y += Math.cos(this.direction[0] * (Math.PI / 180)) * this.speed[0] * (Grov.Frame / 500) * 0.01;
  }
  if(this.speed[1] !== 0) {
    this.x += Math.sin(this.direction[1] * (Math.PI / 180)) * this.speed[1] * (Grov.Frame / 500) * 0.01;
    this.y += Math.cos(this.direction[1] * (Math.PI / 180)) * this.speed[1] * (Grov.Frame / 500) * 0.01;
  }

  if(collision !== null) {/*
    if(collision.direction === Direction.LEFT) {
      this.angle -= (45 - collision.angle) * (Grov.Frame / 500) * 0.03;
      this.x -= (45 - collision.angle) * (Grov.Frame / 500) * 0.0001;
      this.tick2++;
    } else if(collision.direction === Direction.RIGHT) {
      this.angle += (45 - collision.angle) * (Grov.Frame / 500) * 0.03;
      this.x += (45 - collision.angle) * (Grov.Frame / 500) * 0.0001;
      this.tick2++;
    } else {
      this.angle = 0;
      this.tick2 = 0;
    }*/
  }
  if(collision === null || !collision.isCollision) {
    if(this.useGravity) {
      this.x -= Math.sin(this.gravityDirection * (Math.PI / 180)) * this.gravity * this.tick * this.tick * (Grov.Frame / 500) * 0.00005;
      this.y -= Math.cos(this.gravityDirection * (Math.PI / 180)) * this.gravity * this.tick * this.tick * (Grov.Frame / 500) * 0.00005;
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

  var side = false;
  var isCollision = null;
  collisionChecker: for(var i in this._.collision) {
    if(this._.collision[i] !== null) {
      if(this._.collision[i].isCollision) {
        isCollision = this._.collision[i].isCollision;
        if(this._.collision[i].element.isSolid) {
          if(this._.collision[i].element.type === "Rect") {
            if(this._.collision[i].angle < 45 || this._.collision[i].angle >= 315) {
              this.x -= Math.sin(0 * (Math.PI / 180)) * 0.05;
              this.y -= Math.cos(0 * (Math.PI / 180)) * 0.05;
            } else if(this._.collision[i].angle >= 45 && this._.collision[i].angle < 135) {
              this.x -= Math.sin(270 * (Math.PI / 180)) * 0.05;
              this.y -= Math.cos(270 * (Math.PI / 180)) * 0.05;
            } else if(this._.collision[i].angle >= 135 && this._.collision[i].angle < 225) {
              this.x -= Math.sin(180 * (Math.PI / 180)) * 0.05;
              this.y -= Math.cos(180 * (Math.PI / 180)) * 0.05;
            } else if(this._.collision[i].angle >= 225 && this._.collision[i].angle < 315) {
              this.x -= Math.sin(90 * (Math.PI / 180)) * 0.05;
              this.y -= Math.cos(90 * (Math.PI / 180)) * 0.05;
            }
          } else {
            var a = 180 - this._.collision[i].angle;
            if(this.useGravity) {
              this.y += Math.cos(a * (Math.PI / 180)) * 0.01;
            } else {
              this.y += Math.cos(a * (Math.PI / 180)) * 0.1;
            }
            this.x += Math.sin(a * (Math.PI / 180)) * 0.1;
          }
          if(Math.abs((this._.collision[i].angle > 180 ? 360 - this._.collision[i].angle : this._.collision[i].angle) - (this.gravityDirection - 180) % 360) < 45)
            side = true;
          if(this.useGravity) {
            this.x -= Math.sin(this.gravityDirection * (Math.PI / 180)) * this.gravity * 0.2;
            this.y -= Math.cos(this.gravityDirection * (Math.PI / 180)) * this.gravity * 0.2;
          }
          var isExists = false;
          for(var j in Grov.Level[Grov.Stage].Elements) {
            if(Grov.Level[Grov.Stage].Elements[j].id === this._.collision[i].element.id) {
              isExists = true;
              break;
            }
          }
          if(!isExists) {
            this._.collision[i] = null;
            continue;
          }
        }
      }
    }
  }
  if(!isCollision) {
    this.tick++;
  } else if(isCollision && !side) {
    this.tick++;
  } else {
    this.tick = 0;
  }
  this.moveUpdate(isCollision);

  if(!this.smooth[0]) {
    this.direction[0] = 0;
    this.speed[0] = 0;
  } else if(this.tick % (Grov.Frame) === Grov.Frame / 2) {
    this.direction[0] = 0;
    this.speed[0] = 0;
    this.smooth[0] = false;
  }
  if(!this.smooth[1]) {
    this.direction[1] = 0;
    this.speed[1] = 0;
  } else if(this.tick % (Grov.Frame) === Grov.Frame / 2) {
    this.direction[1] = 0;
    this.speed[1] = 0;
    this.smooth[1] = false;
  }
  try {
    this.listener.tick(this);
  } catch(err) {}
};
Component.prototype.setVel = function(direction, speed, type) {
  direction = direction % 360;
  if((direction < 45 && direction > -45) || (direction < 225 && direction > 155)) {
    this.direction[0] = direction;
    this.speed[0] = speed;
    if(type === "smooth") {
      this.smooth[0] = true;
    }
  } else {
    this.direction[1] = direction;
    this.speed[1] = speed;
    if(type === "smooth") {
      this.smooth[1] = true;
    }
  }
  return this;
};
Component.prototype.render = function() {
  Grov.Context.save();
  Grov.Context.translate(this.x * Grov.Scale + (this.width * Grov.Scale / 2), this.y * Grov.Scale + (this.height * Grov.Scale / 2));
  Grov.Context.rotate(this.angle * Math.PI / 180);
  Grov.Context.translate(-(this.x * Grov.Scale + (this.width * Grov.Scale / 2)), -(this.y * Grov.Scale + (this.height * Grov.Scale / 2)));
  Grov.Context.drawImage(this.texture, this.x * Grov.Scale, this.y * Grov.Scale, this.width * Grov.Scale, this.height * Grov.Scale);

  if(this._.isDebug) {
    Grov.Context.strokeStyle = "#FF0000";
    Grov.Context.lineWidth = 2;
    Grov.Context.strokeRect(this.x * Grov.Scale, this.y * Grov.Scale, this.width * Grov.Scale, this.height * Grov.Scale);
  }

  Grov.Context.restore();
};

Component.prototype.delete = function() {
  for(var i in Grov.Level[Grov.Stage].Elements) {
    if(Grov.Level[Grov.Stage].Elements[i].id === this.id) {
      Grov.Level[Grov.Stage].Elements.splice(i, 1);
      break;
    }
  }
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
  this.type = "button";
  this.listener = {
    over: null,
    click: null,
    longClick: null,
  };
  this._ = {
    isOver: false,
    isPressed: false,
    pressValue: 0,
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
UI.Button.prototype.renderNormal = function() {
  var size = Math.min((this.width - 20) / this.text.split("").length, this.height - 40);

  Grov.Context.save();
  Grov.Context.lineWidth = Math.max(5, size / 7);
  Grov.Context.textAlign = "center";
  Grov.Context.font = size + "px Product Sans, Nanum Gothic";

  Grov.Context.strokeStyle = ColorLuminance(this.background, -0.2);
  Grov.Context.fillStyle = ColorLuminance(this.background, -0.2);

  Grov.Context.fillText(this.text, this.width / 2 + this.x, this.height / 2 + size / 2 + 1 + this.y);
  Grov.Context.strokeRoundRect(5 + this.x, 5 + 2 + this.y, this.width - 5, this.height - 5 + 2, 5);

  Grov.Context.strokeStyle = this.background;
  Grov.Context.fillStyle = this.background;

  Grov.Context.fillText(this.text, this.width / 2 + this.x, this.height / 2 + size / 2 + this.y);
  Grov.Context.strokeRoundRect(5 + this.x, 5 + this.y, this.width - 5, this.height - 5, 5);

  Grov.Context.restore();
};
UI.Button.prototype.renderOver = function() {
  var size = Math.min((this.width - 20) / this.text.split("").length, this.height - 40);

  Grov.Context.save();
  Grov.Context.lineWidth = Math.max(5, size / 7);
  Grov.Context.textAlign = "center";
  Grov.Context.font = size + "px Product Sans, Nanum Gothic";

  Grov.Context.strokeStyle = ColorLuminance(this.background, -0.4);
  Grov.Context.fillStyle = ColorLuminance(this.background, -0.4);

  Grov.Context.fillText(this.text, this.width / 2 + this.x, this.height / 2 + size / 2 + 1 + this.y);
  Grov.Context.strokeRoundRect(5 + this.x, 5 + 2 + this.y, this.width - 5, this.height - 5 + 2, 5);

  Grov.Context.strokeStyle = ColorLuminance(this.background, -0.2);
  Grov.Context.fillStyle = ColorLuminance(this.background, -0.2);

  Grov.Context.fillText(this.text, this.width / 2 + this.x, this.height / 2 + size / 2 + this.y);
  Grov.Context.strokeRoundRect(5 + this.x, 5 + this.y, this.width - 5, this.height - 5, 5);

  Grov.Context.restore();
};
UI.Button.prototype.renderPressed = function() {
  var size = Math.min((this.width - 20) / this.text.split("").length, this.height - 40);
  var padding = Math.max(5, size / 7) / 2;

  Grov.Context.save();
  Grov.Context.lineWidth = Math.max(5, size / 7);
  Grov.Context.textAlign = "center";
  Grov.Context.font = size + "px Product Sans, Nanum Gothic";

  Grov.Context.fillStyle = ColorLuminance(this.background, -0.2);
  Grov.Context.fillRoundRect(5 - padding + this.x, 5 + 2 - padding + this.y, this.width - 5 + padding, this.height - 5 + 2 + padding, 5);

  Grov.Context.fillStyle = this.background;
  Grov.Context.fillRoundRect(5 - padding + this.x, 5 - padding + this.y, this.width - 5 + padding, this.height - 5 + padding , 5);

  Grov.Context.fillStyle = ColorLuminance(this.background, -0.2);
  Grov.Context.fillText(this.text, this.width / 2 + this.x, this.height / 2 + size / 2 - 2 + this.y);

  Grov.Context.fillStyle = "#FFFFFF";
  Grov.Context.fillText(this.text, this.width / 2 + this.x, this.height / 2 + size / 2 + this.y);

  Grov.Context.restore();
};
UI.Button.prototype.render = function() {
  if(this._.isOver) {
    this.renderOver();
    Grov.Canvas.setAttribute("style", "cursor: pointer");
    if(this._.isPressed) {
      this.renderPressed();
    }
  }
  else {
    this.renderNormal();
    Grov.Canvas.setAttribute("style", "cursor: cursor");
  }
};

UI.Text = function() {
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;
  this.background = null;
  this.text = "";
  this.type = "textviewer";
};
UI.Text.prototype.render = function() {
  var size = Math.min((this.width - 20) / this.text.split("").length, this.height - 40);
  var padding = Math.max(5, size / 7) / 2;

  Grov.Context.save();
  Grov.Context.lineWidth = Math.max(5, size / 7);
  Grov.Context.textAlign = "center";
  Grov.Context.font = size + "px Product Sans, Nanum Gothic";

  Grov.Context.fillStyle = ColorLuminance(this.background, -0.2);
  Grov.Context.fillText(this.text, this.width / 2 + this.x, this.height / 2 + size / 2 - 1 + this.y);

  Grov.Context.fillStyle = this.background;
  Grov.Context.fillText(this.text, this.width / 2 + this.x, this.height / 2 + size / 2 + this.y);

  Grov.Context.restore();
};
/*


  "map": [
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
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 3, 3, 0, 0,
    0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0,
    0, 0, 3, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3, 0, 0,
    0, 0, 3, 3, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3, 3, 0, 0,
    0, 0, 3, 3, 2, 2, 2, 8, 3, 0, 0, 2, 2, 0, 0, 2, 2, 2, 2, 3, 3, 3, 3, 0, 0,
    0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0,
    0, 0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0,
    0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 2, 0, 0,
    0, 0, 0, 0, 0, 3, 3, 3, 2, 0, 0, 0, 3, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0,
    0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 3, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 2, 0,
    0, 0, 0, 0, 3, 3, 3, 3, 3, 2, 0, 0, 3, 2, 0, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2,
  ],

*/
UI.Image = function() {
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;
  this.background = null;
  this.text = "";
  this.type = "imageviewer";
};
UI.Image.prototype.render = function() {
  Grov.Context.drawImage(this.background, this.x, this.y, this.width, this.height);
};

// Thanks http://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
CanvasRenderingContext2D.prototype.fillRoundRect = function(x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r);
  this.arcTo(x + w, y + h, x, y + h, r);
  this.arcTo(x, y + h, x, y, r);
  this.arcTo(x, y, x + w, y, r);
  this.closePath();

  this.fill();
};
CanvasRenderingContext2D.prototype.strokeRoundRect = function(x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r);
  this.arcTo(x + w, y + h, x, y + h, r);
  this.arcTo(x, y + h, x, y, r);
  this.arcTo(x, y, x + w, y, r);
  this.closePath();

  this.stroke();
};

//Thanks https://www.sitepoint.com/javascript-generate-lighter-darker-color/
function ColorLuminance(hex, lum) {
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}

function angleSet(angle) {
  var result = (angle < 0) ? 90 + angle : angle;
  return (result > 90) ? 180 - result : result;
}
