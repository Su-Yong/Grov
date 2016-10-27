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

#### METHOD
```js
Grov.addLevel(Level level) - add game [Level]
Grov.run() - call it once when you run Grov
Grov.setCanvas(Canvas canvas) - set game [Canvas]

PRIVATE
  Grov.keyBinder.start() - it call with Grov.run()
```
#### FIELD

```js
Grov.Frame - Frame
Grov.Scale - Component scale
Grov.Stage - Stage count

PRIVATE
  Grov.Level - Map array
  Grov.Backup - Map array backup
  Grov.Canvas - Game canvas
  Grov.Context - Game canvas context
  Grov.KeyBinder - key binder object
  Grov.process - Process (IDK)

```

### Grov.keyBinder
Grov key binder

#### METHOD
```js
Grov.keyBinder.setKeyBind(String key, Function function) - call [function] when you press [key]
```
#### FIELD
```js
PRIVATE
  Grov.keyBinder.customKeys - (IDK)
  Grov.keyBinder.key - key object array
```

## Level
Game level variable

#### METHOD
```js
Level.setWidth(Number width) - set [Level] [width]
Level.setHeight(Number height) - set [Level] [height]
Level.setMapLinker(Array{Component} Linker) - [Level]'s map number array changed [linker]'s actually value
Level.setMap(Array{Number} map) - set [Level] map by array`s coordinate value
```
#### FIELD
```js
PRIVATE
  Level.width - level width array
  Level.height - level height array
  Level.linker - level linker array
  Level.Elements - level comonent array
  Level.UIElements - level UI component array
```

## Camera
it doesn't use now

#### METHOD
```js

```

#### FIELD
```js
PRIVATE
  Camera.x - camera X coordinate
  Camera.y - camera Y coordinate
  Camera.width - camera width
  Camera.height - camera height
```

## Component
Game component variable

#### METHOD
```js
Component.constructor(String type) - set component [type] (Rect / Circle)

Component.setWidth(Number width) - set [Component] [width]
Component.setHeight(Number height) - set [Component] [height]
Component.setRotate(Number angle) - set [Component] [angle]
Component.getId() - get [Component] id
Component.getX() - get [Component] X coordinate
Component.getY() - get [Component] Y coordinate
Component.setTexture(Image texture) - set [Component] [texture]
Component.setVel(Number angle, Number speed, String type) - move [component] speed [speed] with [angle] direction
Component.delete() - delete [Component]

PRIVATE
  Component.angleUpdate() - update angle
  Component.collisionUpdate() - update collision
  Component.moveUpdate() - update coordinate
  Component.update() - update all
  Component.render() - render [component]
```
#### FIELD
```js
Component.isStatic - move check
Component.isSolid - collision check
Component.useGravity - gravity use
Component.gravity - gravity value
Component.gravityDirection - gravity angle

PRIVATE
  Component.type - component type
  Component.x - component X coordinate
  Component.y - component Y coordinate
  Component.width - component width
  Component.height - component width
  Component.weight - component mess
  Component.id - component id
  Component.speed - component speed array
  Component.direction - component direction array
  Component.angle - component angle
  Component.tick - component tick
  Component.tick2 - component tick
  Component.smooth - component smooth check
```
### Component._
private field

#### METHOD
```js

```
#### FIELD
```js
Component._.indexAngle - middle angle
Component._.maxLength - center to point length
Component._.collision - collision object array
Component._.isDebug - debuging check
```

### Component.listener
listener field

#### METHOD
```js

```

#### FIELD
```js
Component.listener.collision - listener collision array
Component.listener.tick - tick
```

### Component.Collision
collision variable

#### METHOD
```js

```

#### FIELD
```js
Component.Collision.isCollision = false;
Component.Collision.me = null;
Component.Collision.element = null;
Component.Collision.deep = 0;
Component.Collision.direction = Direction.STOP;
```

## Particle
it doesn't use now

#### METHOD
```js

```
#### FIELD
```js
  Particle.x - Particle X coordinate
  Particle.y - Particle Y coordinate
  Particle.width - Particle width
  Particle.height - Particle width
```

## UI
game UI component

### UI.Button
game button

#### METHOD
```js
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
#### FIELD
```js
PRIVATE
  UI.Button.x - buttone X coordinate
  UI.Button.y - buttone Y coordinate
  UI.Button.width - buttone width
  UI.Button.height - buttone height
  UI.Button.background - buttone texture
  UI.Button.text - buttone text
  UI.Button.type - buttone type
```

#### UI.Button.listener
##### METHOD
```js

```
##### FIELD
```
PRIVATE
  UI.Button.listener.over - over listener
  UI.Button.listener.click - click listener
  UI.Button.listener.longClick - long click listener
```
#### UI.Button._
##### METHOD
```js

```
##### FIELD
```js
PRIVATE
  UI.Button._.isOver - over check
  UI.Button._.isPressed - press check
  UI.Button._.pressValue - press count
```
---

Copyright 2016. SY PlanP all rights reserved.
