let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;
let gameMode = "";

// Elements
const boardElement = document.getElementById("board");
const messageElement = document.getElementById("message");
const modalElement = document.getElementById("modal");

for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.addEventListener("click", () => cellClick(i));
  boardElement.appendChild(cell);
}

window.onload = function () {
  modalElement.style.display = "block";
  boardElement.style.display = "none";
};

function cellClick(index) {
  if (gameOver || board[index] !== "") return;

  board[index] = currentPlayer;
  updateBoard();
  checkWinner();

  if (!gameOver) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (gameMode === "computer" && currentPlayer === "O") {
      // Bot's turn
      setTimeout(botMove, 500);
    }
  }
}

function updateBoard() {
  boardElement.childNodes.forEach((cell, index) => {
    cell.textContent = board[index];
  });
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
      gameOver = true;
      messageElement.textContent = `${board[a]} wins!`;
      return;
    }
  }

  if (!board.includes("")) {
    gameOver = true;
    messageElement.textContent = "It's a tie!";
  }
}

// Bot's move (medium difficulty)
function botMove() {
  const availableMoves = board.reduce((acc, value, index) => {
    if (value === "") {
      acc.push(index);
    }
    return acc;
  }, []);

  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  const botMoveIndex = availableMoves[randomIndex];

  board[botMoveIndex] = currentPlayer;
  updateBoard();
  checkWinner();

  if (!gameOver) {
    currentPlayer = "X";
  }
}

// Start the game with the selected mode
function startGame(mode) {
  gameMode = mode;
  modalElement.style.display = "none";
  boardElement.style.display = "grid";
}
