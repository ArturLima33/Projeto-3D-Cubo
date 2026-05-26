import { shuffleCube } from '../game/shuffle.js';
import { resetMoves } from '../game/moveCounter.js';

export function createInterface(cube, scene) {

    const shuffleButton = document.createElement('button');

    shuffleButton.innerText = 'Embaralhar';
    shuffleButton.id = 'shuffle-button';

    shuffleButton.addEventListener('click', () => {
        shuffleCube(cube, scene);
        resetMoves();
    });

    document.body.appendChild(shuffleButton);


    const themeButton = document.createElement('button');

    themeButton.innerText = 'Trocar Tema';
    themeButton.id = 'theme-button';

    let darkMode = true;

    themeButton.addEventListener('click', () => {

        darkMode = !darkMode;

        if (darkMode) {
            document.body.style.background = '#111';
            document.body.style.color = 'white';
        } else {
            document.body.style.background = '#f5f5f5';
            document.body.style.color = 'black';
        }
    });

    document.body.appendChild(themeButton);
}