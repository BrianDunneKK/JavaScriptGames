// Set up canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Basket properties
const basket = {
    width: 100,
    height: 20,
    x: canvas.width / 2 - 50,
    y: canvas.height - 30,
    speed: 20,
    moveLeft: false,
    moveRight: false
};

// Apple properties
const apple = {
    width: 30,
    height: 30,
    x: Math.random() * (canvas.width - 30),
    y: 0,
    speed: 4
};

// Track score
let score = 0;

// Draw basket
function drawBasket() {
    ctx.fillStyle = '#8B4513'; // Brown color
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

// Draw apple
function drawApple() {
    ctx.beginPath();
    ctx.arc(apple.x + apple.width / 2, apple.y + apple.height / 2, apple.width / 2, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

// Update basket position
function updateBasket() {
    if (basket.moveLeft && basket.x > 0) {
        basket.x -= basket.speed;
    }
    if (basket.moveRight && basket.x + basket.width < canvas.width) {
        basket.x += basket.speed;
    }
}

// Update apple position
function updateApple() {
    apple.y += apple.speed;

    // If apple goes off screen, reset it and reduce the score
    if (apple.y > canvas.height) {
        resetApple();
        score--;
    }

    // Check if apple is caught by the basket
    if (
        apple.y + apple.height >= basket.y &&
        apple.x + apple.width > basket.x &&
        apple.x < basket.x + basket.width
    ) {
        score++;
        resetApple();
    }
}

// Reset apple position
function resetApple() {
    apple.x = Math.random() * (canvas.width - apple.width);
    apple.y = 0;
}

// Handle key down events
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        basket.moveLeft = true;
    } else if (e.key === 'ArrowRight') {
        basket.moveRight = true;
    }
});

// Handle key up events
document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') {
        basket.moveLeft = false;
    } else if (e.key === 'ArrowRight') {
        basket.moveRight = false;
    }
});

// Handle mouse movement
canvas.addEventListener('mousemove', (e) => {
    basket.x = e.clientX - basket.width / 2;
});

// Main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBasket();
    drawApple();
    updateBasket();
    updateApple();

    // Display score
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText('Score: ' + score, 10, 30);

    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
