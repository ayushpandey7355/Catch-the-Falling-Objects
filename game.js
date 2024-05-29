// Select the canvas element and set up the context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game variables
const player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 50,
    height: 50,
    speed: 7,
    dx: 0
};

const fallingObjects = [];
const objectWidth = 30;
const objectHeight = 30;
const objectSpeed = 4;
let score = 0;
let gameOver = false;

// Draw player
function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw falling objects
function drawObjects() {
    ctx.fillStyle = 'red';
    for (let i = 0; i < fallingObjects.length; i++) {
        const obj = fallingObjects[i];
        ctx.fillRect(obj.x, obj.y, objectWidth, objectHeight);
    }
}

// Move player
function movePlayer() {
    player.x += player.dx;

    // Check boundaries
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
}

// Update falling objects
function updateObjects() {
    for (let i = 0; i < fallingObjects.length; i++) {
        const obj = fallingObjects[i];
        obj.y += objectSpeed;

        // Check for collision with player
        if (
            obj.x < player.x + player.width &&
            obj.x + objectWidth > player.x &&
            obj.y < player.y + player.height &&
            obj.y + objectHeight > player.y
        ) {
            score++;
            fallingObjects.splice(i, 1);
            i--;
        } else if (obj.y + objectHeight > canvas.height) {
            gameOver = true;
        }
    }
}

// Create a new falling object at a random position
function createObject() {
    const x = Math.random() * (canvas.width - objectWidth);
    fallingObjects.push({ x: x, y: 0 });
}

// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Update the game
function update() {
    if (gameOver) {
        alert(`Game Over! Your score: ${score}`);
        document.location.reload();
    } else {
        clearCanvas();
        drawPlayer();
        drawObjects();
        movePlayer();
        updateObjects();
        requestAnimationFrame(update);
    }
}

// Key down event
function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        player.dx = player.speed;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        player.dx = -player.speed;
    }
}

// Key up event
function keyUp(e) {
    if (
        e.key === 'ArrowRight' ||
        e.key === 'Right' ||
        e.key === 'ArrowLeft' ||
        e.key === 'Left'
    ) {
        player.dx = 0;
    }
}

// Add event listeners
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Start the game
setInterval(createObject, 1000);
update();
