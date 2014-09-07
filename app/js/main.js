// Get the canvas element from our HTML above
var canvas = document.getElementById("renderCanvas");
canvas.requestPointerLock = canvas.requestPointerLock ||
canvas.mozRequestPointerLock ||
canvas.webkitRequestPointerLock;

canvas.onclick = function() {
  canvas.requestPointerLock();
}

var NUMBER_OF_COLLECTABLES = 80;
var NUMBER_OF_TARGETS = 10;

var engine = new BABYLON.Engine(canvas, true);
engine.isPointerLock = true;
var ground;
var camera;
var player;
var targets = [];
var collectables = [];

var createScene = function () {

  var scene = new BABYLON.Scene(engine);

  scene.targets = targets;
  scene.collectables = collectables;

  camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -15), scene);
  camera.keysUp = [87]; // W
  camera.keysDown = [83]; // S
  camera.keysLeft = [65]; // A
  camera.keysRight = [68]; // D
  camera.checkCollisions = true;

  player = new Player(scene, camera);

  var sun = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(800, 600, 0), scene);

  sun.intensity = 0.7;

  sun.diffuse = new BABYLON.Color3(0.32, 0.25, 0.65);
  sun.specular = new BABYLON.Color3(0.2, 0.2, 0.2);

  sun.exponent = 1000;

  camera.setTarget(new BABYLON.Vector3(0, 5, 0));

  camera.angularSensibility = 3000;

  camera.attachControl(canvas, false);


  createSkyBox(scene);

  var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

  sphere.position.y = 1;

  ground = BABYLON.Mesh.CreateGround("ground1", 500, 500, 2, scene, false);
  var groundMaterial = new  BABYLON.StandardMaterial("ground", scene);
  groundMaterial.diffuseTexture = new BABYLON.Texture("assets/ground.jpg", scene);
  groundMaterial.diffuseTexture.uScale = 60;
  groundMaterial.diffuseTexture.vScale = 60;
  ground.position.y = -2.05;
  ground.material = groundMaterial;
  ground.checkCollisions = true;

  scene.ground = ground;
  scene.height = 50;

  for (var i=0; i < NUMBER_OF_TARGETS; i++) {
    var target = new Target(scene);
    target.setRandomXZ(ground);
    target.setRandomVelocity(ground);
    targets.push(target);
  }
  for (var i=0; i < NUMBER_OF_COLLECTABLES; i++) {
    var collectable = new Collectable(scene);
    collectable.setRandomPosition(ground, scene.height);
    collectables.push(collectable);
  }

  return scene;
};

var scene = createScene();

engine.runRenderLoop(function () {
  targets.map( function(target) {
    target.move(ground);
  });

  player.update(scene);

  scene.render();
});

window.addEventListener("resize", function () {
  engine.resize();
});

window.addEventListener("click", function(event) {
  var pickResult = scene.pick(event.clientX, event.clientY);
});

window.addEventListener("playerPointsChanged", function(event) {
  document.getElementById("points").innerHTML = event.detail.currentPoints;
});
