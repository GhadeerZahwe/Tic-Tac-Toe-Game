const statusDisplay = document.querySelector('.game--status')
let gameActive = true
let currentPlayer='X'

let gameState=["","","","","","","","",""]

const WinningMessage= () => `Player $(currentPlayer) has won!`
const currentPlayerTurn= () => `It's $(currentPlayer)'s turn.`
const drawMessage= () => `Game ended in a draw!`

statusDisplay.innerHTML= currentPlayerTurn()

document.querySelectorAll('.cell').forEach(cell=>cell.addEventListener('click', handleCellClick))


