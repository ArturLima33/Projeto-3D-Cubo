import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { scene } from "./scene/sceneSetup.js";
import { camera } from "./scene/camera.js";
import { addLights } from "./scene/lights.js";

// =========================
// RENDERER
// =========================
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.style.margin = 0;
document.body.appendChild(renderer.domElement);

// =========================
// CONTROLES DE CÂMERA
// =========================
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// =========================
// LUZES
// =========================
addLights(scene);

// =========================
// HELPERS (DEBUG VISUAL)
// =========================

// grid (chão)
const grid = new THREE.GridHelper(10, 10);
scene.add(grid);

// eixos XYZ
const axes = new THREE.AxesHelper(5);
scene.add(axes);

// =========================
// RESPONSIVIDADE
// =========================
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// =========================
// LOOP DE ANIMAÇÃO
// =========================
function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}

animate();