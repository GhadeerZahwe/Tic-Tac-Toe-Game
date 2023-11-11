// Select the game status display element
const statusDisplay = document.querySelector('.game--status');

// Initialize game variables
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

// Functions for displaying game messages
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// Initial display of the current player's turn
statusDisplay.innerHTML = currentPlayerTurn();

// Event listeners for each cell and the restart button
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

// Function to handle a cell click event
function handleCellClick(clickedCellEvent) {   
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
      clickedCell.getAttribute('data-cell-index')
    );

    // Check if the cell is already played or the game is not active
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    // Handle the cell played and check the game result
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

// Function to handle when a cell is played
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

// Winning conditions for the game
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle the result validation after each move
function handleResultValidation() {
    let roundWon = false;

    // Check each winning condition
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        // Check if the cells in the winning condition are not empty
        if (a === '' || b === '' || c === '') {
            continue;
        }

        // Check if all cells in the winning condition have the same symbol
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    // Handle the result based on the game state
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    // Change the current player for the next turn
    handlePlayerChange();
}

// Function to change the current player
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

// Function to handle the game restart
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();

    // Clear cell content
    document.querySelectorAll('.cell')
        .forEach(cell => cell.innerHTML = "");
}
