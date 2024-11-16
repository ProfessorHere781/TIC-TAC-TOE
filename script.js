
const board = document.getElementById('board');
const cells = Array.from(document.getElementsByClassName('cell'));
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let winningLine = null; // To store the reference to the winning line

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

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            isGameActive = false;
            message.textContent = `${currentPlayer} wins!`;
            highlightWinningLine(pattern); // Highlight the winning line
            return;
        }
    }

    if (!gameBoard.includes('')) {
        isGameActive = false;
        message.textContent = "It's a draw!";
    }
}

function highlightWinningLine(pattern) {
    // Remove any existing winning line if present
    if (winningLine) {
        winningLine.remove();
    }

    // Create the new winning line
    winningLine = document.createElement('div');
    winningLine.classList.add('winning-line');

    // Determine the type of winning pattern (horizontal, vertical, or diagonal)
    if (pattern[0] === pattern[1] && pattern[1] === pattern[2]) { // Horizontal
        winningLine.classList.add('horizontal');
        winningLine.style.top = `${Math.floor((pattern[0] / 3) * 100) + 50}%`;
    } else if (pattern[0] === pattern[3] && pattern[1] === pattern[4]) { // Vertical
        winningLine.classList.add('vertical');
        winningLine.style.left = `${Math.floor((pattern[0] % 3) * 100) + 50}%`;
    } else if (pattern[0] === pattern[4] && pattern[2] === pattern[4]) { // Diagonal
        if (pattern[0] === 0 && pattern[2] === 8) { // Top-left to Bottom-right diagonal
            winningLine.classList.add('diagonal1');
        } else if (pattern[0] === 2 && pattern[2] === 6) { // Top-right to Bottom-left diagonal
            winningLine.classList.add('diagonal2');
        }
    }

    // Append the line to the board
    board.appendChild(winningLine);
}

function handleCellClick(event) {
    const index = cells.indexOf(event.target);

    if (gameBoard[index] || !isGameActive) return;

    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    
    // Apply specific font style for X and O
    if (currentPlayer === 'X') {
        event.target.classList.add('x-font'); // Apply X font
    } else {
        event.target.classList.add('o-font'); // Apply O font
    }

    // Apply lightning effect with player-specific color
    const lightningEffect = document.createElement('div');
    lightningEffect.classList.add('lightning');

    if (currentPlayer === 'X') {
        lightningEffect.classList.add('blue-light'); // Blue light for X
    } else {
        lightningEffect.classList.add('red-light');  // Red light for O
    }

    event.target.appendChild(lightningEffect);

    setTimeout(() => {
        event.target.removeChild(lightningEffect);
    }, 500);

    checkWinner();
    
    if (isGameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x-font', 'o-font'); // Remove fonts when resetting
    });
    if (winningLine) {
        winningLine.remove(); // Remove any existing winning line
        winningLine = null;
    }
    currentPlayer = 'X';
    isGameActive = true;
    message.textContent = '';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);