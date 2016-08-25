window.onload = function() {
  var canvas = document.getElementById("canvas");
  var level = new Level();
  var ground = new Component(0);
  ground.setWidth(1);
  ground.setHeight(1);
  ground.setWeight(10);

  var player = new Component(0);
  player.setWidth(2);
  player.setHeight(2);
  player.setWeight(1);
  player.id = "player";
  player.setRotate(45);

  var map = [1, 1, 1, 1, 1, 1, 1,
             1, 0, 0, 0, 0, 0, 1,
             1, 0, 0, 0, 0, 0, 1,
             1, 0, 0, 2, 0, 0, 1,
             1, 0, 0, 0, 0, 0, 1,
             1, 0, 0, 0, 0, 0, 1,
             1, 0, 0, 0, 0, 0, 1,
             1, 1, 1, 1, 1, 1, 1];
  var linker = [
    null,
    ground,
    player
  ];

  level.setWidth(7);
  level.setHeight(8);
  level.setMapLinker(linker);
  level.setMap(map);
  Grov.addLevel(level);
  Grov.setCanvas(canvas);

  Grov.run();
};
