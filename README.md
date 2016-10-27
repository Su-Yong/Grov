# Grov
The extendable js web game engine

<pre>
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
</pre>

# Introduction
This is simple web game engine. It use a html5 canvas
+ Game source will be simple and easy
+ Everyone can use this library
+ You can make web game even you aren't programmer

# API

## Grov
public global static variable

```js
Grov.keyBinder - Grov key binder
  Grov.keyBinder.setKeyBind(String key, Function function) - call [function] when you press [key]

Grov.addLevel(Level level) - add game [Level]
Grov.run() - call it once when you run Grov
Grov.setCanvas(Canvas canvas) - set game [Canvas]

PRIVATE
  Grov.keyBinder.start() - it call with Grov.run()
```

##Level
Game level variable

```js
Level.setWidth(Number width) - set [Level] [width]
Level.setHeight(Number height) - set [Level] [height]
Level.setMapLinker(Array{Component} Linker) - [Level]'s map number array changed [linker]'s actually value
Level.setMap(Array{Number} map) - set [Level] map by array`s coordinate value
```

##Camera
it doesn't use now

##Component
Game component variable

```js
Component.constructor(String type) - set component`s [type] (Rect / Circle)

Component.setWidth(Number width) - set [Component] [width]
Component.setHeight(Number height) - set [Component] [height]
Component.setRotate(Number angle) - set [Component] [angle]
Component.getId() - get [Component]`s id
Component.getX() - get [Component]`s X coordinate
Component.getY() - get [Component]`s Y coordinate
Component.setTexture(Image texture) - set [Component] [texture]
Component.setVel(Number angle, Number speed, String type) - move [component] speed [speed] with [angle] direction
Component.delete() - delete [Component]

PRIVATE
  Component.Collision - collision variable
  Component.angleUpdate() - update angle
  Component.collisionUpdate() - update collision
  Component.moveUpdate() - update coordinate
  Component.update() - update all
  Component.render() - render [component]
```

##Particle
it doesn't use now

##UI
game UI component

```js
UI.Button - game button
  UI.Button.setWidth(Number width) - set [Button] [width]
  UI.Button.setHeight(Number height) - set [Button] [height]
  UI.Button.setX(Number x) - set [Button] [X] coordinate
  UI.Button.setY(Number y) - set [Button] [Y] coordinate
  UI.Button.setText(String text) - set [Button] [text]
  UI.Button.setClickListener(Function listener) - call [listener] when click [Button]
  UI.Button.setLongClickListener(Function listener) - call [listener] when long click [Button]
  
  PRIVATE
    UI.Button.renderNormal() - render [Button] when non-click
    UI.Button.renderOver() - render [Button] when over [Button]
    UI.Button.renderOver() - render [Button] when over [Button]
```
---

Copyright 2016. SY PlanP all rights reserved.
