// 1. Define la variable para el jugador 
// actual
let currentPlayer;

// 2. Define la variable para representar 
// el tablero de juego
let board;

// 3. Define la variable para el estado 
// del juego
let gameActive;

// 4. Función para inicializar el juego
function initializeGame() {
    // 5. Elige aleatoriamente 'X' o 'O' 
    // para comenzar
    currentPlayer = 
    Math.random() < 0.5 ? 'X' : 'O'; 

    // 6. Inicializa el tablero como un 
    // array vacío
    board = 
    ['', '', '', '', '', '', '', '', ''];

    // 7. Establece el estado del juego 
    // como activo
    gameActive = true;

    // 8. Muestra en el documento el turno 
    // del jugador actual
    document.getElementById(
        'playerTurn'
    ).textContent = 
    `Player's Turn: ${currentPlayer}`;

    // 9. Limpia el texto de todas las 
    // celdas del tablero
    Array.from(
        document.getElementsByClassName(
            'cell'
        )
    ).forEach(
        cell => cell.textContent = ''
    );

    // 10. Realiza el movimiento de la 
    // IA si inicia con 'O'
    if (currentPlayer === 'O') {
        aiMove(); 
    }
}

// 11. Función para realizar un 
// movimiento
function makeMove(cell, index) {
    // 12. Verifica si la celda está 
    // vacía y el juego está activo
    if (
        board[index] === '' && gameActive
    ) {
        // 13. Actualiza el tablero y la 
        // celda con el símbolo del jugador 
        // actual
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        // 14. Verifica si hay un ganador
        checkForWinner();

        // 15. Cambia el turno si el juego 
        // sigue activo
        if (gameActive) {
            togglePlayer();
        }
    }
}

// 16. Función para cambiar el turno del 
// jugador
function togglePlayer() {
    // 17. Cambia el jugador actual
    currentPlayer = 
    currentPlayer === 'X' ? 'O' : 'X';

    // 18. Muestra en el documento el 
    // turno del jugador actual
    document.getElementById(
        'playerTurn'
    ).textContent = 
    `Player's Turn: ${currentPlayer}`;

    // 19. Realiza el movimiento de la 
    // IA con un retraso para la 
    // actualización de la interfaz
    if (currentPlayer === 'O') {
        setTimeout(aiMove, 100); 
    }
}

// 20. Función para el movimiento de 
// la IA
function aiMove() {
    // 21. Encuentra el movimiento 
    // ganador para 'O'
    let winningMove = 
    findWinningMove('O');

    // 22. Encuentra el movimiento para 
    // bloquear a 'X'
    let blockingMove = 
    findWinningMove('X');

    // 23. Realiza el movimiento ganador 
    // si es posible
    if (winningMove !== -1) {
        makeAIMove(winningMove);
    } 

    // 24. Realiza el movimiento de 
    // bloqueo si es posible
    else if (blockingMove !== -1) {
        makeAIMove(blockingMove);
    } 

    // 25. De lo contrario, realiza un 
    // movimiento aleatorio
    else {
        makeRandomMove();
    }
}

// 26. Función para encontrar un 
// movimiento ganador
function findWinningMove(player) {
    // 27. Define las condiciones de 
    // victoria
    let winConditions = [
        [0, 1, 2], [3, 4, 5], 
        [6, 7, 8], [0, 3, 6], 
        [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    // 28. Recorre cada condición de 
    // victoria
    for (
        let condition of winConditions
    ) {
        let line = 
        condition.map(
            index => board[index]
        );

        // 29. Verifica si hay dos celdas 
        // con el símbolo del jugador y 
        // una vacía
        if (
            line.filter(
                cell => cell === player
            ).length === 2
        ) {
            let emptyIndex = 
            condition.find(
                index => board[index] === ''
            );

            // 30. Si encuentra una celda 
            // vacía, retorna su índice
            if (emptyIndex !== undefined) {
                return emptyIndex;
            }
        }
    }

    // 31. Retorna -1 si no encuentra 
    // ningún movimiento ganador
    return -1;
}

// 32. Función para que la IA realice un 
// movimiento
function makeAIMove(index) {
    // 33. Obtiene todas las celdas del 
    // tablero
    let cells = 
    document.getElementsByClassName(
        'cell'
    );

    // 34. Actualiza la celda y el 
    // tablero con el símbolo 'O'
    cells[index].textContent = 'O';
    board[index] = 'O';

    // 35. Verifica si hay un ganador
    checkForWinner();

    // 36. Cambia el turno si el juego 
    // sigue activo
    if (gameActive) {
        togglePlayer();
    }
}

// 37. Función para realizar un movimiento 
// aleatorio
function makeRandomMove() {
    // 38. Encuentra todas las celdas 
    // disponibles
    let availableCells = 
    board.map(
        (e, i) => e === '' ? i : null
    ).filter(
        e => e !== null
    );

    // 39. Si hay celdas disponibles, 
    // elige una al azar
    if (availableCells.length > 0) {
        let randomCell = 
        availableCells[
            Math.floor(
                Math.random() * 
                availableCells.length
            )
        ];

        // 40. Realiza el movimiento en la 
        // celda elegida
        makeAIMove(randomCell);
    }
}

// 41. Función para verificar si hay un 
// ganador
function checkForWinner() {
    // 42. Define las condiciones de victoria
    let winConditions = [
        [0, 1, 2], [3, 4, 5], 
        [6, 7, 8], [0, 3, 6], 
        [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    // 43. Recorre cada condición de victoria
    winConditions.forEach(
        condition => {
            // 44. Verifica si hay una línea con 
            // el mismo símbolo
            if (
                board[condition[0]] && board[condition[0]] === 
                board[condition[1]] && board[condition[1]] === 
                board[condition[2]]
            ) {
                // 45. Si hay ganador, finaliza 
                // el juego y muestra un mensaje
                gameActive = false;

                setTimeout(
                    () => alert(
                        `${currentPlayer} wins!`
                    ), 100
                );
            }
        }
    );

    // 46. Verifica si todas las celdas están 
    // ocupadas sin un ganador
    if (gameActive && !board.includes('')) {
        // 47. Si es un empate, finaliza el 
        // juego y muestra un mensaje
        gameActive = false;
        
        setTimeout(
            () => alert(
                "It's a draw!"
            ), 100
        );
    }
}

// 48. Función para reiniciar el juego
function restartGame() {
    initializeGame();
}

// 49. Agrega un evento al cargar la ventana 
// para inicializar el juego
window.onload = initializeGame;
