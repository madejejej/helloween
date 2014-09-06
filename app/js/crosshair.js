var Crosshair = function(scene, camera) {
  this.scene = scene;
  this.camera = camera;

  this.model = new BABYLON.Mesh.CreatePlane("crosshair", 1.0, scene);
  this.model.parent = camera;
  this.material = new BABYLON.StandardMaterial("crosshairMaterial", scene);
  this.material.diffuseTexture = new BABYLON.Texture("assets/crosshair.png", scene);
  this.model.material = this.material;
  this.model.position = new BABYLON.Vector3(0,0,10);
}

Crosshair.prototype.center = function() {
};

