const canvas = document.getElementById("stage");
const display = document.getElementById("display");
const score = document.getElementById("score");
var context = canvas.getContext("2d");

let startTime = Date.now();
let deltaTime = Date.now();
let x = 3;
let y = 1;
let dir = "ArrowRight";
let scale = 20;
let userInputs = [];
let paused = false;
var snake = {
  img: null,
  directon: "ArrowRight",
  speed: 8,
  tailDirection: null,
  snakeArr: [
    { x: x, y, y },
    { x: x - 1, y, y },
    { x: x - 2, y, y },
    { x: x - 3, y, y },
  ],
};

snake.img = new Image();
snake.img.src = "./snake-graphics.png";
let snakeArr = [
  { x: x, y, y },
  { x: x - 1, y, y },
  { x: x - 2, y, y },
];
let prevX = snake.snakeArr[0].x;
let prevY = snake.snakeArr[0].y;
let randx = Math.round((Math.random() * canvas.width) / scale - 1);
let randy = Math.round((Math.random() * canvas.height) / scale - 1);
let oldrandx = 0;
let oldrandy = 0;
const canvasWdith = Math.floor(canvas.width / scale) - 1;
const canvasHeight = Math.floor(canvas.height / scale) - 1;

function resetSnake() {
  dir = "ArrowRight";
  location.reload();
}

function gameOver(newPos) {
  const restOfElements = snake.snakeArr.slice(1);
  const isSameIndex = restOfElements.find(
    (a) => a.x === newPos.x && a.y === newPos.y
  );
  return isSameIndex;
}

let accDistance = 0;
function gameLoop() {
  prevX = snake.snakeArr[0].x;
  prevY = snake.snakeArr[0].y;
  const distance = (deltaTime / 1000) * snake.speed;
  accDistance += distance;
  if (accDistance > 1) {
    let firstKey = userInputs.shift();
    switch (firstKey) {
      case "ArrowUp":
        if (snake.directon !== "ArrowDown") {
          snake.directon = firstKey;
        }
        break;
      case "ArrowDown":
        if (snake.directon !== "ArrowUp") {
          snake.directon = firstKey;
        }
        break;
      case "ArrowRight":
        if (snake.directon !== "ArrowLeft") {
          snake.directon = firstKey;
        }
        break;
      case "ArrowLeft":
        if (snake.directon !== "ArrowRight") {
          snake.directon = firstKey;
        }
        break;
      case " ":
        accDistance = 0;
        paused = !paused;
        break;
    }
    if (paused) return;
    switch (snake.directon) {
      case "ArrowUp":
        prevY -= 1;
        break;
      case "ArrowDown":
        prevY += 1;
        break;
      case "ArrowRight":
        prevX += 1;
        break;
      case "ArrowLeft":
        prevX -= 1;
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
      snake.snakeArr.pop();
      snake.snakeArr.unshift(newPos);
    }
    accDistance -= 1;
  }
}

document.addEventListener("keydown", (ev) => {
  dir = ev.key;
  if (
    ev.key == "ArrowRight" ||
    ev.key == "ArrowDown" ||
    ev.key == "ArrowLeft" ||
    ev.key == "ArrowUp" ||
    ev.key == " "
  ) {
    if (userInputs.length > 2) {
      userInputs = userInputs.slice(0, 3);
    }
    userInputs.push(dir);
  }
});

function drawgrid() {
  //   context.lineWidth = 1;
  //   var gridSize = 20;
  //   for (let x = gridSize; x < canvas.width; x += gridSize) {
  //     context.beginPath();
  //     context.moveTo(x, 0);
  //     context.lineTo(x, canvas.height);
  //     context.stroke();
  //   }
  //   for (let y = gridSize; y < canvas.height; y += gridSize) {
  //     context.beginPath();
  //     context.moveTo(0, y);
  //     context.lineTo(canvas.width, y);
  //     context.stroke();
  //   }
}

function eatFood() {
  if (snake.snakeArr[0].x == randx && snake.snakeArr[0].y == randy) {
    oldrandx = randx;
    oldrandy = randy;

    while (snake.snakeArr.find((a) => a.x === randx && a.y === randy)) {
      randx = Math.round(Math.random() * canvasWdith);
      randy = Math.round(Math.random() * canvasHeight);
    }
    return true;
  }
  return false;
}

function drawFood() {
  //   context.beginPath();
  //   context.arc(
  //     randx * scale + scale / 2,
  //     randy * scale + scale / 2,
  //     scale / 2,
  //     0,
  //     2 * Math.PI
  //   );
  //   context.stroke();
  //   console.log(
  //     randx * scale + scale / 2,
  //     canvasWdith,
  //     randy * scale + scale / 2,
  //     canvasHeight
  //   );
  //   var img = document.getElementById("apple");
  //   context.drawImage(img, randx * scale, randy * scale, scale, scale);
  context.drawImage(
    snake.img,
    0,
    190,
    65,
    65,
    randx * scale,
    randy * scale,
    scale,
    scale
  );
}

function draw() {
  // clear
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawgrid();

  drawFood();
  display.innerHTML = "";
  if (eatFood()) {
    snake.snakeArr.push({
      x: snake.snakeArr[snake.snakeArr.length - 1].x,
      y: snake.snakeArr[snake.snakeArr.length - 1].y,
    });
  }
  // draw
  drawSnake();
}

let snakeObj = {
  headUp: [190, -2, 65, 65, 20, 20, 20, 20],
  headRight: [257, -2, 65, 65, 20, 20, 20, 20],
  headLeft: [192, 64.5, 63, 63, 20, 20, 20, 20],
  headDown: [258, 64, 65, 65, 20, 20, 20, 20],
  tailUp: [190, 130, 65, 65, 20, 20, 20, 20],
  tailRight: [261, 130, 65, 65, 20, 20, 20, 20],
  tailLeft: [190, 195, 65, 65, 20, 20, 20, 20],
  tailDown: [261, 195, 65, 65, 20, 20, 20, 20],
  bodyRightUpCorner: [125, 0, 65, 65, 20, 20, scale * 10, scale * 10],
  bodyRightDownCorner: [125, 125, 65, 65, 20, 20, scale * 10, scale * 10],
  bodyUpLeftCorner: [0, 0, 65, 65, 20, 20, scale * 10, scale * 10],
  bodyXaxis: [60, 0, 65, 65, 20, 20, scale * 10, scale * 10],
  bodyYaxis: [125, 60, 65, 65, 20, 20, scale * 10, scale * 10],
  bodyDownLeftCorner: [0, 62, 65, 65, 20, 20, scale * 10, scale * 10],
};
function snakeGraphics(bodyPart, directon, x, y) {
  //   context.fillStyle = "red";
  //   context.fillRect(20, 20, 200, 200);
  //   context.drawImage(snake.img, 0, 62, 65, 65, 20, 20, scale * 10, scale * 10);

  function drawBody() {
    switch (directon) {
      case "Yaxis":
        context.drawImage(
          snake.img,
          125,
          60,
          65,
          65,
          x * scale + scale / 2 - 11.1,
          snake.snakeArr[0].y < snake.snakeArr[1].y
            ? y * scale + scale / 2 - 10
            : y * scale + scale / 2 - 10,
          scale,
          scale
        );
        break;
      case "Xaxis":
        context.drawImage(
          snake.img,
          60,
          0,
          65,
          65,
          snake.snakeArr[0].x > snake.snakeArr[1].x
            ? x * scale + scale / 2 - 10 //goes left
            : x * scale + scale / 2 - 10, // goes right
          y * scale + scale / 2 - 10,
          scale,
          scale
        );
        break;
      case "RightUpCorner":
        context.drawImage(
          snake.img,
          125,
          0,
          65,
          65,
          x * scale + scale / 2 - 11,
          y * scale + scale / 2 - 10,
          scale,
          scale
        );
        break;
      case "LeftUpCorner":
        context.drawImage(
          snake.img,
          0,
          0,
          65,
          65,
          x * scale + scale / 2 - 10,
          y * scale + scale / 2 - 10,
          scale,
          scale
        );
        break;
      case "LeftDownCorner":
        context.drawImage(
          snake.img,
          0,
          62,
          65,
          65,
          snake.snakeArr[0].x > snake.snakeArr[1].x
            ? x * scale + scale / 2 - 10 //turns right
            : x * scale + scale / 2 - 9.5, // turns up
          y * scale + scale / 2 - 10,
          scale,
          scale
        );
        break;
      case "RightDownCorner":
        context.drawImage(
          snake.img,
          125,
          125,
          65,
          65,
          x * scale + scale / 2 - 11,
          y * scale + scale / 2 - 11,
          scale,
          scale
        );
        break;
      default:
        break;
    }
  }

  function drawHead() {
    switch (directon) {
      case "ArrowRight":
        context.drawImage(
          snake.img,
          255,
          -2,
          65,
          65,
          x * scale + scale / 2 - 10,
          y * scale + scale / 2 - 11,
          scale,
          scale
        );
        break;
      case "ArrowLeft":
        context.drawImage(
          snake.img,
          190,
          64.5,
          63,
          63,
          x * scale + scale / 2 - 10,
          y * scale + scale / 2 - 10,
          scale,
          scale
        );
        break;
      case "ArrowUp":
        context.drawImage(
          snake.img,
          190,
          0,
          65,
          65,
          x * scale + scale / 2 - 10,
          y * scale + scale / 2 - 10,
          scale,
          scale
        );
        break;
      case "ArrowDown":
        context.drawImage(
          snake.img,
          258,
          64,
          65,
          65,
          x * scale + scale / 2 - 10,
          y * scale + scale / 2 - 10,
          scale,
          scale
        );
        break;
      default:
        break;
    }
  }

  function drawTail() {
    switch (directon) {
      case "ArrowRight":
        // tailLeft: [190, 195, 65, 65, 20, 20, 20, 20],
        context.drawImage(
          snake.img,
          261,
          130,
          65,
          65,
          x * scale + scale / 2 - 0,
          y * scale + scale / 2 - 9,
          scale,
          scale
        );
        break;
      case "ArrowLeft":
        context.drawImage(
          snake.img,
          190,
          195,
          65,
          65,
          x * scale + scale / 2 - 10.5,
          y * scale + scale / 2 - 9,
          scale,
          scale
        );
        break;
      case "ArrowUp":
        context.drawImage(
          snake.img,
          190,
          130,
          65,
          65,
          x * scale + scale / 2 - 10.5,
          y * scale + scale / 2 - 10,
          scale,
          scale
        );
        break;
      case "ArrowDown":
        //tail down
        context.drawImage(
          snake.img,
          261,
          195,
          65,
          65,
          x * scale + scale / 2 - 8.5,
          y * scale + scale / 2 - 8,
          scale,
          scale
        );
        break;
      default:
        break;
    }
  }
  switch (bodyPart) {
    case "head":
      drawHead();
      break;
    case "body":
      drawBody();
      break;
    case "tail":
      drawTail();
      break;
    default:
      break;
  }
}

function getOtherPartDir(original, other) {
  if (original.x === other.x && original.y === other.y)
    return snake.tailDirection;
  if (original.x === other.x) {
    if (original.y > other.y && Math.abs(original.y - other.y) > 1) {
      return "down";
    } else if (original.y < other.y && Math.abs(original.y - other.y) === 1) {
      return "down";
    } else {
      return "up";
    }
  } else {
    if (original.x > other.x && Math.abs(original.x - other.x) > 1) {
      return "right";
    } else if (original.x < other.x && Math.abs(original.x - other.x) === 1) {
      return "right";
    } else {
      return "left";
    }
  }
}

function drawSnake() {
  snake.snakeArr.map((element, index, arr) => {
    if (index === 0) {
      //head
      let prevState = getOtherPartDir(element, arr[index + 1]);
      if (prevState === "left") {
        snakeGraphics("head", "ArrowRight", element.x, element.y);
      } else if (prevState === "right") {
        snakeGraphics("head", "ArrowLeft", element.x, element.y);
      } else if (prevState === "up") {
        snakeGraphics("head", "ArrowDown", element.x, element.y);
      } else if (prevState === "down") {
        snakeGraphics("head", "ArrowUp", element.x, element.y);
      }
    } else if (index === snake.snakeArr.length - 1) {
      //tail
      let nextState = getOtherPartDir(element, arr[index - 1]);
      snake.tailDirection = nextState;
      if (nextState === "right")
        snakeGraphics("tail", "ArrowRight", element.x, element.y);
      else if (nextState === "left")
        snakeGraphics("tail", "ArrowLeft", element.x, element.y);
      else if (nextState === "up")
        snakeGraphics("tail", "ArrowUp", element.x, element.y);
      else if (nextState === "down")
        snakeGraphics("tail", "ArrowDown", element.x, element.y);
    } else if (index < snake.snakeArr.length - 1 && index > 0) {
      // body
      let prevState = getOtherPartDir(element, arr[index + 1]);
      let nextState = getOtherPartDir(element, arr[index - 1]);

      if (
        (prevState === "up" && nextState === "down") ||
        (prevState === "down" && nextState === "up") ||
        (prevState === "down" && nextState === "down") ||
        (prevState === "up" && nextState === "up")
      ) {
        // down
        snakeGraphics("body", "Yaxis", element.x, element.y);
      } else if (
        (prevState === "left" && nextState === "right") ||
        (prevState === "left" && nextState === "left") ||
        (prevState === "right" && nextState === "right") ||
        (prevState === "right" && nextState === "left")
      ) {
        snakeGraphics("body", "Xaxis", element.x, element.y);
      } else if (
        (prevState === "down" && nextState === "right") ||
        (prevState === "right" && nextState === "down")
      ) {
        // left Up corner
        snakeGraphics("body", "LeftUpCorner", element.x, element.y);
      } else if (
        (prevState === "down" && nextState === "left") ||
        (prevState === "left" && nextState === "down")
      ) {
        // right up corner
        snakeGraphics("body", "RightUpCorner", element.x, element.y);
      } else if (
        (prevState === "up" && nextState === "right") ||
        (prevState === "right" && nextState === "up")
      ) {
        // down left corner
        snakeGraphics("body", "LeftDownCorner", element.x, element.y);
      } else if (
        (prevState === "up" && nextState === "left") ||
        (prevState === "left" && nextState === "up")
      ) {
        // down right corner
        snakeGraphics("body", "RightDownCorner", element.x, element.y);
      }
    }

    // context.beginPath();
    // context.arc(
    //   element.x * scale + scale / 2,
    //   element.y * scale + scale / 2,
    //   scale / 2,
    //   0,
    //   2 * Math.PI
    // );
    // context.stroke();

    // let pTag = document.createElement("p");
    // pTag.innerText = `x: ${element.x
    //   .toString()
    //   .padStart(2, "0")}, y: ${element.y
    //   .toString()
    //   .padStart(2, "0")}, index: ${index}`;
    // display.appendChild(pTag);

    score.innerHTML = "";
    let pTag2 = document.createElement("span");

    pTag2.innerText = ` score: ${index - 3}`;
    score.appendChild(pTag2);
  });
}

// 83 each second
setInterval(() => {
  let currTime = Date.now();
  deltaTime = currTime - startTime;
  startTime = currTime;
  gameLoop();
  draw();
}, 10);
