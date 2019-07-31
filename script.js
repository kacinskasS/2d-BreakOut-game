let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let ballRadius = 10;
let intervalID = null;

//Sounds
let gameOver = new Audio('./gameoversound.mp3');
let levelUp = new Audio('./levelupsound.mp3');
let youWin = new Audio('./youwinsound.mp3');

//Ball movement in axis
let bx = 1; // move right
let by = 1; // move left

//Ball movement
let dx = 3;
let dy = 3;

//Ball drawing location
let x = canvas.width / 2;
let y = canvas.height - 30;

//Ball drawing
function drawBall() {
    ctx.beginPath();
    ctx.fillStyle = '#FF69B4';
    ctx.strokeStyle = '#FF69B4';
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

//Paddle variables
let paddleHeight = 10;
let paddleWidth = 80;
let paddleX = (canvas.width - paddleWidth) / 2;

//Paddle drawing
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#FFDC00';
    ctx.fill();
    ctx.closePath();
}

//Paddle movement
let rightPressed = false;
let leftPressed = false;

function keyDownHandler(e) {
    if (e.keyCode === 39 || e.keyCode === 68) {
        rightPressed = true;
    } else if (e.keyCode === 37 || e.keyCode === 65) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode === 39 || e.keyCode === 68) {
        rightPressed = false;
    } else if (e.keyCode === 37 || e.keyCode === 65) {
        leftPressed = false;
    }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

//Bricks variables
let brickRowCount = 3;
let brickColumnCount = 6;
let brickWidth = 80;
let brickHeight = 30;
let brickPadding = 10;
let brickOffsetTop = 80;
let brickOffsetLeft = 80;

//Bricks rows/columns
let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {
            x: 0,
            y: 0,
            status: 1
        };
    }
}

//Bricks drawing
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = brickColor;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

//Bricks random colors
let brickColor = getRandomColor();

function getRandomColor() {
    let myRed = Math.floor(Math.random() * 400);
    let myGreen = Math.floor(Math.random() * 400);
    let myBlue = Math.floor(Math.random() * 400);
    return 'rgb(' + myRed + ',' + myGreen + ',' + myBlue + ')';
}

//Level drawing
let level = 1;

function drawLevel() {
    ctx.font = "25px arial ";
    ctx.fillStyle = "#E0FFFF";
    ctx.textAlign = "Left";
    ctx.fillText("Level: " + level, 30, 30);
}


//Collision detection
let left = brickColumnCount * brickRowCount;

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    left--;
                    if (0 === left) {
                        let tempBrickRowCount = ++brickRowCount;
                        let tempLevel = ++level;
                        let tempScore = score;
                        reset();
                        brickRowCount = tempBrickRowCount;
                        left = brickColumnCount * brickRowCount;
                        level = tempLevel;
                        score = tempScore;
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.save();
                        ctx.textAlign = "center";
                        lvlPaddleWidth();
                        if(level> 5){
                            reset();
                        }
                        if (level < 6) {
                            levelUp.play();
                            ctx.font = "bold 120px arial ";
                            ctx.fillStyle = "#98FB98";
                            ctx.fillText("Level Up", 350, 300);
                            brickColor = getRandomColor();
                            }else if(level = 5){
                                youWin.play();
                                ctx.font = "bold 80px arial ";ctx.fillStyle = "#3CB371";
                                ctx.fillText("Congratulations ", 350, 100);
                                ctx.fillText(userName, 350, 250);
                                ctx.fillText("You Win", 350, 400);
                                ctx.fillText("!!!", 350, 550);
                            }else {
                            reset();
                        }
                        ctx.restore();

                    }
                }
            }
        }
    }
}

//Score drawing
let score = 0;

function drawScore() {
    ctx.font = "25px arial ";
    ctx.fillStyle = "#E0FFFF";
    ctx.textAlign = "Left";
    ctx.fillText("Score: " + score, 570, 30);
}


//When level up paddle width--
function lvlPaddleWidth() {
    if (level == 1) {
        paddleWidth = 80;
    }
    if (level == 2) {
        paddleWidth = 70;
    }
    if (level == 3) {
        paddleWidth = 60;
    }
    if (level == 4) {
        paddleWidth = 50;
    }

}

//Lives drawing
let lives = 3;

function drawLives() {
    ctx.font = "25px arial";
    ctx.fillStyle = "#E0FFFF";
    ctx.textAlign = "Left";
    ctx.fillText("Lives: " + lives, 30, 60);



}

//Buttons/ Input variables
let buttonPause = document.getElementById('btnPause');
let buttonPlay = document.getElementById('btnPlay');
let buttonReset = document.getElementById('btnReset');
let player = document.getElementById('playerName');

//PlayerName Drawing
let userName = '';

function drawPlayerName() {
    ctx.font = " 25px arial";
    ctx.fillStyle = "#E0FFFF";
    ctx.textAlign = "Left";
    ctx.fillText("Player: " + userName, 260, 30);
}

//Player name shows then press play button
player.addEventListener('keyup', function () {
    userName = this.value;
});


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    if (x + (dx * by) > canvas.width - ballRadius || x + (dx * bx) < ballRadius) {
        bx = -bx;
    }

    if (y + (dy * by) < ballRadius) {
        by = -by;
    } else if (y + (dy * by) > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            by = -by;
        } else {
            lives--;
            if (lives <= 0) {
                reset();
                gameOver.play();
                ctx.save();
                ctx.font = "bold 120px arial";
                ctx.textAlign = "center";
                ctx.fillStyle = "#ff0000";
                ctx.fillText("Game", 350, 150);
                ctx.fillText("Over", 350, 250);
                ctx.fillText("!!!", 350, 350);
                ctx.font = "bold 60px arial";
                ctx.textAlign = "center";
                ctx.fillStyle = "#FFA07A";
                ctx.fillText("Try next time " + userName, 350, 450);
                ctx.restore();
                return;

            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;

                dy = -dy;

                drawBall();

                drawPaddle();

                drawScore();

                drawLives();

                drawPlayerName();

                collisionDetection();

                drawLevel();

                return;
            }

        }
    }

    x += (dx * bx);
    y += (dy * by);

    drawBall();

    drawPaddle();

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 5;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 5;
    }

    drawScore();

    drawLives();

    drawPlayerName();

    drawLevel();

    collisionDetection();
}

function reset() {
    stopAnimating();

    //Bricks rows/columns
    bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = {
                x: 0,
                y: 0,
                status: 1
            };
        }
    }


    //Ball movement
    dx = 3;
    dy = 3;

    //Ball drawing location
    x = canvas.width / 2;
    y = canvas.height - 30;

    paddleX = (canvas.width - paddleWidth) / 2;

    score = 0;

    lives = 3;

    brickRowCount = 3;

    level = 1;

    left = brickColumnCount * brickRowCount;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function startGame() {
    if (!intervalID)
        intervalID = setInterval(draw, 10);
}

//Stop animating
function stopAnimating() {
    clearInterval(intervalID);
    intervalID = null;
}

//Button Play
buttonPlay.addEventListener('click', startGame);

//Button Pause
buttonPause.addEventListener('click', stopAnimating);

//Button Reset
buttonReset.addEventListener('click', reset);


























