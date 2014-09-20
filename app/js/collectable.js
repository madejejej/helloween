var Collectable = function(scene) {
  if (Collectable.spriteManager == undefined) {
    Collectable.spriteManager = new BABYLON.SpriteManager("potsManager", "assets/pot.png", 200, 128, scene);
  }

  this.sprite = new BABYLON.Sprite("pot", Collectable.spriteManager);
  this.particles = new StarParticles(scene, new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(0,0,0));

  this.boundingBox = new BABYLON.BoundingBox(new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(128,128,128));
}

Collectable.prototype.setRandomPosition = function(ground, maxHeight) {
  var minX = ground.getBoundingInfo().minimum.x;
  var maxX = ground.getBoundingInfo().maximum.x;
  var minZ = ground.getBoundingInfo().minimum.x;
  var maxZ = ground.getBoundingInfo().maximum.z;

  this.sprite.position.x = Math.floor((Math.random() * (maxX - minX)) + minX);
  this.sprite.position.z = Math.floor((Math.random() * (maxZ - minZ)) + minZ);
  this.sprite.position.y = Math.floor((Math.random() * (maxHeight - ground.position.y)) + ground.position.y);

  var halfSize = this.sprite.size / 2;
  this.boundingBox = new BABYLON.BoundingBox(this.sprite.position.subtractFromFloats(halfSize, halfSize, halfSize), this.sprite.position.subtractFromFloats(-halfSize, -halfSize, -halfSize));

  this._updateParticlesPosition();
}


Collectable.prototype._updateParticlesPosition = function() {
  var quarterSize = this.sprite.size / 4;
  var minEmitBox = this.sprite.position.subtractFromFloats(quarterSize, -quarterSize*8, quarterSize);
  var maxEmitBox = this.sprite.position.subtractFromFloats(-quarterSize, -quarterSize*8, -quarterSize);

  this.particles.updateEmitBox(minEmitBox, maxEmitBox);
}

