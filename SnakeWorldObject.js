/* Base class for objects in Snake World */

function SnakeWorldObject() {
  this.x;
  this.y;
}

SnakeWorldObject.prototype.getX = function () {
  return this.x;
};
SnakeWorldObject.prototype.getY = function () {
  return this.y;
};
SnakeWorldObject.prototype.setX = function (newX) {
  this.x = newX;
};
SnakeWorldObject.prototype.setY = function (newY) {
  this.y = newY;
};

// Requires another SnakeWorldObject
SnakeWorldObject.prototype.isSameLocation = function (snakeWorld) {
  return this.x == snakeWorld.x && this.y == snakeWorld.y;
};
