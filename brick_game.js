var canvas = document.getElementById("myCanvas");
//set hte size of canvas
canvas.width = 800;
canvas.height = 600;
//__________________
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var speed = 6;
var degree = Math.floor(Math.random() * (-90) - 60);
var angle = degree * Math.PI / 180;
var dx = 0;
var dy = 0;
dx += speed * Math.cos(angle);
dy += speed * Math.sin(angle);
console.log("dx = " + dx);
console.log("dy = " + dy);
console.log("speed = " + speed);
console.log("Angle = " + angle);

var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 100;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var score = 0;
var lives = 3;
//variables for bricks
var brickRowCount = 6;
var brickColumnCount = 9;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 5;
var brickOffsetTop = 30;
var brickOffsetLeft = 40;

var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {
            x: 0,
            y: 0,
            status: 1
        };
    }
}


function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#1e249a";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#fe41d6";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#5ecd58";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    drawScore();
    drawLives();

    if (y + dy - ballRadius < 0) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x <= paddleX + paddleWidth) {
            dy = -dy;
        } else {
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
                clearInterval(interval); // Needed for Chrome to end game
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                var degree = Math.floor(Math.random() * (-90) - 60);
                var angle = degree * Math.PI / 180;
                dx = speed * Math.cos(angle);
                dy = speed * Math.sin(angle);
                console.log("dx = " + dx);
                console.log("dy = " + dy);
                console.log("speed = " + speed);
                console.log("Angle = " + angle);
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    if (x + dx + ballRadius > canvas.width || x + dx - ballRadius < 0) {
        dx = -dx;
    }
    if (rightPressed) {
        paddleX += 7;
        if (paddleWidth + paddleX > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    } else if (leftPressed) {
        paddleX -= 7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

//Event Listeners for KEY PRESSING
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//document.addEventListener("mousemove", mouseMoveHandler, false);

/* function mouseMoveHandler(e) {
     var relativeX = e.clientX - canvas.offsetLeft;
     if (relativeX > 0 && relativeX < canvas.width) {
         paddleX = relativeX - paddleWidth / 2;
     }
 }*/

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            //calculations
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -(speed * Math.sin(angle));
                    console.log("angel(brick colission) = " + angle)
                    console.log("speed = " + speed);
                    b.status = 0;
                    score++;
                    if (score == 5) {
                        speed = speed + 2;
                    } else if (score == 10) {
                        speed += 2;
                    }
                    if (score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                        //clearInterval(interval); // Needed for Chrome to end game
                    }
                }
            }
            x
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

draw();
//  var interval = setInterval(draw, 10);