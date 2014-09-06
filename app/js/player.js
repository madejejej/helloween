var Player = function(scene, camera) {
  this.scene = scene;
  this.model = new BABYLON.Mesh.CreateBox("player", 1.0, scene);
  this.camera = camera;
  this.model.parent = this.camera;
  this.model.position = new BABYLON.Vector3(0, -1.5, 8);
  this.model.checkCollisions = true;
}
