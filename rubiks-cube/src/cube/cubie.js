import * as THREE from "three";
import { createCubieMaterials } from "./colors.js";

const CUBIE_SIZE = 0.92;
const CUBIE_GAP = 1.03;

export function createCubie(x, y, z) {
  const geometry = new THREE.BoxGeometry(CUBIE_SIZE, CUBIE_SIZE, CUBIE_SIZE);
  const mesh = new THREE.Mesh(geometry, createCubieMaterials(x, y, z));

  mesh.position.set(x * CUBIE_GAP, y * CUBIE_GAP, z * CUBIE_GAP);
  mesh.userData.logicalPosition = { x, y, z };

  const edges = new THREE.EdgesGeometry(geometry);
  const outline = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0x000000 })
  );

  mesh.add(outline);

  return mesh;
}