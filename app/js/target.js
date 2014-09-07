var Target = function(scene) {
  if ( typeof Target.counter == 'undefined' ) {
    Target.counter = 0;
  } else {
    Target.counter++;
  }
  this.model = BABYLON.Mesh.CreateSphere("target" + Target.counter, 16, 2, scene);
}

Target.prototype.setRandomXZ = function (ground) {
  var minX = ground.getBoundingInfo().minimum.x;
  var maxX = ground.getBoundingInfo().maximum.x;
  var minZ = ground.getBoundingInfo().minimum.x;
  var maxZ = ground.getBoundingInfo().maximum.z;
  this.model.position.x = Math.floor((Math.random() * (maxX - minX)) + minX);
  this.model.position.z = Math.floor((Math.random() * (maxZ - minZ)) + minZ);
  this.model.position.y = ground.position.y + this.model.getBoundingInfo().maximum.y;
}

Target.prototype.setRandomVelocity = function (ground) {
  var x = (Math.random() * 0.1) + 0.1;
  var z = (Math.random() * 0.1) + 0.1;
  this.velocity = new BABYLON.Vector3(x,0,z);
}

Target.prototype.move = function (ground) {
  this.model.position.x += this.velocity.x;
  this.model.position.z += this.velocity.z;

  var minX = ground.getBoundingInfo().minimum.x;
  var maxX = ground.getBoundingInfo().maximum.x;
  var minZ = ground.getBoundingInfo().minimum.x;
  var maxZ = ground.getBoundingInfo().maximum.z;

  if (this.model.position.x > maxX) {
    this.model.position.x = maxX;
    this.velocity.x = -this.velocity.x;
  } else if (this.model.position.x < minX) {
    this.model.position.x = minX;
    this.velocity.x = -this.velocity.x;
  }

  if (this.model.position.z > maxZ) {
    this.model.position.z = maxZ;
    this.velocity.z = -this.velocity.z;
  } else if (this.model.position.z < minZ) {
    this.model.position.z = minZ;
    this.velocity.z = -this.velocity.z;
  }
}
