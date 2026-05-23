import * as THREE from "three";
import { createCubie } from "./cubie.js";

export function createRubiksCube(scene) {
  const cubeGroup = new THREE.Group();
  const cubies = [];

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const cubie = createCubie(x, y, z);

        cubies.push(cubie);
        cubeGroup.add(cubie);
      }
    }
  }

  scene.add(cubeGroup);

  return {
    cubeGroup,
    cubies,
  };
}