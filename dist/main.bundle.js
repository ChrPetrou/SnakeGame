"use strict";
(self["webpackChunksnake_game"] = self["webpackChunksnake_game"] || []).push([["main"],{

/***/ "./src/images/snake-graphics.png":
/*!***************************************!*\
  !*** ./src/images/snake-graphics.png ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "b88acd37daebf0d190e68a81bf2ab1fe.png");

/***/ }),

/***/ "./src/snake.js":
/*!**********************!*\
  !*** ./src/snake.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test */ "./src/test.js");
/* harmony import */ var _images_snake_graphics_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./images/snake-graphics.png */ "./src/images/snake-graphics.png");



(0,_test__WEBPACK_IMPORTED_MODULE_0__["default"])();

const canvas = document.createElement("canvas");
canvas.width = 400;
canvas.height = 500;
document.body.appendChild(canvas);
const display = document.getElementById("display");
const score = document.getElementById("score");
var context = canvas.getContext("2d");

console.log(context);

let startTime = Date.now();
let deltaTime = Date.now();
let accDistance = 0;
let x = 3;
let y = 1;
let dir = "ArrowRight";
let scale = 20;
let userInputs = [];
let paused = false;

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  mDistance(otherPos) {
    return Math.abs(otherPos.x - this.x) + Math.abs(otherPos.y - this.y);
  }
}

let vector = new Vector(3, 1);

class Snake {
  constructor() {
    this.img = null;
    this.directon = "ArrowRight";
    this.speed = 8;
    this.tailDirection = null;
    this.snakeArr = [
      new Vector(3, 1),
      new Vector(2, 1),
      new Vector(1, 1),
      new Vector(0, 1),
    ];
    this.eatenArr = [];
    this.extendTail = null;
  }
  resetSnake() {
    dir = "ArrowRight";
    location.reload();
  }
  onUpdate() {
    prevX = snake.snakeArr[0].x;
    prevY = snake.snakeArr[0].y;
    const distance = (deltaTime / 1000) * snake.speed;
    accDistance += distance;
    if (accDistance > 1) {
      // for(let i = 0; i)
      this.controls();
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

      let newPos = new Vector(prevX, prevY);
      if (gameOver(newPos)) {
        // alert("Game over");
        snake.resetSnake();
      } else {
        snake.snakeArr.pop();
        snake.snakeArr.unshift(newPos);
      }
      if (eatFood()) {
        snake.eatenArr.push({ x: snake.snakeArr[0].x, y: snake.snakeArr[0].y });
      }
      if (snake.extendTail) {
        snake.snakeArr.push(snake.extendTail);
        snake.extendTail = null;
      }
      let tail = snake.snakeArr[snake.snakeArr.length - 1];

      if (snake.eatenArr.length > 0) {
        if (tail.mDistance(snake.eatenArr[0]) === 0) {
          snake.extendTail = snake.eatenArr[0];
          snake.eatenArr = snake.eatenArr.slice(1);
        }
      }
      accDistance -= 1;
    }
  }
  controls() {
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
  }
  snakeGraphics(bodyPartDirecton, x, y) {
    switch (bodyPartDirecton) {
      case "headArrowRight":
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
      case "headArrowLeft":
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
      case "headArrowUp":
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
      case "headArrowDown":
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
      case "bodyYaxis":
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
      case "bodyXaxis":
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
      case "bodyRightUpCorner":
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
      case "bodyLeftUpCorner":
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
      case "bodyLeftDownCorner":
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
      case "bodyRightDownCorner":
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
      case "tailArrowRight":
        //tail right,
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

      case "tailArrowLeft":
        //tail left,
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
      case "tailArrowUp":
        //tail up
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
      case "tailArrowDown":
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
  drawSnake() {
    for (let index = 0; index < snake.snakeArr.length; index++) {
      let element = snake.snakeArr[index];
      let arr = snake.snakeArr;
      if (index === 0) {
        //head
        let prevState = getOtherPartDir(element, arr[index + 1]);
        if (prevState === "left") {
          this.snakeGraphics("headArrowRight", element.x, element.y);
        } else if (prevState === "right") {
          this.snakeGraphics("headArrowLeft", element.x, element.y);
        } else if (prevState === "up") {
          this.snakeGraphics("headArrowDown", element.x, element.y);
        } else if (prevState === "down") {
          this.snakeGraphics("headArrowUp", element.x, element.y);
        }
      } else if (index === snake.snakeArr.length - 1) {
        //tail
        let nextState = getOtherPartDir(element, arr[index - 1]);
        snake.tailDirection = nextState;
        if (nextState === "right")
          this.snakeGraphics("tailArrowRight", element.x, element.y);
        else if (nextState === "left")
          this.snakeGraphics("tailArrowLeft", element.x, element.y);
        else if (nextState === "up")
          this.snakeGraphics("tailArrowUp", element.x, element.y);
        else if (nextState === "down")
          this.snakeGraphics("tailArrowDown", element.x, element.y);
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
          this.snakeGraphics("bodyYaxis", element.x, element.y);
        } else if (
          (prevState === "left" && nextState === "right") ||
          (prevState === "left" && nextState === "left") ||
          (prevState === "right" && nextState === "right") ||
          (prevState === "right" && nextState === "left")
        ) {
          this.snakeGraphics("bodyXaxis", element.x, element.y);
        } else if (
          (prevState === "down" && nextState === "right") ||
          (prevState === "right" && nextState === "down")
        ) {
          // left Up corner
          this.snakeGraphics("bodyLeftUpCorner", element.x, element.y);
        } else if (
          (prevState === "down" && nextState === "left") ||
          (prevState === "left" && nextState === "down")
        ) {
          // right up corner
          this.snakeGraphics("bodyRightUpCorner", element.x, element.y);
        } else if (
          (prevState === "up" && nextState === "right") ||
          (prevState === "right" && nextState === "up")
        ) {
          // down left corner
          this.snakeGraphics("bodyLeftDownCorner", element.x, element.y);
        } else if (
          (prevState === "up" && nextState === "left") ||
          (prevState === "left" && nextState === "up")
        ) {
          // down right corner
          this.snakeGraphics("bodyRightDownCorner", element.x, element.y);
        }
      }
      snakeDebug(element, index);
    }
  }
}

let snake = new Snake();
snake.img = new Image();
snake.img.src = _images_snake_graphics_png__WEBPACK_IMPORTED_MODULE_1__["default"];

class Apple {
  constructor() {}
}

let prevX = snake.snakeArr[0].x;
let prevY = snake.snakeArr[0].y;
let randx = Math.round((Math.random() * canvas.width) / scale - 1);
let randy = Math.round((Math.random() * canvas.height) / scale - 1);
const canvasWdith = Math.floor(canvas.width / scale) - 1;
const canvasHeight = Math.floor(canvas.height / scale) - 1;

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

// let startY;
// let startX;
// document.addEventListener("touchstart", function (event) {
//   startY = event.touches[0].clientY;
//   startX = event.touches[0].clientX;
// });

// document.addEventListener("touchmove", function (event) {
//   var endY = event.touches[0].clientY;
//   var endX = event.touches[0].clientX;
//   var deltaY = endY - startY;
//   var deltaX = endX - startX;
//   console.log(Math.abs(deltaY, deltaX));
//   if (Math.abs(deltaY > deltaX)) {
//     if (deltaY > 0) {
//       userInputs.push("ArrowDown");
//     } else {
//       userInputs.push("ArrowUp");
//     }
//   } else {
//     if (deltaX < 0) {
//       userInputs.push("ArrowLeft");
//     } else {
//       userInputs.push("ArrowRight");
//     }
//   }
// });

function gameOver(newPos) {
  const restOfElements = snake.snakeArr.slice(1);
  const isSameIndex = restOfElements.find(
    (a) => a.x === newPos.x && a.y === newPos.y
  );
  return isSameIndex;
}

function gameLoop() {
  snake.onUpdate();
}

// function mDistance(pos1, pos2) {
//   return Math.abs(pos2.x - pos1.x) + Math.abs(pos2.y - pos1.y);
// }

function drawgrid() {
  context.lineWidth = 1;
  var gridSize = 20;
  for (let x = gridSize; x < canvas.width; x += gridSize) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, canvas.height);
    context.stroke();
  }
  for (let y = gridSize; y < canvas.height; y += gridSize) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(canvas.width, y);
    context.stroke();
  }
}

// to debug snake graphics and each array element position
function snakeDebug(element, index) {
  context.beginPath();
  context.arc(
    element.x * scale + scale / 2,
    element.y * scale + scale / 2,
    scale / 2,
    0,
    2 * Math.PI
  );
  context.stroke();
  let pTag = document.createElement("p");
  pTag.innerText = `x: ${element?.x
    .toString()
    .padStart(2, "0")}, y: ${element?.y
    .toString()
    .padStart(2, "0")}, index: ${index}`;
  display.appendChild(pTag);
  // drawgrid();
}

function eatFood() {
  if (snake.snakeArr[0].x == randx && snake.snakeArr[0].y == randy) {
    while (snake.snakeArr.find((a) => a.x === randx && a.y === randy)) {
      randx = Math.round(Math.random() * canvasWdith);
      randy = Math.round(Math.random() * canvasHeight);
    }
    return true;
  }
  return false;
}

function drawFood() {
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

function drawUI() {
  if (paused) {
    context.fillStyle = "rgba(0,0,0,0.6)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#fff";
    context.font = "bold 40px Arial";
    var text = "Paused!";
    var textWidth = context.measureText(text).width;
    context.fillText(text, (canvas.width - textWidth) / 2, canvas.height / 2);
  }

  context.fillStyle = "#000";
  context.font = "16px Arial";
  var text = `score:  ${snake.snakeArr.length + snake.eatenArr.length - 4}`;
  context.fillText(text, 10, canvas.height - 10);
}

function draw() {
  // clear
  context.clearRect(0, 0, canvas.width, canvas.height);

  // draw
  drawFood();
  display.innerHTML = "";

  snake.drawSnake();
  drawUI();
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

// 83 each second
function startGame() {
  intervalId = setInterval(() => {
    snake.speed = 8;
    let currTime = Date.now();
    deltaTime = currTime - startTime;
    startTime = currTime;
    gameLoop();
    draw();
    _test__WEBPACK_IMPORTED_MODULE_0__["default"].hiFunction();
  }, 10);
}

function stopGame() {
  clearInterval(intervalId);
  paused = true;
}

// Add an event listener for visibilitychange
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Stop the interval and reset deltaTime when tab is hidden
    stopGame();
  } else {
    // Restart the interval when tab is visible again
    startGame();
  }
});

// Start the game loop
startGame();


/***/ }),

/***/ "./src/test.js":
/*!*********************!*\
  !*** ./src/test.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function hiFunction() {
  console.log("hi");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hiFunction);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/snake.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLGlFQUFlLHFCQUF1Qix5Q0FBeUM7Ozs7Ozs7Ozs7Ozs7QUNBckQ7QUFDeUI7QUFDbkQ7QUFDQSxpREFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixnREFBZ0Q7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QiwrQkFBK0I7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixrRUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsa0JBQWtCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsbUJBQW1CO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0Esc0JBQXNCLE9BQU87QUFDN0I7QUFDQSxzQkFBc0IsV0FBVyxNQUFNO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixrREFBa0Q7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksd0RBQWU7QUFDbkIsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN4cEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsVUFBVSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc25ha2VfZ2FtZS8uL3NyYy9pbWFnZXMvc25ha2UtZ3JhcGhpY3MucG5nIiwid2VicGFjazovL3NuYWtlX2dhbWUvLi9zcmMvc25ha2UuanMiLCJ3ZWJwYWNrOi8vc25ha2VfZ2FtZS8uL3NyYy90ZXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJiODhhY2QzN2RhZWJmMGQxOTBlNjhhODFiZjJhYjFmZS5wbmdcIjsiLCJpbXBvcnQgdGVzdCBmcm9tIFwiLi90ZXN0XCI7XHJcbmltcG9ydCBzbmFrZUltZyBmcm9tIFwiLi9pbWFnZXMvc25ha2UtZ3JhcGhpY3MucG5nXCI7XHJcblxyXG50ZXN0KCk7XHJcblxyXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG5jYW52YXMud2lkdGggPSA0MDA7XHJcbmNhbnZhcy5oZWlnaHQgPSA1MDA7XHJcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcclxuY29uc3QgZGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlzcGxheVwiKTtcclxuY29uc3Qgc2NvcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjb3JlXCIpO1xyXG52YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG5jb25zb2xlLmxvZyhjb250ZXh0KTtcclxuXHJcbmxldCBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xyXG5sZXQgZGVsdGFUaW1lID0gRGF0ZS5ub3coKTtcclxubGV0IGFjY0Rpc3RhbmNlID0gMDtcclxubGV0IHggPSAzO1xyXG5sZXQgeSA9IDE7XHJcbmxldCBkaXIgPSBcIkFycm93UmlnaHRcIjtcclxubGV0IHNjYWxlID0gMjA7XHJcbmxldCB1c2VySW5wdXRzID0gW107XHJcbmxldCBwYXVzZWQgPSBmYWxzZTtcclxuXHJcbmNsYXNzIFZlY3RvciB7XHJcbiAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7XHJcbiAgfVxyXG4gIG1EaXN0YW5jZShvdGhlclBvcykge1xyXG4gICAgcmV0dXJuIE1hdGguYWJzKG90aGVyUG9zLnggLSB0aGlzLngpICsgTWF0aC5hYnMob3RoZXJQb3MueSAtIHRoaXMueSk7XHJcbiAgfVxyXG59XHJcblxyXG5sZXQgdmVjdG9yID0gbmV3IFZlY3RvcigzLCAxKTtcclxuXHJcbmNsYXNzIFNuYWtlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuaW1nID0gbnVsbDtcclxuICAgIHRoaXMuZGlyZWN0b24gPSBcIkFycm93UmlnaHRcIjtcclxuICAgIHRoaXMuc3BlZWQgPSA4O1xyXG4gICAgdGhpcy50YWlsRGlyZWN0aW9uID0gbnVsbDtcclxuICAgIHRoaXMuc25ha2VBcnIgPSBbXHJcbiAgICAgIG5ldyBWZWN0b3IoMywgMSksXHJcbiAgICAgIG5ldyBWZWN0b3IoMiwgMSksXHJcbiAgICAgIG5ldyBWZWN0b3IoMSwgMSksXHJcbiAgICAgIG5ldyBWZWN0b3IoMCwgMSksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5lYXRlbkFyciA9IFtdO1xyXG4gICAgdGhpcy5leHRlbmRUYWlsID0gbnVsbDtcclxuICB9XHJcbiAgcmVzZXRTbmFrZSgpIHtcclxuICAgIGRpciA9IFwiQXJyb3dSaWdodFwiO1xyXG4gICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgfVxyXG4gIG9uVXBkYXRlKCkge1xyXG4gICAgcHJldlggPSBzbmFrZS5zbmFrZUFyclswXS54O1xyXG4gICAgcHJldlkgPSBzbmFrZS5zbmFrZUFyclswXS55O1xyXG4gICAgY29uc3QgZGlzdGFuY2UgPSAoZGVsdGFUaW1lIC8gMTAwMCkgKiBzbmFrZS5zcGVlZDtcclxuICAgIGFjY0Rpc3RhbmNlICs9IGRpc3RhbmNlO1xyXG4gICAgaWYgKGFjY0Rpc3RhbmNlID4gMSkge1xyXG4gICAgICAvLyBmb3IobGV0IGkgPSAwOyBpKVxyXG4gICAgICB0aGlzLmNvbnRyb2xzKCk7XHJcbiAgICAgIGlmIChwYXVzZWQpIHJldHVybjtcclxuICAgICAgc3dpdGNoIChzbmFrZS5kaXJlY3Rvbikge1xyXG4gICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XHJcbiAgICAgICAgICBwcmV2WSAtPSAxO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIkFycm93RG93blwiOlxyXG4gICAgICAgICAgcHJldlkgKz0gMTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XHJcbiAgICAgICAgICBwcmV2WCArPSAxO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxyXG4gICAgICAgICAgcHJldlggLT0gMTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgLy9sb29wIGFnYWluIGZyb20gdGhlIG90aGVyIHNpZGUgb2YgY2FudmFzXHJcbiAgICAgIGlmIChjYW52YXMuaGVpZ2h0IC8gc2NhbGUgPD0gcHJldlkpIHtcclxuICAgICAgICBwcmV2WSA9IDA7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKDAgPiBwcmV2WSkge1xyXG4gICAgICAgIHByZXZZID0gY2FudmFzSGVpZ2h0O1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjYW52YXMud2lkdGggLyBzY2FsZSA8PSBwcmV2WCkge1xyXG4gICAgICAgIHByZXZYID0gMDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoMCA+IHByZXZYKSB7XHJcbiAgICAgICAgcHJldlggPSBjYW52YXNXZGl0aDtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IG5ld1BvcyA9IG5ldyBWZWN0b3IocHJldlgsIHByZXZZKTtcclxuICAgICAgaWYgKGdhbWVPdmVyKG5ld1BvcykpIHtcclxuICAgICAgICAvLyBhbGVydChcIkdhbWUgb3ZlclwiKTtcclxuICAgICAgICBzbmFrZS5yZXNldFNuYWtlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc25ha2Uuc25ha2VBcnIucG9wKCk7XHJcbiAgICAgICAgc25ha2Uuc25ha2VBcnIudW5zaGlmdChuZXdQb3MpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChlYXRGb29kKCkpIHtcclxuICAgICAgICBzbmFrZS5lYXRlbkFyci5wdXNoKHsgeDogc25ha2Uuc25ha2VBcnJbMF0ueCwgeTogc25ha2Uuc25ha2VBcnJbMF0ueSB9KTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoc25ha2UuZXh0ZW5kVGFpbCkge1xyXG4gICAgICAgIHNuYWtlLnNuYWtlQXJyLnB1c2goc25ha2UuZXh0ZW5kVGFpbCk7XHJcbiAgICAgICAgc25ha2UuZXh0ZW5kVGFpbCA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgbGV0IHRhaWwgPSBzbmFrZS5zbmFrZUFycltzbmFrZS5zbmFrZUFyci5sZW5ndGggLSAxXTtcclxuXHJcbiAgICAgIGlmIChzbmFrZS5lYXRlbkFyci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgaWYgKHRhaWwubURpc3RhbmNlKHNuYWtlLmVhdGVuQXJyWzBdKSA9PT0gMCkge1xyXG4gICAgICAgICAgc25ha2UuZXh0ZW5kVGFpbCA9IHNuYWtlLmVhdGVuQXJyWzBdO1xyXG4gICAgICAgICAgc25ha2UuZWF0ZW5BcnIgPSBzbmFrZS5lYXRlbkFyci5zbGljZSgxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgYWNjRGlzdGFuY2UgLT0gMTtcclxuICAgIH1cclxuICB9XHJcbiAgY29udHJvbHMoKSB7XHJcbiAgICBsZXQgZmlyc3RLZXkgPSB1c2VySW5wdXRzLnNoaWZ0KCk7XHJcbiAgICBzd2l0Y2ggKGZpcnN0S2V5KSB7XHJcbiAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XHJcbiAgICAgICAgaWYgKHNuYWtlLmRpcmVjdG9uICE9PSBcIkFycm93RG93blwiKSB7XHJcbiAgICAgICAgICBzbmFrZS5kaXJlY3RvbiA9IGZpcnN0S2V5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIkFycm93RG93blwiOlxyXG4gICAgICAgIGlmIChzbmFrZS5kaXJlY3RvbiAhPT0gXCJBcnJvd1VwXCIpIHtcclxuICAgICAgICAgIHNuYWtlLmRpcmVjdG9uID0gZmlyc3RLZXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxyXG4gICAgICAgIGlmIChzbmFrZS5kaXJlY3RvbiAhPT0gXCJBcnJvd0xlZnRcIikge1xyXG4gICAgICAgICAgc25ha2UuZGlyZWN0b24gPSBmaXJzdEtleTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcclxuICAgICAgICBpZiAoc25ha2UuZGlyZWN0b24gIT09IFwiQXJyb3dSaWdodFwiKSB7XHJcbiAgICAgICAgICBzbmFrZS5kaXJlY3RvbiA9IGZpcnN0S2V5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIiBcIjpcclxuICAgICAgICBhY2NEaXN0YW5jZSA9IDA7XHJcbiAgICAgICAgcGF1c2VkID0gIXBhdXNlZDtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbiAgc25ha2VHcmFwaGljcyhib2R5UGFydERpcmVjdG9uLCB4LCB5KSB7XHJcbiAgICBzd2l0Y2ggKGJvZHlQYXJ0RGlyZWN0b24pIHtcclxuICAgICAgY2FzZSBcImhlYWRBcnJvd1JpZ2h0XCI6XHJcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoXHJcbiAgICAgICAgICBzbmFrZS5pbWcsXHJcbiAgICAgICAgICAyNTUsXHJcbiAgICAgICAgICAtMixcclxuICAgICAgICAgIDY1LFxyXG4gICAgICAgICAgNjUsXHJcbiAgICAgICAgICB4ICogc2NhbGUgKyBzY2FsZSAvIDIgLSAxMCxcclxuICAgICAgICAgIHkgKiBzY2FsZSArIHNjYWxlIC8gMiAtIDExLFxyXG4gICAgICAgICAgc2NhbGUsXHJcbiAgICAgICAgICBzY2FsZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJoZWFkQXJyb3dMZWZ0XCI6XHJcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoXHJcbiAgICAgICAgICBzbmFrZS5pbWcsXHJcbiAgICAgICAgICAxOTAsXHJcbiAgICAgICAgICA2NC41LFxyXG4gICAgICAgICAgNjMsXHJcbiAgICAgICAgICA2MyxcclxuICAgICAgICAgIHggKiBzY2FsZSArIHNjYWxlIC8gMiAtIDEwLFxyXG4gICAgICAgICAgeSAqIHNjYWxlICsgc2NhbGUgLyAyIC0gMTAsXHJcbiAgICAgICAgICBzY2FsZSxcclxuICAgICAgICAgIHNjYWxlXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImhlYWRBcnJvd1VwXCI6XHJcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoXHJcbiAgICAgICAgICBzbmFrZS5pbWcsXHJcbiAgICAgICAgICAxOTAsXHJcbiAgICAgICAgICAwLFxyXG4gICAgICAgICAgNjUsXHJcbiAgICAgICAgICA2NSxcclxuICAgICAgICAgIHggKiBzY2FsZSArIHNjYWxlIC8gMiAtIDEwLFxyXG4gICAgICAgICAgeSAqIHNjYWxlICsgc2NhbGUgLyAyIC0gMTAsXHJcbiAgICAgICAgICBzY2FsZSxcclxuICAgICAgICAgIHNjYWxlXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImhlYWRBcnJvd0Rvd25cIjpcclxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICAgIHNuYWtlLmltZyxcclxuICAgICAgICAgIDI1OCxcclxuICAgICAgICAgIDY0LFxyXG4gICAgICAgICAgNjUsXHJcbiAgICAgICAgICA2NSxcclxuICAgICAgICAgIHggKiBzY2FsZSArIHNjYWxlIC8gMiAtIDEwLFxyXG4gICAgICAgICAgeSAqIHNjYWxlICsgc2NhbGUgLyAyIC0gMTAsXHJcbiAgICAgICAgICBzY2FsZSxcclxuICAgICAgICAgIHNjYWxlXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImJvZHlZYXhpc1wiOlxyXG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKFxyXG4gICAgICAgICAgc25ha2UuaW1nLFxyXG4gICAgICAgICAgMTI1LFxyXG4gICAgICAgICAgNjAsXHJcbiAgICAgICAgICA2NSxcclxuICAgICAgICAgIDY1LFxyXG4gICAgICAgICAgeCAqIHNjYWxlICsgc2NhbGUgLyAyIC0gMTEuMSxcclxuICAgICAgICAgIHNuYWtlLnNuYWtlQXJyWzBdLnkgPCBzbmFrZS5zbmFrZUFyclsxXS55XHJcbiAgICAgICAgICAgID8geSAqIHNjYWxlICsgc2NhbGUgLyAyIC0gMTBcclxuICAgICAgICAgICAgOiB5ICogc2NhbGUgKyBzY2FsZSAvIDIgLSAxMCxcclxuICAgICAgICAgIHNjYWxlLFxyXG4gICAgICAgICAgc2NhbGVcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiYm9keVhheGlzXCI6XHJcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoXHJcbiAgICAgICAgICBzbmFrZS5pbWcsXHJcbiAgICAgICAgICA2MCxcclxuICAgICAgICAgIDAsXHJcbiAgICAgICAgICA2NSxcclxuICAgICAgICAgIDY1LFxyXG4gICAgICAgICAgc25ha2Uuc25ha2VBcnJbMF0ueCA+IHNuYWtlLnNuYWtlQXJyWzFdLnhcclxuICAgICAgICAgICAgPyB4ICogc2NhbGUgKyBzY2FsZSAvIDIgLSAxMCAvL2dvZXMgbGVmdFxyXG4gICAgICAgICAgICA6IHggKiBzY2FsZSArIHNjYWxlIC8gMiAtIDEwLCAvLyBnb2VzIHJpZ2h0XHJcbiAgICAgICAgICB5ICogc2NhbGUgKyBzY2FsZSAvIDIgLSAxMCxcclxuICAgICAgICAgIHNjYWxlLFxyXG4gICAgICAgICAgc2NhbGVcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiYm9keVJpZ2h0VXBDb3JuZXJcIjpcclxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICAgIHNuYWtlLmltZyxcclxuICAgICAgICAgIDEyNSxcclxuICAgICAgICAgIDAsXHJcbiAgICAgICAgICA2NSxcclxuICAgICAgICAgIDY1LFxyXG4gICAgICAgICAgeCAqIHNjYWxlICsgc2NhbGUgLyAyIC0gMTEsXHJcbiAgICAgICAgICB5ICogc2NhbGUgKyBzY2FsZSAvIDIgLSAxMCxcclxuICAgICAgICAgIHNjYWxlLFxyXG4gICAgICAgICAgc2NhbGVcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiYm9keUxlZnRVcENvcm5lclwiOlxyXG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKFxyXG4gICAgICAgICAgc25ha2UuaW1nLFxyXG4gICAgICAgICAgMCxcclxuICAgICAgICAgIDAsXHJcbiAgICAgICAgICA2NSxcclxuICAgICAgICAgIDY1LFxyXG4gICAgICAgICAgeCAqIHNjYWxlICsgc2NhbGUgLyAyIC0gMTAsXHJcbiAgICAgICAgICB5ICogc2NhbGUgKyBzY2FsZSAvIDIgLSAxMCxcclxuICAgICAgICAgIHNjYWxlLFxyXG4gICAgICAgICAgc2NhbGVcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiYm9keUxlZnREb3duQ29ybmVyXCI6XHJcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoXHJcbiAgICAgICAgICBzbmFrZS5pbWcsXHJcbiAgICAgICAgICAwLFxyXG4gICAgICAgICAgNjIsXHJcbiAgICAgICAgICA2NSxcclxuICAgICAgICAgIDY1LFxyXG4gICAgICAgICAgc25ha2Uuc25ha2VBcnJbMF0ueCA+IHNuYWtlLnNuYWtlQXJyWzFdLnhcclxuICAgICAgICAgICAgPyB4ICogc2NhbGUgKyBzY2FsZSAvIDIgLSAxMCAvL3R1cm5zIHJpZ2h0XHJcbiAgICAgICAgICAgIDogeCAqIHNjYWxlICsgc2NhbGUgLyAyIC0gOS41LCAvLyB0dXJucyB1cFxyXG4gICAgICAgICAgeSAqIHNjYWxlICsgc2NhbGUgLyAyIC0gMTAsXHJcbiAgICAgICAgICBzY2FsZSxcclxuICAgICAgICAgIHNjYWxlXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImJvZHlSaWdodERvd25Db3JuZXJcIjpcclxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICAgIHNuYWtlLmltZyxcclxuICAgICAgICAgIDEyNSxcclxuICAgICAgICAgIDEyNSxcclxuICAgICAgICAgIDY1LFxyXG4gICAgICAgICAgNjUsXHJcbiAgICAgICAgICB4ICogc2NhbGUgKyBzY2FsZSAvIDIgLSAxMSxcclxuICAgICAgICAgIHkgKiBzY2FsZSArIHNjYWxlIC8gMiAtIDExLFxyXG4gICAgICAgICAgc2NhbGUsXHJcbiAgICAgICAgICBzY2FsZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJ0YWlsQXJyb3dSaWdodFwiOlxyXG4gICAgICAgIC8vdGFpbCByaWdodCxcclxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICAgIHNuYWtlLmltZyxcclxuICAgICAgICAgIDI2MSxcclxuICAgICAgICAgIDEzMCxcclxuICAgICAgICAgIDY1LFxyXG4gICAgICAgICAgNjUsXHJcbiAgICAgICAgICB4ICogc2NhbGUgKyBzY2FsZSAvIDIgLSAwLFxyXG4gICAgICAgICAgeSAqIHNjYWxlICsgc2NhbGUgLyAyIC0gOSxcclxuICAgICAgICAgIHNjYWxlLFxyXG4gICAgICAgICAgc2NhbGVcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBcInRhaWxBcnJvd0xlZnRcIjpcclxuICAgICAgICAvL3RhaWwgbGVmdCxcclxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICAgIHNuYWtlLmltZyxcclxuICAgICAgICAgIDE5MCxcclxuICAgICAgICAgIDE5NSxcclxuICAgICAgICAgIDY1LFxyXG4gICAgICAgICAgNjUsXHJcbiAgICAgICAgICB4ICogc2NhbGUgKyBzY2FsZSAvIDIgLSAxMC41LFxyXG4gICAgICAgICAgeSAqIHNjYWxlICsgc2NhbGUgLyAyIC0gOSxcclxuICAgICAgICAgIHNjYWxlLFxyXG4gICAgICAgICAgc2NhbGVcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwidGFpbEFycm93VXBcIjpcclxuICAgICAgICAvL3RhaWwgdXBcclxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICAgIHNuYWtlLmltZyxcclxuICAgICAgICAgIDE5MCxcclxuICAgICAgICAgIDEzMCxcclxuICAgICAgICAgIDY1LFxyXG4gICAgICAgICAgNjUsXHJcbiAgICAgICAgICB4ICogc2NhbGUgKyBzY2FsZSAvIDIgLSAxMC41LFxyXG4gICAgICAgICAgeSAqIHNjYWxlICsgc2NhbGUgLyAyIC0gMTAsXHJcbiAgICAgICAgICBzY2FsZSxcclxuICAgICAgICAgIHNjYWxlXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInRhaWxBcnJvd0Rvd25cIjpcclxuICAgICAgICAvL3RhaWwgZG93blxyXG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKFxyXG4gICAgICAgICAgc25ha2UuaW1nLFxyXG4gICAgICAgICAgMjYxLFxyXG4gICAgICAgICAgMTk1LFxyXG4gICAgICAgICAgNjUsXHJcbiAgICAgICAgICA2NSxcclxuICAgICAgICAgIHggKiBzY2FsZSArIHNjYWxlIC8gMiAtIDguNSxcclxuICAgICAgICAgIHkgKiBzY2FsZSArIHNjYWxlIC8gMiAtIDgsXHJcbiAgICAgICAgICBzY2FsZSxcclxuICAgICAgICAgIHNjYWxlXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbiAgZHJhd1NuYWtlKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHNuYWtlLnNuYWtlQXJyLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBsZXQgZWxlbWVudCA9IHNuYWtlLnNuYWtlQXJyW2luZGV4XTtcclxuICAgICAgbGV0IGFyciA9IHNuYWtlLnNuYWtlQXJyO1xyXG4gICAgICBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgICAvL2hlYWRcclxuICAgICAgICBsZXQgcHJldlN0YXRlID0gZ2V0T3RoZXJQYXJ0RGlyKGVsZW1lbnQsIGFycltpbmRleCArIDFdKTtcclxuICAgICAgICBpZiAocHJldlN0YXRlID09PSBcImxlZnRcIikge1xyXG4gICAgICAgICAgdGhpcy5zbmFrZUdyYXBoaWNzKFwiaGVhZEFycm93UmlnaHRcIiwgZWxlbWVudC54LCBlbGVtZW50LnkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocHJldlN0YXRlID09PSBcInJpZ2h0XCIpIHtcclxuICAgICAgICAgIHRoaXMuc25ha2VHcmFwaGljcyhcImhlYWRBcnJvd0xlZnRcIiwgZWxlbWVudC54LCBlbGVtZW50LnkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocHJldlN0YXRlID09PSBcInVwXCIpIHtcclxuICAgICAgICAgIHRoaXMuc25ha2VHcmFwaGljcyhcImhlYWRBcnJvd0Rvd25cIiwgZWxlbWVudC54LCBlbGVtZW50LnkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocHJldlN0YXRlID09PSBcImRvd25cIikge1xyXG4gICAgICAgICAgdGhpcy5zbmFrZUdyYXBoaWNzKFwiaGVhZEFycm93VXBcIiwgZWxlbWVudC54LCBlbGVtZW50LnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gc25ha2Uuc25ha2VBcnIubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgIC8vdGFpbFxyXG4gICAgICAgIGxldCBuZXh0U3RhdGUgPSBnZXRPdGhlclBhcnREaXIoZWxlbWVudCwgYXJyW2luZGV4IC0gMV0pO1xyXG4gICAgICAgIHNuYWtlLnRhaWxEaXJlY3Rpb24gPSBuZXh0U3RhdGU7XHJcbiAgICAgICAgaWYgKG5leHRTdGF0ZSA9PT0gXCJyaWdodFwiKVxyXG4gICAgICAgICAgdGhpcy5zbmFrZUdyYXBoaWNzKFwidGFpbEFycm93UmlnaHRcIiwgZWxlbWVudC54LCBlbGVtZW50LnkpO1xyXG4gICAgICAgIGVsc2UgaWYgKG5leHRTdGF0ZSA9PT0gXCJsZWZ0XCIpXHJcbiAgICAgICAgICB0aGlzLnNuYWtlR3JhcGhpY3MoXCJ0YWlsQXJyb3dMZWZ0XCIsIGVsZW1lbnQueCwgZWxlbWVudC55KTtcclxuICAgICAgICBlbHNlIGlmIChuZXh0U3RhdGUgPT09IFwidXBcIilcclxuICAgICAgICAgIHRoaXMuc25ha2VHcmFwaGljcyhcInRhaWxBcnJvd1VwXCIsIGVsZW1lbnQueCwgZWxlbWVudC55KTtcclxuICAgICAgICBlbHNlIGlmIChuZXh0U3RhdGUgPT09IFwiZG93blwiKVxyXG4gICAgICAgICAgdGhpcy5zbmFrZUdyYXBoaWNzKFwidGFpbEFycm93RG93blwiLCBlbGVtZW50LngsIGVsZW1lbnQueSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXggPCBzbmFrZS5zbmFrZUFyci5sZW5ndGggLSAxICYmIGluZGV4ID4gMCkge1xyXG4gICAgICAgIC8vIGJvZHlcclxuICAgICAgICBsZXQgcHJldlN0YXRlID0gZ2V0T3RoZXJQYXJ0RGlyKGVsZW1lbnQsIGFycltpbmRleCArIDFdKTtcclxuICAgICAgICBsZXQgbmV4dFN0YXRlID0gZ2V0T3RoZXJQYXJ0RGlyKGVsZW1lbnQsIGFycltpbmRleCAtIDFdKTtcclxuXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgKHByZXZTdGF0ZSA9PT0gXCJ1cFwiICYmIG5leHRTdGF0ZSA9PT0gXCJkb3duXCIpIHx8XHJcbiAgICAgICAgICAocHJldlN0YXRlID09PSBcImRvd25cIiAmJiBuZXh0U3RhdGUgPT09IFwidXBcIikgfHxcclxuICAgICAgICAgIChwcmV2U3RhdGUgPT09IFwiZG93blwiICYmIG5leHRTdGF0ZSA9PT0gXCJkb3duXCIpIHx8XHJcbiAgICAgICAgICAocHJldlN0YXRlID09PSBcInVwXCIgJiYgbmV4dFN0YXRlID09PSBcInVwXCIpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAvLyBkb3duXHJcbiAgICAgICAgICB0aGlzLnNuYWtlR3JhcGhpY3MoXCJib2R5WWF4aXNcIiwgZWxlbWVudC54LCBlbGVtZW50LnkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAocHJldlN0YXRlID09PSBcImxlZnRcIiAmJiBuZXh0U3RhdGUgPT09IFwicmlnaHRcIikgfHxcclxuICAgICAgICAgIChwcmV2U3RhdGUgPT09IFwibGVmdFwiICYmIG5leHRTdGF0ZSA9PT0gXCJsZWZ0XCIpIHx8XHJcbiAgICAgICAgICAocHJldlN0YXRlID09PSBcInJpZ2h0XCIgJiYgbmV4dFN0YXRlID09PSBcInJpZ2h0XCIpIHx8XHJcbiAgICAgICAgICAocHJldlN0YXRlID09PSBcInJpZ2h0XCIgJiYgbmV4dFN0YXRlID09PSBcImxlZnRcIilcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHRoaXMuc25ha2VHcmFwaGljcyhcImJvZHlYYXhpc1wiLCBlbGVtZW50LngsIGVsZW1lbnQueSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgIChwcmV2U3RhdGUgPT09IFwiZG93blwiICYmIG5leHRTdGF0ZSA9PT0gXCJyaWdodFwiKSB8fFxyXG4gICAgICAgICAgKHByZXZTdGF0ZSA9PT0gXCJyaWdodFwiICYmIG5leHRTdGF0ZSA9PT0gXCJkb3duXCIpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAvLyBsZWZ0IFVwIGNvcm5lclxyXG4gICAgICAgICAgdGhpcy5zbmFrZUdyYXBoaWNzKFwiYm9keUxlZnRVcENvcm5lclwiLCBlbGVtZW50LngsIGVsZW1lbnQueSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgIChwcmV2U3RhdGUgPT09IFwiZG93blwiICYmIG5leHRTdGF0ZSA9PT0gXCJsZWZ0XCIpIHx8XHJcbiAgICAgICAgICAocHJldlN0YXRlID09PSBcImxlZnRcIiAmJiBuZXh0U3RhdGUgPT09IFwiZG93blwiKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgLy8gcmlnaHQgdXAgY29ybmVyXHJcbiAgICAgICAgICB0aGlzLnNuYWtlR3JhcGhpY3MoXCJib2R5UmlnaHRVcENvcm5lclwiLCBlbGVtZW50LngsIGVsZW1lbnQueSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgIChwcmV2U3RhdGUgPT09IFwidXBcIiAmJiBuZXh0U3RhdGUgPT09IFwicmlnaHRcIikgfHxcclxuICAgICAgICAgIChwcmV2U3RhdGUgPT09IFwicmlnaHRcIiAmJiBuZXh0U3RhdGUgPT09IFwidXBcIilcclxuICAgICAgICApIHtcclxuICAgICAgICAgIC8vIGRvd24gbGVmdCBjb3JuZXJcclxuICAgICAgICAgIHRoaXMuc25ha2VHcmFwaGljcyhcImJvZHlMZWZ0RG93bkNvcm5lclwiLCBlbGVtZW50LngsIGVsZW1lbnQueSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgIChwcmV2U3RhdGUgPT09IFwidXBcIiAmJiBuZXh0U3RhdGUgPT09IFwibGVmdFwiKSB8fFxyXG4gICAgICAgICAgKHByZXZTdGF0ZSA9PT0gXCJsZWZ0XCIgJiYgbmV4dFN0YXRlID09PSBcInVwXCIpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAvLyBkb3duIHJpZ2h0IGNvcm5lclxyXG4gICAgICAgICAgdGhpcy5zbmFrZUdyYXBoaWNzKFwiYm9keVJpZ2h0RG93bkNvcm5lclwiLCBlbGVtZW50LngsIGVsZW1lbnQueSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHNuYWtlRGVidWcoZWxlbWVudCwgaW5kZXgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxubGV0IHNuYWtlID0gbmV3IFNuYWtlKCk7XHJcbnNuYWtlLmltZyA9IG5ldyBJbWFnZSgpO1xyXG5zbmFrZS5pbWcuc3JjID0gc25ha2VJbWc7XHJcblxyXG5jbGFzcyBBcHBsZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG59XHJcblxyXG5sZXQgcHJldlggPSBzbmFrZS5zbmFrZUFyclswXS54O1xyXG5sZXQgcHJldlkgPSBzbmFrZS5zbmFrZUFyclswXS55O1xyXG5sZXQgcmFuZHggPSBNYXRoLnJvdW5kKChNYXRoLnJhbmRvbSgpICogY2FudmFzLndpZHRoKSAvIHNjYWxlIC0gMSk7XHJcbmxldCByYW5keSA9IE1hdGgucm91bmQoKE1hdGgucmFuZG9tKCkgKiBjYW52YXMuaGVpZ2h0KSAvIHNjYWxlIC0gMSk7XHJcbmNvbnN0IGNhbnZhc1dkaXRoID0gTWF0aC5mbG9vcihjYW52YXMud2lkdGggLyBzY2FsZSkgLSAxO1xyXG5jb25zdCBjYW52YXNIZWlnaHQgPSBNYXRoLmZsb29yKGNhbnZhcy5oZWlnaHQgLyBzY2FsZSkgLSAxO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2KSA9PiB7XHJcbiAgZGlyID0gZXYua2V5O1xyXG4gIGlmIChcclxuICAgIGV2LmtleSA9PSBcIkFycm93UmlnaHRcIiB8fFxyXG4gICAgZXYua2V5ID09IFwiQXJyb3dEb3duXCIgfHxcclxuICAgIGV2LmtleSA9PSBcIkFycm93TGVmdFwiIHx8XHJcbiAgICBldi5rZXkgPT0gXCJBcnJvd1VwXCIgfHxcclxuICAgIGV2LmtleSA9PSBcIiBcIlxyXG4gICkge1xyXG4gICAgaWYgKHVzZXJJbnB1dHMubGVuZ3RoID4gMikge1xyXG4gICAgICB1c2VySW5wdXRzID0gdXNlcklucHV0cy5zbGljZSgwLCAzKTtcclxuICAgIH1cclxuICAgIHVzZXJJbnB1dHMucHVzaChkaXIpO1xyXG4gIH1cclxufSk7XHJcblxyXG4vLyBsZXQgc3RhcnRZO1xyXG4vLyBsZXQgc3RhcnRYO1xyXG4vLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuLy8gICBzdGFydFkgPSBldmVudC50b3VjaGVzWzBdLmNsaWVudFk7XHJcbi8vICAgc3RhcnRYID0gZXZlbnQudG91Y2hlc1swXS5jbGllbnRYO1xyXG4vLyB9KTtcclxuXHJcbi8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbi8vICAgdmFyIGVuZFkgPSBldmVudC50b3VjaGVzWzBdLmNsaWVudFk7XHJcbi8vICAgdmFyIGVuZFggPSBldmVudC50b3VjaGVzWzBdLmNsaWVudFg7XHJcbi8vICAgdmFyIGRlbHRhWSA9IGVuZFkgLSBzdGFydFk7XHJcbi8vICAgdmFyIGRlbHRhWCA9IGVuZFggLSBzdGFydFg7XHJcbi8vICAgY29uc29sZS5sb2coTWF0aC5hYnMoZGVsdGFZLCBkZWx0YVgpKTtcclxuLy8gICBpZiAoTWF0aC5hYnMoZGVsdGFZID4gZGVsdGFYKSkge1xyXG4vLyAgICAgaWYgKGRlbHRhWSA+IDApIHtcclxuLy8gICAgICAgdXNlcklucHV0cy5wdXNoKFwiQXJyb3dEb3duXCIpO1xyXG4vLyAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgdXNlcklucHV0cy5wdXNoKFwiQXJyb3dVcFwiKTtcclxuLy8gICAgIH1cclxuLy8gICB9IGVsc2Uge1xyXG4vLyAgICAgaWYgKGRlbHRhWCA8IDApIHtcclxuLy8gICAgICAgdXNlcklucHV0cy5wdXNoKFwiQXJyb3dMZWZ0XCIpO1xyXG4vLyAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgdXNlcklucHV0cy5wdXNoKFwiQXJyb3dSaWdodFwiKTtcclxuLy8gICAgIH1cclxuLy8gICB9XHJcbi8vIH0pO1xyXG5cclxuZnVuY3Rpb24gZ2FtZU92ZXIobmV3UG9zKSB7XHJcbiAgY29uc3QgcmVzdE9mRWxlbWVudHMgPSBzbmFrZS5zbmFrZUFyci5zbGljZSgxKTtcclxuICBjb25zdCBpc1NhbWVJbmRleCA9IHJlc3RPZkVsZW1lbnRzLmZpbmQoXHJcbiAgICAoYSkgPT4gYS54ID09PSBuZXdQb3MueCAmJiBhLnkgPT09IG5ld1Bvcy55XHJcbiAgKTtcclxuICByZXR1cm4gaXNTYW1lSW5kZXg7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdhbWVMb29wKCkge1xyXG4gIHNuYWtlLm9uVXBkYXRlKCk7XHJcbn1cclxuXHJcbi8vIGZ1bmN0aW9uIG1EaXN0YW5jZShwb3MxLCBwb3MyKSB7XHJcbi8vICAgcmV0dXJuIE1hdGguYWJzKHBvczIueCAtIHBvczEueCkgKyBNYXRoLmFicyhwb3MyLnkgLSBwb3MxLnkpO1xyXG4vLyB9XHJcblxyXG5mdW5jdGlvbiBkcmF3Z3JpZCgpIHtcclxuICBjb250ZXh0LmxpbmVXaWR0aCA9IDE7XHJcbiAgdmFyIGdyaWRTaXplID0gMjA7XHJcbiAgZm9yIChsZXQgeCA9IGdyaWRTaXplOyB4IDwgY2FudmFzLndpZHRoOyB4ICs9IGdyaWRTaXplKSB7XHJcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgY29udGV4dC5tb3ZlVG8oeCwgMCk7XHJcbiAgICBjb250ZXh0LmxpbmVUbyh4LCBjYW52YXMuaGVpZ2h0KTtcclxuICAgIGNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgfVxyXG4gIGZvciAobGV0IHkgPSBncmlkU2l6ZTsgeSA8IGNhbnZhcy5oZWlnaHQ7IHkgKz0gZ3JpZFNpemUpIHtcclxuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICBjb250ZXh0Lm1vdmVUbygwLCB5KTtcclxuICAgIGNvbnRleHQubGluZVRvKGNhbnZhcy53aWR0aCwgeSk7XHJcbiAgICBjb250ZXh0LnN0cm9rZSgpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gdG8gZGVidWcgc25ha2UgZ3JhcGhpY3MgYW5kIGVhY2ggYXJyYXkgZWxlbWVudCBwb3NpdGlvblxyXG5mdW5jdGlvbiBzbmFrZURlYnVnKGVsZW1lbnQsIGluZGV4KSB7XHJcbiAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICBjb250ZXh0LmFyYyhcclxuICAgIGVsZW1lbnQueCAqIHNjYWxlICsgc2NhbGUgLyAyLFxyXG4gICAgZWxlbWVudC55ICogc2NhbGUgKyBzY2FsZSAvIDIsXHJcbiAgICBzY2FsZSAvIDIsXHJcbiAgICAwLFxyXG4gICAgMiAqIE1hdGguUElcclxuICApO1xyXG4gIGNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgbGV0IHBUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICBwVGFnLmlubmVyVGV4dCA9IGB4OiAke2VsZW1lbnQ/LnhcclxuICAgIC50b1N0cmluZygpXHJcbiAgICAucGFkU3RhcnQoMiwgXCIwXCIpfSwgeTogJHtlbGVtZW50Py55XHJcbiAgICAudG9TdHJpbmcoKVxyXG4gICAgLnBhZFN0YXJ0KDIsIFwiMFwiKX0sIGluZGV4OiAke2luZGV4fWA7XHJcbiAgZGlzcGxheS5hcHBlbmRDaGlsZChwVGFnKTtcclxuICAvLyBkcmF3Z3JpZCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBlYXRGb29kKCkge1xyXG4gIGlmIChzbmFrZS5zbmFrZUFyclswXS54ID09IHJhbmR4ICYmIHNuYWtlLnNuYWtlQXJyWzBdLnkgPT0gcmFuZHkpIHtcclxuICAgIHdoaWxlIChzbmFrZS5zbmFrZUFyci5maW5kKChhKSA9PiBhLnggPT09IHJhbmR4ICYmIGEueSA9PT0gcmFuZHkpKSB7XHJcbiAgICAgIHJhbmR4ID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogY2FudmFzV2RpdGgpO1xyXG4gICAgICByYW5keSA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIGNhbnZhc0hlaWdodCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3Rm9vZCgpIHtcclxuICBjb250ZXh0LmRyYXdJbWFnZShcclxuICAgIHNuYWtlLmltZyxcclxuICAgIDAsXHJcbiAgICAxOTAsXHJcbiAgICA2NSxcclxuICAgIDY1LFxyXG4gICAgcmFuZHggKiBzY2FsZSxcclxuICAgIHJhbmR5ICogc2NhbGUsXHJcbiAgICBzY2FsZSxcclxuICAgIHNjYWxlXHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd1VJKCkge1xyXG4gIGlmIChwYXVzZWQpIHtcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCJyZ2JhKDAsMCwwLDAuNilcIjtcclxuICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCIjZmZmXCI7XHJcbiAgICBjb250ZXh0LmZvbnQgPSBcImJvbGQgNDBweCBBcmlhbFwiO1xyXG4gICAgdmFyIHRleHQgPSBcIlBhdXNlZCFcIjtcclxuICAgIHZhciB0ZXh0V2lkdGggPSBjb250ZXh0Lm1lYXN1cmVUZXh0KHRleHQpLndpZHRoO1xyXG4gICAgY29udGV4dC5maWxsVGV4dCh0ZXh0LCAoY2FudmFzLndpZHRoIC0gdGV4dFdpZHRoKSAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyKTtcclxuICB9XHJcblxyXG4gIGNvbnRleHQuZmlsbFN0eWxlID0gXCIjMDAwXCI7XHJcbiAgY29udGV4dC5mb250ID0gXCIxNnB4IEFyaWFsXCI7XHJcbiAgdmFyIHRleHQgPSBgc2NvcmU6ICAke3NuYWtlLnNuYWtlQXJyLmxlbmd0aCArIHNuYWtlLmVhdGVuQXJyLmxlbmd0aCAtIDR9YDtcclxuICBjb250ZXh0LmZpbGxUZXh0KHRleHQsIDEwLCBjYW52YXMuaGVpZ2h0IC0gMTApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3KCkge1xyXG4gIC8vIGNsZWFyXHJcbiAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHJcbiAgLy8gZHJhd1xyXG4gIGRyYXdGb29kKCk7XHJcbiAgZGlzcGxheS5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICBzbmFrZS5kcmF3U25ha2UoKTtcclxuICBkcmF3VUkoKTtcclxufVxyXG5cclxubGV0IHNuYWtlT2JqID0ge1xyXG4gIGhlYWRVcDogWzE5MCwgLTIsIDY1LCA2NSwgMjAsIDIwLCAyMCwgMjBdLFxyXG4gIGhlYWRSaWdodDogWzI1NywgLTIsIDY1LCA2NSwgMjAsIDIwLCAyMCwgMjBdLFxyXG4gIGhlYWRMZWZ0OiBbMTkyLCA2NC41LCA2MywgNjMsIDIwLCAyMCwgMjAsIDIwXSxcclxuICBoZWFkRG93bjogWzI1OCwgNjQsIDY1LCA2NSwgMjAsIDIwLCAyMCwgMjBdLFxyXG4gIHRhaWxVcDogWzE5MCwgMTMwLCA2NSwgNjUsIDIwLCAyMCwgMjAsIDIwXSxcclxuICB0YWlsUmlnaHQ6IFsyNjEsIDEzMCwgNjUsIDY1LCAyMCwgMjAsIDIwLCAyMF0sXHJcbiAgdGFpbExlZnQ6IFsxOTAsIDE5NSwgNjUsIDY1LCAyMCwgMjAsIDIwLCAyMF0sXHJcbiAgdGFpbERvd246IFsyNjEsIDE5NSwgNjUsIDY1LCAyMCwgMjAsIDIwLCAyMF0sXHJcbiAgYm9keVJpZ2h0VXBDb3JuZXI6IFsxMjUsIDAsIDY1LCA2NSwgMjAsIDIwLCBzY2FsZSAqIDEwLCBzY2FsZSAqIDEwXSxcclxuICBib2R5UmlnaHREb3duQ29ybmVyOiBbMTI1LCAxMjUsIDY1LCA2NSwgMjAsIDIwLCBzY2FsZSAqIDEwLCBzY2FsZSAqIDEwXSxcclxuICBib2R5VXBMZWZ0Q29ybmVyOiBbMCwgMCwgNjUsIDY1LCAyMCwgMjAsIHNjYWxlICogMTAsIHNjYWxlICogMTBdLFxyXG4gIGJvZHlYYXhpczogWzYwLCAwLCA2NSwgNjUsIDIwLCAyMCwgc2NhbGUgKiAxMCwgc2NhbGUgKiAxMF0sXHJcbiAgYm9keVlheGlzOiBbMTI1LCA2MCwgNjUsIDY1LCAyMCwgMjAsIHNjYWxlICogMTAsIHNjYWxlICogMTBdLFxyXG4gIGJvZHlEb3duTGVmdENvcm5lcjogWzAsIDYyLCA2NSwgNjUsIDIwLCAyMCwgc2NhbGUgKiAxMCwgc2NhbGUgKiAxMF0sXHJcbn07XHJcblxyXG5mdW5jdGlvbiBnZXRPdGhlclBhcnREaXIob3JpZ2luYWwsIG90aGVyKSB7XHJcbiAgaWYgKG9yaWdpbmFsLnggPT09IG90aGVyLnggJiYgb3JpZ2luYWwueSA9PT0gb3RoZXIueSlcclxuICAgIHJldHVybiBzbmFrZS50YWlsRGlyZWN0aW9uO1xyXG4gIGlmIChvcmlnaW5hbC54ID09PSBvdGhlci54KSB7XHJcbiAgICBpZiAob3JpZ2luYWwueSA+IG90aGVyLnkgJiYgTWF0aC5hYnMob3JpZ2luYWwueSAtIG90aGVyLnkpID4gMSkge1xyXG4gICAgICByZXR1cm4gXCJkb3duXCI7XHJcbiAgICB9IGVsc2UgaWYgKG9yaWdpbmFsLnkgPCBvdGhlci55ICYmIE1hdGguYWJzKG9yaWdpbmFsLnkgLSBvdGhlci55KSA9PT0gMSkge1xyXG4gICAgICByZXR1cm4gXCJkb3duXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gXCJ1cFwiO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAob3JpZ2luYWwueCA+IG90aGVyLnggJiYgTWF0aC5hYnMob3JpZ2luYWwueCAtIG90aGVyLngpID4gMSkge1xyXG4gICAgICByZXR1cm4gXCJyaWdodFwiO1xyXG4gICAgfSBlbHNlIGlmIChvcmlnaW5hbC54IDwgb3RoZXIueCAmJiBNYXRoLmFicyhvcmlnaW5hbC54IC0gb3RoZXIueCkgPT09IDEpIHtcclxuICAgICAgcmV0dXJuIFwicmlnaHRcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBcImxlZnRcIjtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIDgzIGVhY2ggc2Vjb25kXHJcbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcclxuICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgc25ha2Uuc3BlZWQgPSA4O1xyXG4gICAgbGV0IGN1cnJUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIGRlbHRhVGltZSA9IGN1cnJUaW1lIC0gc3RhcnRUaW1lO1xyXG4gICAgc3RhcnRUaW1lID0gY3VyclRpbWU7XHJcbiAgICBnYW1lTG9vcCgpO1xyXG4gICAgZHJhdygpO1xyXG4gICAgdGVzdC5oaUZ1bmN0aW9uKCk7XHJcbiAgfSwgMTApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdG9wR2FtZSgpIHtcclxuICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xyXG4gIHBhdXNlZCA9IHRydWU7XHJcbn1cclxuXHJcbi8vIEFkZCBhbiBldmVudCBsaXN0ZW5lciBmb3IgdmlzaWJpbGl0eWNoYW5nZVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCAoKSA9PiB7XHJcbiAgaWYgKGRvY3VtZW50LmhpZGRlbikge1xyXG4gICAgLy8gU3RvcCB0aGUgaW50ZXJ2YWwgYW5kIHJlc2V0IGRlbHRhVGltZSB3aGVuIHRhYiBpcyBoaWRkZW5cclxuICAgIHN0b3BHYW1lKCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIFJlc3RhcnQgdGhlIGludGVydmFsIHdoZW4gdGFiIGlzIHZpc2libGUgYWdhaW5cclxuICAgIHN0YXJ0R2FtZSgpO1xyXG4gIH1cclxufSk7XHJcblxyXG4vLyBTdGFydCB0aGUgZ2FtZSBsb29wXHJcbnN0YXJ0R2FtZSgpO1xyXG4iLCJmdW5jdGlvbiBoaUZ1bmN0aW9uKCkge1xyXG4gIGNvbnNvbGUubG9nKFwiaGlcIik7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGhpRnVuY3Rpb247XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==