import * as THREE from "three";

export function addLights(scene) {
  // luz ambiente (iluminação geral)
  const ambient = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambient);

  // luz direcional (sombras e profundidade)
  const directional = new THREE.DirectionalLight(0xffffff, 1);
  directional.position.set(5, 5, 5);
  scene.add(directional);
}