import Apple from "./gameObjects/Apple";
import Snake from "./gameObjects/Snake";
import { gameloop, drawLoop, init } from "./snake";

window.onload = function () {
  const canvas = document.createElement("canvas");
  const display = document.createElement("display");
  const score = document.createElement("score");
  canvas.width = 500;
  canvas.height = 400;
  document.body.appendChild(canvas);
  document.body.appendChild(display);
  document.body.appendChild(score);
  const context = canvas.getContext("2d");

  let oldTimestamp = 0;
  let deltaTime = 0;
  let fps = 0;
  let snake = new Snake(context, canvas);
  let apple = new Apple(context, canvas, snake);
  init(canvas, context);
  snake.Inputs();

  function drawUI() {
    if (snake.paused) {
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

  function interval(timeStamp) {
    deltaTime = (timeStamp - oldTimestamp) / 1000;

    oldTimestamp = timeStamp;
    fps = Math.floor(1 / deltaTime);
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.onUpdate(deltaTime, apple);
    snake.drawSnake();
    apple.drawFood();

    drawUI();
    // gameloop(deltaTime);
    // drawLoop();
    window.requestAnimationFrame(interval);
  }
  window.requestAnimationFrame(interval);
};
