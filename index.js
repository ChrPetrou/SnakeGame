const canvas = document.getElementById("stage");
const display = document.getElementById("display");
const score = document.getElementById("score");
var context = canvas.getContext("2d");

let x = 3;
let y = 1;
let dir = "ArrowRight";
let scale = 10;
let snakeArr = [
  { x: x, y, y },
  { x: x - 1, y, y },
  { x: x - 2, y, y },
];
let prevX = snakeArr[0].x;
let prevY = snakeArr[0].y;
let randx = Math.round((Math.random() * canvas.width) / 10 - 1);
let randy = Math.round((Math.random() * canvas.height) / 10 - 1);
const canvasWdith = Math.floor(canvas.width / scale) - 1;
const canvasHeight = Math.floor(canvas.height / scale) - 1;

function resetSnake() {
  dir = "ArrowRight";
  location.reload();
}

function gameOver(newPos) {
  const restOfElements = snakeArr.slice(1);
  const isSameIndex = restOfElements.find(
    (a) => a.x === newPos.x && a.y === newPos.y
  );
  return isSameIndex;
}

function gameLoop() {
  prevX = snakeArr[0].x;
  prevY = snakeArr[0].y;
  switch (dir) {
    case "ArrowUp":
      if (
        snakeArr[1].x === snakeArr[0].x &&
        (snakeArr[1].y === snakeArr[0].y - 1 ||
          (snakeArr[0].y === 0 && snakeArr[1].y === canvasHeight))
      ) {
        prevY += 1;
        y += 1;
        animatesnake("ArrowDown", snakeArr[0].x, snakeArr[0].y);
      } else {
        animatesnake("ArrowUp", snakeArr[0].x, snakeArr[0].y);
        prevY -= 1;
        y -= 1;
      }
      // snakeArr[0].y = y;

      break;
    case "ArrowDown":
      if (
        snakeArr[1].x === snakeArr[0].x &&
        (snakeArr[1].y === snakeArr[0].y + 1 ||
          (snakeArr[0].y === canvasHeight && snakeArr[1].y === 0))
      ) {
        prevY -= 1;
        y -= 1;
        animatesnake("ArrowUp", snakeArr[0].x, snakeArr[0].y);
      } else {
        animatesnake("ArrowDown", snakeArr[0].x, snakeArr[0].y);
        prevY += 1;
        y += 1;
      }
      // snakeArr[0].y = y;
      break;
    case "ArrowRight":
      if (
        snakeArr[1].y === snakeArr[0].y &&
        (snakeArr[1].x === snakeArr[0].x + 1 ||
          (snakeArr[0].x === canvasWdith && snakeArr[1].x === 0))
      ) {
        prevX -= 1;
        x -= 1;
        animatesnake("ArrowLeft", snakeArr[0].x, snakeArr[0].y);
      } else {
        animatesnake("ArrowRight", snakeArr[0].x, snakeArr[0].y);
        animatesnake(
          "ArrowRight",
          snakeArr[snakeArr.length - 1].x,
          snakeArr[snakeArr.length - 1].y
        );
        prevX += 1;
        x += 1;
      }
      // snakeArr[0].x = x;
      break;
    case "ArrowLeft":
      if (
        snakeArr[1].y === snakeArr[0].y &&
        (snakeArr[1].x == snakeArr[0].x - 1 ||
          (snakeArr[0].x === 0 && snakeArr[1].x === canvasWdith))
      ) {
        prevX += 1;
        x += 1;
        animatesnake("ArrowRight", snakeArr[0].x, snakeArr[0].y);
      } else {
        animatesnake("ArrowLeft", snakeArr[0].x, snakeArr[0].y);
        prevX -= 1;
        x -= 1;
      }
      // snakeArr[0].x = x;
      break;
    default:
      return;
  }

  // for(let i = 0; i)

  //loop again from the other side of canvas
  if (canvas.height / scale <= prevY) {
    prevY = 0;
  }
  if (0 > prevY) {
    prevY = canvasHeight;
  }
  if (canvas.width / scale <= prevX) {
    prevX = 0;
  }
  if (0 > prevX) {
    prevX = canvasWdith;
  }

  let newPos = { x: prevX, y: prevY };

  if (gameOver(newPos)) {
    // alert("Game over");
    resetSnake();
  } else {
    snakeArr.pop();
    snakeArr.unshift(newPos);
  }
}

document.addEventListener("keydown", (ev) => {
  dir = ev.key;
});

function drawgrid() {
  // context.lineWidth = 1;
  // var gridSize = 10;
  // for (let x = gridSize; x < canvas.width; x += gridSize) {
  //   context.beginPath();
  //   context.moveTo(x, 0);
  //   context.lineTo(x, canvas.height);
  //   context.stroke();
  // }
  // for (let y = gridSize; y < canvas.height; y += gridSize) {
  //   context.beginPath();
  //   context.moveTo(0, y);
  //   context.lineTo(canvas.width, y);
  //   context.stroke();
  // }
}

function eatFood() {
  if (snakeArr[0].x == randx && snakeArr[0].y == randy) {
    randx = Math.round(Math.random() * canvasWdith);
    randy = Math.round(Math.random() * canvasHeight);
    return true;
  }
  return false;
}

function drawFood() {
  // context.beginPath();
  // context.arc(
  //   randx * scale + scale / 2,
  //   randy * scale + scale / 2,
  //   scale / 2,
  //   0,
  //   2 * Math.PI
  // );
  // context.stroke();
  var img = document.getElementById("apple");
  context.drawImage(img, randx * scale, randy * scale, scale, scale);
}

function draw() {
  // clear
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawgrid();

  drawFood();
  display.innerHTML = "";

  if (eatFood()) {
    snakeArr.push({
      x: snakeArr[snakeArr.length - 1].x,
      y: snakeArr[snakeArr.length - 1].y,
    });
  }
  // draw
  drawSnake();
}

var snake = {
  img: null,
  x: 0,
  y: 0,
  width: 28,
  height: 42,
  currentframe: 0,
  totalframes: 6,
};

snake.img = new Image();
snake.img.src = "./snake-graphics.png";

snake.img.onload = function () {
  // snakeTimer = animatesnake();
};

let snakeObj = {
  headUp: [190, 0, 65, 65, 21, 20, 20, 20],
  headRight: [255, -2, 65, 65, 21, 20, 20, 20],
  headLeft: [190, 64.5, 63, 63, 21, 20, 20, 20],
  headDown: [258, 64, 65, 65, 21, 20, 20, 20],
  tailUp: [190, 130, 65, 65, 20, 20, 20, 20],
  tailRight: [261, 130, 65, 65, 20, 20, 20, 20],
  tailLeft: [190, 195, 65, 65, 20, 20, 20, 20],
  tailDown: [261, 195, 65, 65, 20, 20, 20, 20],
};
function animatesnake(directon, x, y) {
  // context.drawImage(snake.img, 190, 195, 65, 65, 20, 20, 200, 200);
  // switch (directon) {
  //   case "ArrowRight":
  //     context.drawImage(
  //       snake.img,
  //       255,
  //       -2,
  //       65,
  //       65,
  //       x * scale + scale / 2,
  //       y * scale + scale / 2 - 10,
  //       25,
  //       25
  //     );
  //     break;
  //   case "ArrowLeft":
  //     context.drawImage(
  //       snake.img,
  //       190,
  //       64.5,
  //       63,
  //       63,
  //       x * scale + scale / 2 - 20,
  //       y * scale + scale / 2 - 10,
  //       25,
  //       25
  //     );
  //     break;
  //   case "ArrowUp":
  //     context.drawImage(
  //       snake.img,
  //       190,
  //       0,
  //       65,
  //       65,
  //       x * scale + scale / 2 - 10,
  //       y * scale + scale / 2 - 20,
  //       25,
  //       25
  //     );
  //     break;
  //   case "ArrowDown":
  //     context.drawImage(
  //       snake.img,
  //       258,
  //       64,
  //       65,
  //       65,
  //       x * scale + scale / 2 - 10,
  //       y * scale + scale / 2,
  //       25,
  //       25
  //     );
  //     break;
  //   default:
  //     break;
  // }
}

function drawSnake() {
  snakeArr.map((element, index) => {
    // if (index === 0) {
    //   animatesnake(
    //     element.x * scale + scale / 2,
    //     element.y * scale + scale / 2
    //   );
    // } else {
    context.beginPath();
    context.arc(
      element.x * scale + scale / 2,
      element.y * scale + scale / 2,
      scale / 2,
      0,
      2 * Math.PI
    );
    context.stroke();
    // }

    let pTag = document.createElement("p");
    pTag.innerText = `x: ${element.x
      .toString()
      .padStart(2, "0")}, y: ${element.y
      .toString()
      .padStart(2, "0")}, index: ${index}`;
    display.appendChild(pTag);

    score.innerHTML = "";
    let pTag2 = document.createElement("span");
    pTag2.innerText = ` score: ${index - 2}`;
    score.appendChild(pTag2);
  });
}

setInterval(() => {
  draw();
  gameLoop();
}, 150);
