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
  init(canvas, context);
  snake.Inputs();

  function interval(timeStamp) {
    deltaTime = (timeStamp - oldTimestamp) / 1000;

    oldTimestamp = timeStamp;
    fps = Math.floor(1 / deltaTime);
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.onUpdate(deltaTime);
    snake.drawSnake();

    // gameloop(deltaTime);
    // drawLoop();
    window.requestAnimationFrame(interval);
  }
  window.requestAnimationFrame(interval);
};
