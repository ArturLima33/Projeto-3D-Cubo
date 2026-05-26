import { rotateFace } from '../cube/rotations.js';

const moves = ['UP', 'DOWN', 'LEFT', 'RIGHT', 'FRONT', 'BACK'];

export function shuffleCube(cube, scene, amount = 20) {

    for (let i = 0; i < amount; i++) {

        const randomMove = moves[Math.floor(Math.random() * moves.length)];

        setTimeout(() => {
            rotateFace(cube, scene, randomMove);
        }, i * 150);
    }
}