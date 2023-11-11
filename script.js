const statusDisplay = document.querySelector('.game--status')
let gameActive = true
let currentPlayer='X'

let gameState=["","","","","","","","",""]

const WinningMessage= () => `Player $(currentPlayer) has won!`
const currentPlayerTurn= () => `It's $(currentPlayer)'s turn.`
const drawMessage= () => `Game ended in a draw!`

statusDisplay.innerHTML= currentPlayerTurn()

document.querySelectorAll('.cell').forEach(cell=>cell.addEventListener('click', handleCellClick))
document.querySelector('.game--restart').addEventListener('click', handleRestartGame)

function handleCellClick(clickedCellEvent){
    const clickedCell= clickedCellEvent.target
    const clickedCellIndex=parseInt(
        clickedCell.getAttribute(data-cell-index)
    )

    if (gameState[clickedCellIndex] !== "" || !gameActive){
        return
    }

    handleCellPlayed(clickedCell, clickedCellIndex)
    handleResultValidation();

}


function handleCellPlayed(clickedCell, clickedCellIndex){
    gameState[clickedCellIndex]=currentPlayer
    clickedCell.innerHTML=currentPlayer

    const winningConditions=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [2,4,6]
    ]
}

function handleResultValidation(){
    let roundWon = false;
    for(let i=0; i<=7;i++){
        const winningCondition=winningConditions[i]
        let a = gameState[winningCondition[0]]
        let b = gameState[winningCondition[1]]
        let c = gameState[winningCondition[2]]

        if (a==='' || b==='' || c===''){
            continue;
        }
        else if (a===b && b===c){
            roundWon=true
            break;
        }
    }

    if(roundWon){
        statusDisplay.innerHTML= WinningMessage()
        gameActive=false
        return
    }

    let roundDraw= !gameState.includes("")

    if(roundDraw){
        statusDisplay.innerHTML=drawMessage()
        gameActive=false
        return
    }

    handlePlayerChange()
}
