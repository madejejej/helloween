var Collectable = function(scene) {
  if (Collectable.spriteManager == undefined) {
    Collectable.spriteManager = new BABYLON.SpriteManager("potsManager", "assets/pot.png", 50, 128, scene);
    Collectable._id = 1;
  }

  this.sprite = new BABYLON.Sprite("pot" + Collectable._id, Collectable.spriteManager);
}

Collectable.prototype.setRandomPosition = function(ground, maxHeight) {
  var minX = ground.getBoundingInfo().minimum.x;
  var maxX = ground.getBoundingInfo().maximum.x;
  var minZ = ground.getBoundingInfo().minimum.x;
  var maxZ = ground.getBoundingInfo().maximum.z;

  this.sprite.position.x = Math.floor((Math.random() * (maxX - minX)) + minX);
  this.sprite.position.z = Math.floor((Math.random() * (maxZ - minZ)) + minZ);
  this.sprite.position.y = Math.floor((Math.random() * (maxHeight - ground.position.y)) + ground.position.y);
}
