import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import "./style.css";
import { scene } from "./scene/sceneSetup.js";
import { camera } from "./scene/camera.js";
import { addLights } from "./scene/lights.js";
import { createRubiksCube } from "./cube/createCube.js";
import { rotateFace, updateRotations } from "./cube/rotations.js";

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.domElement.style.position = "fixed";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;

addLights(scene);

const { cubies } = createRubiksCube(scene);
createInterface(scene, cubies);

const grid = new THREE.GridHelper(8, 8);
grid.position.y = -2;
scene.add(grid);

const axes = new THREE.AxesHelper(4);
scene.add(axes);

const keyToFace = {
  Q: "U", // cima
  A: "D", // baixo
  W: "F", // frente
  S: "B", // trás
  E: "R", // direita
  D: "L", // esquerda
};

document.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase();
  const face = keyToFace[key];

if (face) {
  rotateFace(scene, cubies, face, !event.shiftKey);

  increaseMoves();

  setTimeout(() => {
    checkVictory(cubies);
  }, 500);
}
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);

  updateRotations(scene, cubies);

  controls.update();
  renderer.render(scene, camera);
}

animate();