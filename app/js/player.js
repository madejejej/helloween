var Player = function(scene, camera) {
  this.scene = scene;
  this.model = new BABYLON.Mesh.CreateBox("player", 0.4, scene);
  this.camera = camera;
  this.model.parent = this.camera;
  this.model.position = new BABYLON.Vector3(0, -1.0, 3);

  this.model.checkCollisions = true;

  this.points = 0;
}


Player.prototype.update = function(scene) {
  var player = this;
  scene.collectables.forEach( function(collectable) {
    if (BABYLON.BoundingBox.Intersects(player.model.getBoundingInfo().boundingBox, collectable.boundingBox)) {
      collectable.setRandomPosition(scene.ground, scene.height);
      player.points++;
    }
  });
}
