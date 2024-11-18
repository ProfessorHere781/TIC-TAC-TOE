// Selecting DOM elements
const startBtn = document.getElementById("start-btn");
const difficultySelect = document.getElementById("difficulty");
const boxes = document.querySelectorAll(".box");
const levelDisplay = document.getElementById("level");
const creditsBtn = document.getElementById("credits-btn");
const creditsContent = document.getElementById("credits-content");
const statusDisplay = document.getElementById("status");
const aiMessage = document.getElementById("ai-message");

// Game state variables
let sequence = [];
let playerSequence = [];
let level = 1;
let playerTurn = false;

// Event listeners
creditsBtn.addEventListener("click", toggleCredits);
startBtn.addEventListener("click", startGame);
boxes.forEach((box, index) => {
    box.addEventListener("click", () => handlePlayerClick(index));
});

// Toggle Credits
function toggleCredits() {
    creditsContent.style.display = creditsContent.style.display === "block" ? "none" : "block";
}

// Start Game
function startGame() {
    sequence = [];
    playerSequence = [];
    level = 1;
    playerTurn = false;
    updateLevelDisplay();
    statusDisplay.textContent = "AI's Turn";
    aiMessage.textContent = "AI: Watch the sequence carefully!";
    nextSequence();
}

// Update Level Display
function updateLevelDisplay() {
    levelDisplay.textContent = `Level: ${level}`;
}

// Next AI Sequence
function nextSequence() {
    const randomBox = Math.floor(Math.random() * 9);
    sequence.push(randomBox);
    playerSequence = [];
    statusDisplay.textContent = "AI's Turn";
    aiMessage.textContent = "AI: Watch the boxes light up!";
    highlightSequence();
}

// Highlight AI Sequence
function highlightSequence() {
    let i = 0;
    const interval = setInterval(() => {
        highlightBox(sequence[i]);
        i++;
        if (i === sequence.length) {
            clearInterval(interval);
            playerTurn = true;
            statusDisplay.textContent = "Player's Turn";
            aiMessage.textContent = "AI: Click the boxes in the correct order!";
        }
    }, 800);
}

// Highlight Box
function highlightBox(index) {
    boxes[index].classList.add("highlight");
    setTimeout(() => {
        boxes[index].classList.remove("highlight");
    }, 400);
}

// Handle Player Click
function handlePlayerClick(index) {
    if (!playerTurn) return;
    playerSequence.push(index);
    if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
        statusDisplay.textContent = "Game Over!";
        playerTurn = false;
        aiMessage.textContent = "AI: You made a mistake. Restarting game...";
        setTimeout(startGame, 2000);
        return;
    }
    if (playerSequence.length === sequence.length) {
        level++;
        updateLevelDisplay();
        playerTurn = false;
        statusDisplay.textContent = "AI's Turn";
        aiMessage.textContent = "AI: Great job! Next level coming up.";
        setTimeout(nextSequence, 1000);
    }
}
