//board
var blockSize = 25;
var rows, cols ;
var board;
var context; 

//snake head
var snakeX, snakeY ;
var velocityX = 0;
var velocityY = 0;
var snakeBody = [];

//food
var foodX;
var foodY;
var gameOver = false;
var score = 0;

window.onload = function() {
    board = document.getElementById("board");
   resizeCanvas();
    context = board.getContext("2d"); //used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000/10); //100 milliseconds
}
function resizeCanvas() {
    cols = Math.floor(window.innerWidth / blockSize);
    rows = Math.floor(window.innerHeight / blockSize);
    board.width = cols * blockSize;
    board.height = rows * blockSize;

    resetGame();
}
 function resetGame() {
            snakeX = blockSize * 5;
            snakeY = blockSize * 5;
            velocityX = 0;
            velocityY = 0;
            snakeBody = [];
            score = 0;
            gameOver = false;
            placeFood();
            updateScore();
        }

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score++;
        updateScore();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        if (confirm('Game Over. Do you want to restart?')) {
            resetGame();
        }
        return;
        
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            if (confirm('Game Over. Do you want to restart?')) {
                resetGame();
            }
            return;
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


function placeFood(food) {
    let overlapping;
    do{
        overlapping = false;
        foodX = Math.floor(Math.random() * cols) * blockSize;
        foodY = Math.floor(Math.random() * rows) * blockSize;

        // check if the food is on the snakes's body
        for (let i = 0; i < snakeBody.length; i++) {
            if (foodX == snakeBody[i][0] && foodY == snakeBody[i][1]) {
                overlapping = true;
                break;
            }
        }
    } while (overlapping)
}
function updateScore() {
    document.getElementById("scoreDisplay").innerText = "Score: " + score;  // from the score in the HTML page  }
}

window.addEventListener('resize', resizeCanvas);