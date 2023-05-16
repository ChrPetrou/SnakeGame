import Vector from "../utils/Vector";
import snakeSprite from "../images/snake-graphics.png";

class Snake {
  constructor(ctx, canvas) {
    this.img = new Image();
    this.img.src = snakeSprite;
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
    this.accDistance = 0;
    this.userInputs = [];
    this.canvas = canvas;
    this.ctx = ctx;
    this.paused = false;
    this.scale = 20;
  }

  resetSnake() {
    location.reload();
  }
  gameOver(newPos) {
    const restOfElements = this.snakeArr.slice(1);
    const isSameIndex = restOfElements.find(
      (a) => a.x === newPos.x && a.y === newPos.y
    );
    return isSameIndex;
  }

  onUpdate(deltaTime) {
    this.controls();
    if (this.paused) return;
    let prevX = this.snakeArr[0].x;
    let prevY = this.snakeArr[0].y;
    this.accDistance += deltaTime * this.speed;

    if (this.accDistance > 1) {
      switch (this.directon) {
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

      //loop again from the other side of this.canvas
      if (this.canvas.height / this.scale <= prevY) {
        prevY = 0;
      }
      if (0 > prevY) {
        prevY = Math.floor(this.canvas.height / this.scale);
      }
      if (this.canvas.width / this.scale <= prevX) {
        prevX = 0;
      }
      if (0 > prevX) {
        prevX = Math.floor(this.canvas.width / this.scale) - 1;
      }

      let newPos = new Vector(prevX, prevY);
      if (this.gameOver(newPos)) {
        // alert("Game over");
        this.resetSnake();
      } else {
        this.snakeArr.pop();
        this.snakeArr.unshift(newPos);
      }
      //   if (eatFood()) {
      //     this.eatenArr.push({ x: this.snakeArr[0].x, y: this.snakeArr[0].y });
      //   }
      if (this.extendTail) {
        this.snakeArr.push(this.extendTail);
        this.extendTail = null;
      }
      let tail = this.snakeArr[this.snakeArr.length - 1];

      if (this.eatenArr.length > 0) {
        if (tail.mDistance(this.eatenArr[0]) === 0) {
          this.extendTail = this.eatenArr[0];
          this.eatenArr = this.eatenArr.slice(1);
        }
      }
      this.accDistance -= 1;
    }
  }

  controls() {
    if (this.userInputs.length === 0) return;
    console.log(this.userInputs);
    let firstKey = this.userInputs.shift();
    console.log(firstKey);
    switch (firstKey) {
      case "ArrowUp":
        if (this.directon !== "ArrowDown") this.directon = firstKey;
        break;
      case "ArrowDown":
        if (this.directon !== "ArrowUp") this.directon = firstKey;
        break;
      case "ArrowRight":
        if (this.directon !== "ArrowLeft") this.directon = firstKey;
        break;
      case "ArrowLeft":
        if (this.directon !== "ArrowRight") this.directon = firstKey;
        break;
      case " ":
        this.paused = !this.paused;
        this.accDistance = 0;
        break;
    }
  }
  Inputs() {
    document.addEventListener("keydown", (ev) => {
      let dir = ev.key;

      if (
        ev.key == "ArrowRight" ||
        ev.key == "ArrowDown" ||
        ev.key == "ArrowLeft" ||
        ev.key == "ArrowUp" ||
        ev.key == " "
      ) {
        if (this.userInputs.length > 2) {
          this.userInputs = this.userInputs.slice(0, 3);
        }
        this.userInputs.push(dir);
      }
    });
  }
  snakeGraphics(bodyPartDirecton, x, y) {
    switch (bodyPartDirecton) {
      case "headArrowRight":
        this.ctx.drawImage(
          this.img,
          255,
          -2,
          65,
          65,
          x * this.scale + this.scale / 2 - 10,
          y * this.scale + this.scale / 2 - 11,
          this.scale,
          this.scale
        );
        break;
      case "headArrowLeft":
        this.ctx.drawImage(
          this.img,
          190,
          64.5,
          63,
          63,
          x * this.scale + this.scale / 2 - 10,
          y * this.scale + this.scale / 2 - 10,
          this.scale,
          this.scale
        );
        break;
      case "headArrowUp":
        this.ctx.drawImage(
          this.img,
          190,
          0,
          65,
          65,
          x * this.scale + this.scale / 2 - 10,
          y * this.scale + this.scale / 2 - 10,
          this.scale,
          this.scale
        );
        break;
      case "headArrowDown":
        this.ctx.drawImage(
          this.img,
          258,
          64,
          65,
          65,
          x * this.scale + this.scale / 2 - 10,
          y * this.scale + this.scale / 2 - 10,
          this.scale,
          this.scale
        );
        break;
      case "bodyYaxis":
        this.ctx.drawImage(
          this.img,
          125,
          60,
          65,
          65,
          x * this.scale + this.scale / 2 - 11.1,
          this.snakeArr[0].y < this.snakeArr[1].y
            ? y * this.scale + this.scale / 2 - 10
            : y * this.scale + this.scale / 2 - 10,
          this.scale,
          this.scale
        );
        break;
      case "bodyXaxis":
        this.ctx.drawImage(
          this.img,
          60,
          0,
          65,
          65,
          this.snakeArr[0].x > this.snakeArr[1].x
            ? x * this.scale + this.scale / 2 - 10 //goes left
            : x * this.scale + this.scale / 2 - 10, // goes right
          y * this.scale + this.scale / 2 - 10,
          this.scale,
          this.scale
        );
        break;
      case "bodyRightUpCorner":
        this.ctx.drawImage(
          this.img,
          125,
          0,
          65,
          65,
          x * this.scale + this.scale / 2 - 11,
          y * this.scale + this.scale / 2 - 10,
          this.scale,
          this.scale
        );
        break;
      case "bodyLeftUpCorner":
        this.ctx.drawImage(
          this.img,
          0,
          0,
          65,
          65,
          x * this.scale + this.scale / 2 - 10,
          y * this.scale + this.scale / 2 - 10,
          this.scale,
          this.scale
        );
        break;
      case "bodyLeftDownCorner":
        this.ctx.drawImage(
          this.img,
          0,
          62,
          65,
          65,
          this.snakeArr[0].x > this.snakeArr[1].x
            ? x * this.scale + this.scale / 2 - 10 //turns right
            : x * this.scale + this.scale / 2 - 9.5, // turns up
          y * this.scale + this.scale / 2 - 10,
          this.scale,
          this.scale
        );
        break;
      case "bodyRightDownCorner":
        this.ctx.drawImage(
          this.img,
          125,
          125,
          65,
          65,
          x * this.scale + this.scale / 2 - 11,
          y * this.scale + this.scale / 2 - 11,
          this.scale,
          this.scale
        );
        break;
      case "tailArrowRight":
        //tail right,
        this.ctx.drawImage(
          this.img,
          261,
          130,
          65,
          65,
          x * this.scale + this.scale / 2 - 0,
          y * this.scale + this.scale / 2 - 9,
          this.scale,
          this.scale
        );
        break;

      case "tailArrowLeft":
        //tail left,
        this.ctx.drawImage(
          this.img,
          190,
          195,
          65,
          65,
          x * this.scale + this.scale / 2 - 10.5,
          y * this.scale + this.scale / 2 - 9,
          this.scale,
          this.scale
        );
        break;
      case "tailArrowUp":
        //tail up
        this.ctx.drawImage(
          this.img,
          190,
          130,
          65,
          65,
          x * this.scale + this.scale / 2 - 10.5,
          y * this.scale + this.scale / 2 - 10,
          this.scale,
          this.scale
        );
        break;
      case "tailArrowDown":
        //tail down
        this.ctx.drawImage(
          this.img,
          261,
          195,
          65,
          65,
          x * this.scale + this.scale / 2 - 8.5,
          y * this.scale + this.scale / 2 - 8,
          this.scale,
          this.scale
        );
        break;
      default:
        break;
    }
  }
  drawSnake() {
    for (let index = 0; index < this.snakeArr.length; index++) {
      let element = this.snakeArr[index];
      let arr = this.snakeArr;
      if (index === 0) {
        //head
        let prevState = element.getDir(arr[index + 1]);
        if (prevState === "left") {
          this.snakeGraphics("headArrowRight", element.x, element.y);
        } else if (prevState === "right") {
          this.snakeGraphics("headArrowLeft", element.x, element.y);
        } else if (prevState === "up") {
          this.snakeGraphics("headArrowDown", element.x, element.y);
        } else if (prevState === "down") {
          this.snakeGraphics("headArrowUp", element.x, element.y);
        }
      } else if (index === this.snakeArr.length - 1) {
        //tail
        let nextState = element.getDir(arr[index - 1]);
        this.tailDirection = nextState;
        if (nextState === "right")
          this.snakeGraphics("tailArrowRight", element.x, element.y);
        else if (nextState === "left")
          this.snakeGraphics("tailArrowLeft", element.x, element.y);
        else if (nextState === "up")
          this.snakeGraphics("tailArrowUp", element.x, element.y);
        else if (nextState === "down")
          this.snakeGraphics("tailArrowDown", element.x, element.y);
      } else if (index < this.snakeArr.length - 1 && index > 0) {
        // body
        let prevState = element.getDir(arr[index + 1]);
        let nextState = element.getDir(arr[index - 1]);

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
      this.snakeDebug(element, index);
    }
  }
  snakeDebug(element, index) {
    this.ctx.beginPath();
    this.ctx.arc(
      element.x * this.scale + this.scale / 2,
      element.y * this.scale + this.scale / 2,
      this.scale / 2,
      0,
      2 * Math.PI
    );
    this.ctx.stroke();
    // if (index === 0) console.log(element.x, element.y);
    // let pTag = document.createElement("p");
    // if (pTag) {
    //   pTag.innerText = `x: ${element?.x
    //     .toString()
    //     .padStart(2, "0")}, y: ${element?.y
    //     .toString()
    //     .padStart(2, "0")}, index: ${index}`;
    //   display.appendChild(pTag);
    // }
    // drawgrid();
  }
}

export default Snake;
