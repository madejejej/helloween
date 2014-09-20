var Fireball = function(scene) {
  this.scene = scene;
  this.model = BABYLON.Mesh.CreateSphere("fireball", 16, 2, scene);
  this.material = new BABYLON.ShaderMaterial("fireball", scene, {
    vertexElement: "fireballVertexShader",
    fragmentElement: "fireballfragmentShader"
  },
  {
    attributes: ["position", "uv"],
    uniforms: ["worldViewProjection", "time"]
  });

  this.model.material = this.material;
  this.time = 0;
  
  this.velocity = new BABYLON.Vector3(0,0,0);
  this.speed = 1;
}

Fireball.prototype.update = function(dt) {
  this.time += dt / 1000;
  this.material.setFloat("time", this.time);
  this.model.position.addInPlace( this.velocity.multiplyByFloats(this.speed, this.speed, this.speed) );
}
