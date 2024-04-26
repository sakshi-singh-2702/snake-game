function SnakeGame(maxX, maxY, spacing) {
  this.maxX = maxX;
  this.maxY = maxY;
  this.spacing = spacing;

  this.$snakeCanvas = document.getElementsByClassName("canvas")[0];
  this.$message = document.getElementsByClassName("message")[0];
  this.$score = document.getElementsByClassName("currentScore")[0];
  this.$highScore = document.getElementsByClassName("highScore")[0];

  var context = this.$snakeCanvas.getContext("2d");
  context.canvas.width = maxX * spacing;
  context.canvas.height = maxY * spacing;
  if (window.localStorage["snake-high-score"]) {
    this.$highScore.innerText = window.localStorage["snake-high-score"];
  }
  var game = this;
  this.$message.onclick = function (e) {
    game.start();
  };

  // this.$message.click(function (e) {
  //   game.start();
  // });
}

SnakeGame.prototype.update = function () {
  this.snake.startMove();
  var didGrow = this.snake.isSameLocation(this.food);
  this.snake.endMove(didGrow);
  if (didGrow) {
    // code reaches here when the snake has grown
    // increment score by 1
    // create the food at a new random location
    this.score += 1;
    this.food.randomizePosition(this.maxX, this.maxY);
  }
  return !this.snake.hasCollided(this.maxX, this.maxY);
  // return if the snake is alive or dead, i.e. is game over?
};

SnakeGame.prototype.start = function () {
  this.score = 0;
  this.$message.hidden = true;
  this.snake = new Snake();
  this.snake.init(this.maxX, this.maxY);

  this.food = new SnakeFood();
  this.food.randomizePosition(this.maxX, this.maxY);
  this.loop();
};

SnakeGame.prototype.draw = function () {
  this.$score.innerText = this.score;
  this.$highScore.innerText = window.localStorage["snake-high-score"];
  var context = this.$snakeCanvas.getContext("2d");
  context.clearRect(0, 0, this.spacing * this.maxX, this.spacing * this.maxX);
  this.snake.draw(context, this.spacing);
  this.food.draw(context, this.spacing);
};

SnakeGame.prototype.loop = function () {
  var alive = this.update();

  if (alive) {
    this.draw();
    var game = this;
    setTimeout(function () {
      game.loop();
    }, 200);
  } else {
    this.recordHighScore();
    this.$message.innerText = "Game over. Press to restart.";
    this.$message.hidden = false;
  }
};

SnakeGame.prototype.recordHighScore = function () {
  // check local storage for stored high score, data key is: 'snake-high-score'
  // set the initial high score from local storage, else set it to 0
  this.highScore = window.localStorage["snake-high-score"];
  if (!this.highScore) {
    this.highScore = 0;
  }
  if (this.score > this.highScore) {
    // update the high score in local storage
    window.localStorage["snake-high-score"] = this.score;
    this.$highScore.innerText = window.localStorage["snake-high-score"];
  }
};
