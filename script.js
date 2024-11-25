const board = document.getElementById("board");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = Array.from(board.children).indexOf(clickedCell);

    if (gameState[clickedCellIndex] !== "" || !gameActive) return;

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add("taken");

    checkResult();
};

const checkResult = () => {
    let roundWon = false;

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusDisplay.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
};

const resetGame = () => {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    Array.from(board.children).forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
};

const createBoard = () => {
    board.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }
};

createBoard();
resetButton.addEventListener("click", resetGame);
statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
