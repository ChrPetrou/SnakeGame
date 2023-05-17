import snakeSprite from "../images/snake-graphics.png";
import Vector from "../utils/Vector";

class Apple {
  constructor(ctx, canvas, snake) {
    this.img = new Image();
    this.img.src = snakeSprite;
    this.canvas = canvas;
    this.ctx = ctx;
    this.scale = 20;
    this.snake = snake;
    this.snake = snake;
    this.regenerate();
  }
  regenerate() {
    let x = Math.round(Math.random() * (this.canvas.width / this.scale - 1));
    let y = Math.round(Math.random() * (this.canvas.height / this.scale - 1));
    let pos = new Vector(x, y);
    if (this.snake.snakeArr.find((v) => v.mDistance(pos) === 0)) {
      this.regenerate();
      return;
    }
    console.log("APple", pos);
    this.pos = pos;
  }
  drawFood() {
    if (this.pos) {
      this.ctx.drawImage(
        this.img,
        0,
        190,
        65,
        65,
        this.pos.x * this.scale,
        this.pos.y * this.scale,
        this.scale,
        this.scale
      );
    }
  }
}

export default Apple;
