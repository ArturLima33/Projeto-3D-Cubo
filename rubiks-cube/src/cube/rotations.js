import * as THREE from "three";

const FACE_CONFIG = {
  U: { axis: "y", layer: 1, direction: 1 },
  D: { axis: "y", layer: -1, direction: -1 },
  F: { axis: "z", layer: 1, direction: 1 },
  B: { axis: "z", layer: -1, direction: -1 },
  R: { axis: "x", layer: 1, direction: 1 },
  L: { axis: "x", layer: -1, direction: -1 },
};

const STEP = Math.PI / 2;
const SPEED = 0.12;
const SNAP_GAP = 1.03;

let activeRotation = null;
let queue = [];

export function rotateFace(scene, cubies, faceKey, clockwise = true) {
  const config = FACE_CONFIG[faceKey.toUpperCase()];

  if (!config) return false;

  queue.push({ config, clockwise });

  return true;
}

export function updateRotations(scene, cubies) {
  if (!activeRotation && queue.length > 0) {
    activeRotation = startRotation(scene, cubies, queue.shift());
  }

  if (!activeRotation) return;

  const remaining = STEP - activeRotation.currentAngle;
  const delta = Math.min(SPEED, remaining);

  activeRotation.currentAngle += delta;
  activeRotation.group.rotation[activeRotation.config.axis] += delta * activeRotation.sign;

  if (activeRotation.currentAngle >= STEP) {
    finishRotation(scene, activeRotation);
    activeRotation = null;
  }
}

function startRotation(scene, cubies, move) {
  const { config, clockwise } = move;

  const selectedCubies = cubies.filter((cubie) => {
    return cubie.userData.logicalPosition[config.axis] === config.layer;
  });

  const group = new THREE.Group();
  scene.add(group);

  for (const cubie of selectedCubies) {
    group.attach(cubie);
  }

  return {
    group,
    selectedCubies,
    config,
    sign: clockwise ? config.direction : -config.direction,
    currentAngle: 0,
  };
}

function finishRotation(scene, rotation) {
  const { group, selectedCubies, config, sign } = rotation;

  for (const cubie of selectedCubies) {
    scene.attach(cubie);
    snapCubieTransform(cubie);
    updateLogicalPosition(cubie, config.axis, sign);
  }

  scene.remove(group);
}

function snapCubieTransform(cubie) {
  cubie.position.x = Math.round(cubie.position.x / SNAP_GAP) * SNAP_GAP;
  cubie.position.y = Math.round(cubie.position.y / SNAP_GAP) * SNAP_GAP;
  cubie.position.z = Math.round(cubie.position.z / SNAP_GAP) * SNAP_GAP;

  cubie.rotation.x = snapAngle(cubie.rotation.x);
  cubie.rotation.y = snapAngle(cubie.rotation.y);
  cubie.rotation.z = snapAngle(cubie.rotation.z);
}

function snapAngle(angle) {
  return Math.round(angle / STEP) * STEP;
}

function updateLogicalPosition(cubie, axis, sign) {
  const { x, y, z } = cubie.userData.logicalPosition;

  if (axis === "x") {
    cubie.userData.logicalPosition = sign > 0
      ? { x, y: -z, z: y }
      : { x, y: z, z: -y };
  }

  if (axis === "y") {
    cubie.userData.logicalPosition = sign > 0
      ? { x: z, y, z: -x }
      : { x: -z, y, z: x };
  }

  if (axis === "z") {
    cubie.userData.logicalPosition = sign > 0
      ? { x: -y, y: x, z }
      : { x: y, y: -x, z };
  }
}