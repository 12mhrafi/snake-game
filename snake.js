var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;
// snake 
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
// 
var foodX; 
var foodY;

var velocityX = 0;
var velocityY = 0;

var gameOver = false;
var snakeBody = [];
window.onload = function(){
   board = document.getElementById("board");
   board.height = rows * blockSize;
   board.width = cols * blockSize;
   context = board.getContext("2d");
   randomFood(); 
   document.addEventListener("keyup",changeDirection)
//    update();
   setInterval(update,1000/2);
}
function update(){
    if(gameOver){
        return;
    }
    context.fillStyle = "black";
    context.fillRect(0,0,board.width,board.height);
    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX,snakeY,blockSize,blockSize);
    for(let i = 0; i < snakeBody.length;i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize);
    }
    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX,foodY]);
        randomFood();
    }
    for(let i = snakeBody.length-1; i > 0;i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX,snakeY];
    }
    context.fillRect(snakeX,snakeY,blockSize,blockSize);
    context.fillStyle = "red";
    context.fillRect(foodX,foodY,blockSize,blockSize);

    // condition for game over
    if(snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize ){
        gameOver = true;
        alert("game over");
    }
    for(i = 0 ; i < snakeBody.length; i++){
        if(foodX ==snakeBody[i][0] && foodY == snakeBody[i][1]){
            gameOver = true;
            alert("game over")
        }
    }

}
function changeDirection(e){
    if(e.code == "ArrowUp" && velocityY != 1){
        velocityX= 0;
        velocityY = -1;
    }else if (e.code == "ArrowDown"  && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }else if(e.code == "ArrowLeft"  && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }else if(e.code == "ArrowRight"  && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}
// random food 
function randomFood(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

