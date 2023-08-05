let canvas = document.querySelector('canvas');

let ctx = canvas.getContext('2d');

let cellSize = 50;
let boardWidth = 1000;
let boardHeight = 600;
let snakeCells = [[100, 100]]; //it may grow with time
let direction = 'right';
let foodCells = generateRandomCells(); //[x,y]
let gameOver = false;
let score = 0;

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowUp') {
    direction = 'up';
  } else if (e.key === 'ArrowLeft') {
    direction = 'left';
  } else if (e.key === 'ArrowDown') {
    direction = 'down';
  } else if (e.key === 'ArrowRight') {
    direction = 'right';
  }
});
function draw() {
  if (gameOver === true) {
    clearInterval(inetrvalId);
    ctx.fillStyle = 'red';
    ctx.font = '50px Arial';
    ctx.fillText('Game Over!!', 200, 200);
    return;
  }
  ctx.clearRect(0, 0, boardWidth, boardHeight);
  //draw snake
  ctx.fillStyle = 'red';
  for (let items of snakeCells) {
    ctx.fillStyle = 'red';
    ctx.fillRect(items[0], items[1], cellSize, cellSize);
    ctx.strokeStyle = 'golden';
    ctx.strokeRect(items[0], items[1], cellSize, cellSize);
  }

  //draw food
  ctx.fillStyle = 'yellow';
  ctx.fillRect(foodCells[0], foodCells[1], cellSize, cellSize);

  //draw score
  ctx.font = '22px cursive';
  ctx.fillText(`Score : ${score} `, 30, 30);
}

function update() {
  let headX = snakeCells[snakeCells.length - 1][0];
  let headY = snakeCells[snakeCells.length - 1][1];
  let newHeadX;
  let newHeadY;
  // according the direction

  if (direction === 'left') {
    newHeadX = headX - cellSize;
    newHeadY = headY;
    if (newHeadX < 0 || checkmate(newHeadX,newHeadY)) {
      gameOver = true;
    }
  } else if (direction === 'up' ) {
    newHeadX = headX;
    newHeadY = headY - cellSize;
    if (newHeadY < 0 || checkmate(newHeadX, newHeadY)) {
      gameOver = true;
    }
  } else if (direction === 'down') {
    newHeadX = headX;
    newHeadY = headY + cellSize;
    if (newHeadY === boardHeight || checkmate(newHeadX, newHeadY)) {
      gameOver = true;
    }
  } else if (direction === 'right') {
    newHeadX = headX + cellSize;
    newHeadY = headY;
    if (newHeadX === boardWidth || checkmate(newHeadX, newHeadY)) {
      gameOver = true;
    }
  }

  snakeCells.push([newHeadX, newHeadY]);
  if (newHeadX === foodCells[0] && newHeadY === foodCells[1]) {
    foodCells = generateRandomCells();
    snakeCells.unshift();
    score++;
  } else {
    snakeCells.shift();
  }
}
function generateRandomCells() {
  return [
    //x
    Math.round((Math.random() * (boardWidth - cellSize)) / cellSize) * cellSize,

    //y
    Math.round((Math.random() * (boardHeight - cellSize)) / cellSize) * cellSize,
  ];
}


function checkmate(newHeadX,newHeadY){
  for(let item of snakeCells){
    if(item[0] === newHeadX && item[1] === newHeadY){
      return true;
    }
  }
  return false;
}





let inetrvalId = setInterval(function () {
  update();
  draw();
}, 200);
