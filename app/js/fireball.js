var Fireball = function(scene) {
  this.scene = scene;
  this.model = BABYLON.Mesh.CreateSphere("fireball", 16, 4, scene);
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
  this.speed = 2;
}

Fireball.prototype.update = function(dt) {
  this.time += dt / 400;
  this.material.setFloat("time", this.time);
  this.model.position.addInPlace( this.velocity.multiplyByFloats(this.speed, this.speed, this.speed) );

  if (this.model.intersectsMesh(ground, false)) {
    this.explode();
  } else {
    var fireball = this;
    targets.map( function(target) {
      if (fireball.model.intersectsMesh(target.model, false)) {
        target.setRandomXZ(ground);
        player.points += 40;
        window.dispatchEvent(new CustomEvent("playerPointsChanged", {"detail" : {'currentPoints': player.points}}));
        fireball.explode();
      }
    });
  }

  if (this.time > 8) {
    this.explode();
  }
}


Fireball.prototype.explode = function() {
    var explosion = new Explosion(this.scene);
    explosion.start(this.model.position.clone());
    explosions.push(explosion);
    this.model.dispose();
    var idx = fireballs.indexOf(this);
    fireballs.splice(idx, 1);
}
