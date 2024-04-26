var NUM_INITIAL_SECTIONS = 3;
// Directions
var UP = 0;
var UP_KEY_CODE = 38;
var DOWN = 1;
var DOWN_KEY_CODE = 40;
var LEFT = 2;
var LEFT_KEY_CODE = 37;
var RIGHT = 3;
var RIGHT_KEY_CODE = 39;

function Snake() {
  this.img = document.createElement("img");
  this.img.src = "images/snake.png";
  this.sections = [];
}

Snake.prototype = new SnakeWorldObject();

Snake.prototype.setupSnake = function (maxX, maxY) {
  // Set snake's starting coordinates
  // create initial number of snake sections (snake length)
  this.setX(Math.floor((maxX + 1) / 2));
  this.setY(Math.floor((maxY + 1) / 2));
  let k = new SnakeSection(this.getX(), this.getY());
  this.sections.push(k);
  i = this.sections[0].getX();
  j = this.sections[0].getY() + 1;
  var n = NUM_INITIAL_SECTIONS;
  while (--n) {
    let k = new SnakeSection(i, j++);
    this.sections.push(k);
  }
};
Snake.prototype.hasCollided = function (maxX, maxY) {
  // Check if snake has collided with itself or board boundaries.
  let x = this.getX();
  let y = this.getY();
  if (x >= 0 && y >= 0 && x < maxX && y < maxY) {
    return this.sections.some((segment, index) => {
      if (index == 0) return false;
      return this.isSameLocation(segment);
    });
  }
  return true;
};

Snake.prototype.endMove = function (didGrow) {
  if (!didGrow) {
    this.sections.pop();
  }
};

Snake.prototype.startMove = function () {
  this.direction = this.nextDirection;
  // Move snake here
  switch (this.direction) {
    case UP:
      this.setY(this.getY() - 1);
      break;
    case DOWN:
      this.setY(this.getY() + 1);
      break;
    case LEFT:
      this.setX(this.getX() - 1);
      break;
    case RIGHT:
      this.setX(this.getX() + 1);
      break;
  }
  this.sections.unshift(new SnakeSection(this.getX(), this.getY()));
};

Snake.prototype.draw = function (context, spacing) {
  // Draw the complete snake
  for (i = 1; i < this.sections.length; i++) {
    this.sections[i].draw(context, spacing);
  }
  DrawUtil.drawImage(
    context,
    this.img,
    spacing * this.getX(),
    spacing * this.getY(),
    spacing,
    spacing
  );
};

Snake.prototype.init = function (maxX, maxY) {
  this.setupListeners();
  this.setupSnake(maxX, maxY);
};

Snake.prototype.setupListeners = function () {
  this.direction = UP;
  this.nextDirection = UP;
  var snake = this;
  document.addEventListener("keydown", function (e) {
    // Set snake's nextDirection based on keypress.
    switch (e.key) {
      case "ArrowUp":
        if (snake.direction != DOWN) snake.nextDirection = UP;
        break;
      case "ArrowDown":
        if (snake.direction != UP) snake.nextDirection = DOWN;
        break;
      case "ArrowLeft":
        if (snake.direction != RIGHT) snake.nextDirection = LEFT;
        break;
      case "ArrowRight":
        if (snake.direction != LEFT) snake.nextDirection = RIGHT;
        break;
    }
    e.preventDefault();
  });
};
