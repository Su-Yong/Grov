window.onload = function() {
  var canvas = document.getElementById("canvas");
  var level = new Level();
  var ground = new Component(0);
  ground.setWidth(1);
  ground.setHeight(1);
  ground.setWeight(10);

  var player = new Component(0);
  player.setWidth(1);
  player.setHeight(1);
  player.setWeight(1);

  var map = [1, 1, 1, 1, 1,
             1, 0, 0, 0, 1,
             1, 0, 2, 0, 1,
             1, 0, 0, 0, 1,
             1, 1, 1, 1, 1,];
  var linker = [
    null,
    ground,
    player
  ];

  level.setWidth(5);
  level.setHeight(5);
  level.setMapLinker(linker);
  level.setMap(map);
  Grov.addLevel(level);
  Grov.setCanvas(canvas);

  Grov.run();
};
