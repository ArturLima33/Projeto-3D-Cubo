let moves = 0;

const moveText = document.createElement('div');
moveText.id = 'move-counter';
moveText.innerText = 'Movimentos: 0';
document.body.appendChild(moveText);

export function increaseMoves() {
    moves++;
    moveText.innerText = 'Movimentos: ${moves}';
}

export function resetMoves() {
    moves = 0;
    moveText.innerText = 'Movimentos: 0';
}

export function getMoves() {
    return moves;
}