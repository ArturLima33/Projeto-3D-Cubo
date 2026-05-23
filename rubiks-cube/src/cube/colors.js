import * as THREE from "three";

export const FACE_COLORS = {
  right: 0xff0000,
  left: 0xff8c00,
  up: 0xffffff,
  down: 0xffff00,
  front: 0x00aa44,
  back: 0x0044ff,
  inside: 0x111111,
};

export function createCubieMaterials(x, y, z) {
  return [
    new THREE.MeshStandardMaterial({ color: x === 1 ? FACE_COLORS.right : FACE_COLORS.inside }),
    new THREE.MeshStandardMaterial({ color: x === -1 ? FACE_COLORS.left : FACE_COLORS.inside }),
    new THREE.MeshStandardMaterial({ color: y === 1 ? FACE_COLORS.up : FACE_COLORS.inside }),
    new THREE.MeshStandardMaterial({ color: y === -1 ? FACE_COLORS.down : FACE_COLORS.inside }),
    new THREE.MeshStandardMaterial({ color: z === 1 ? FACE_COLORS.front : FACE_COLORS.inside }),
    new THREE.MeshStandardMaterial({ color: z === -1 ? FACE_COLORS.back : FACE_COLORS.inside }),
  ];
}