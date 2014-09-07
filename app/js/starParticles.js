var StarParticles = function(scene, minEmitBox, maxEmitBox) {
  this.starfield = new BABYLON.ParticleSystem("starParticles", 40, scene);
  this.starfield.particleTexture = new BABYLON.Texture("assets/star.png", scene);
  this.starfield.minAngularSpeed = -4.5;
  this.starfield.maxAngularSpeed = 4.5;
  this.starfield.minSize = 0.5;
  this.starfield.maxSize = 1.0;
  this.starfield.minLifeTime = 0.5;
  this.starfield.maxLifeTime = 1.0;
  this.starfield.minEmitPower = 0.8;
  this.starfield.maxEmitPower = 1.0;
  this.starfield.emitRate = 80;
  this.starfield.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
  this.starfield.minEmitBox = minEmitBox; 
  this.starfield.maxEmitBox = maxEmitBox;
  this.starfield.direction1 = new BABYLON.Vector3(0, 1, 0);
  this.starfield.direction2 = new BABYLON.Vector3(0, 1, 0);
  this.starfield.color1 = new BABYLON.Color4(0, 0.3, 0, 1);
  this.starfield.color2 = new BABYLON.Color4(0, 1, 0, 1);
  this.starfield.gravity = new BABYLON.Vector3(0, 3, 0);
  this.starfield.emitter = new BABYLON.Vector3(0, -2, 0);
  this.starfield.start();
}

StarParticles.prototype.updateEmitBox = function(minEmitBox, maxEmitBox) {
  this.starfield.minEmitBox = minEmitBox; 
  this.starfield.maxEmitBox = maxEmitBox;
}

