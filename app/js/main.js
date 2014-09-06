// Get the canvas element from our HTML above
var canvas = document.getElementById("renderCanvas");
canvas.requestPointerLock = canvas.requestPointerLock ||
canvas.mozRequestPointerLock ||
canvas.webkitRequestPointerLock;

canvas.onclick = function() {
  canvas.requestPointerLock();
}

// Load the BABYLON 3D engine
var engine = new BABYLON.Engine(canvas, true);
engine.isPointerLock = true;
var ground;
var camera;
var player;
var targets = [];
// This begins the creation of a function that we will 'call' just after it's built
var createScene = function () {

  // Now create a basic Babylon Scene object 
  var scene = new BABYLON.Scene(engine);

  camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -15), scene);
  camera.keysUp = [87]; // W
  camera.keysDown = [83]; // S
  camera.keysLeft = [65]; // A
  camera.keysRight = [68]; // D
  camera.checkCollisions = true;

  player = new Player(scene, camera);

  var crosshair = new Crosshair(scene, camera);

  var sun = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(60, 100, 10), scene);

  // This targets the camera to scene origin
  camera.setTarget(new BABYLON.Vector3(0, 5, 0));

  camera.angularSensibility = 3000;

  // This attaches the camera to the canvas
  camera.attachControl(canvas, false);

  // This creates a light, aiming 0,1,0 - to the sky.
  var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

  // Dim the light a small amount
  light.intensity = .5;

  // Let's try our built-in 'sphere' shape. Params: name, subdivisions, size, scene
  var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

  // Move the sphere upward 1/2 its height
  sphere.position.y = 1;

  // Let's try our built-in 'ground' shape.  Params: name, width, depth, subdivisions, scene
  ground = BABYLON.Mesh.CreateGround("ground1", 100, 100, 2, scene, false);
  var groundMaterial = new  BABYLON.StandardMaterial("ground", scene);
  groundMaterial.diffuseTexture = new BABYLON.Texture("assets/ground.jpg", scene);
  groundMaterial.diffuseTexture.uScale = 60;
  groundMaterial.diffuseTexture.vScale = 60;
  ground.position.y = -2.05;
  ground.material = groundMaterial;
  ground.checkCollisions = true;

  var target = new Target(scene);
  target.setRandomXZ(ground);
  target.setRandomVelocity(ground);
  targets.push(target);

  // Leave this function
  return scene;

};  // End of createScene function

// Now, call the createScene function that you just finished creating
var scene = createScene();

engine.runRenderLoop(function () {
  targets.map( function(target) {
    target.move(ground);
  });

  scene.render();
});

window.addEventListener("resize", function () {
  engine.resize();
});
