import * as THREE from "three";

export const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// posição inicial da câmera (boa visão do cubo depois)
camera.position.set(3, 3, 3);