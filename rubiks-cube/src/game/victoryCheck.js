export function checkVictory(cube) {

    let solved = true;

    cube.forEach((cubie) => {

        const x = Math.round(cubie.position.x);
        const y = Math.round(cubie.position.y);
        const z = Math.round(cubie.position.z);

        if (
            cubie.userData.initialPosition.x !== x ||
            cubie.userData.initialPosition.y !== y ||
            cubie.userData.initialPosition.z !== z
        ) {
            solved = false;
        }
    });

    if (solved) {
        setTimeout(() => {
            alert('Parabéns! Cubo resolvido!');
        }, 300);
    }
}