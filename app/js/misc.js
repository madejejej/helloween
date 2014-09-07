function createSkyBox(scene) {
  var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000, scene);
  var material = new BABYLON.StandardMaterial("skyBox", scene);
  material.backFaceCulling = false;
  skybox.material = material;

  material.diffuseColor = new BABYLON.Color3(0,0,0);
  material.specularColor = new BABYLON.Color3(0,0,0);

  material.reflectionTexture = new BABYLON.CubeTexture('assets/skybox/bluefreeze', scene);
  material.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
}
