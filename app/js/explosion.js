var Explosion = function(scene) {
  this.scene = scene;
  
  if (Explosion.spriteManager == undefined) {
    Explosion.spriteManager = new BABYLON.SpriteManager("explosionsManager", "assets/explosion.png", 10, 256, scene);
  }

  this.sprite = new BABYLON.Sprite("explosion", Explosion.spriteManager);
  this.sprite.size = 32;
}

Explosion.prototype.start = function(position) {
  this.sprite.position = position;
  this.sprite.playAnimation(0, 48, false, 20);
}

Explosion.prototype.dispose = function() {
  this.sprite.dispose();
}
