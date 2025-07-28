const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill("");

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8],    //rows
  [0,3,6], [1,4,7], [2,5,8],    //columns
  [0,4,8], [2,4,6]               //diagonals
];

// Create cells
function createBoard() {
  board.innerHTML = '';
  gameState = Array(9).fill("");
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
  statusText.textContent = "Player X's turn";
  currentPlayer = 'X';
  gameActive = true;
}

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');
  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
    gameActive = false;
  } else if (!gameState.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return (
      gameState[a] === currentPlayer &&
      gameState[b] === currentPlayer &&
      gameState[c] === currentPlayer
    );
  });
}

resetBtn.addEventListener('click', createBoard);

createBoard();
