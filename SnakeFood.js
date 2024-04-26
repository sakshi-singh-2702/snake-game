function SnakeFood() {
  this.img = document.createElement("img");
  this.img.src = "images/food3.png";
}
SnakeFood.prototype = new SnakeWorldObject();

SnakeFood.prototype.randomizePosition = function (maxX, maxY) {
  // Set snake food at random positions.
  let x = Math.floor(Math.random() * maxX);
  let y = Math.floor(Math.random() * maxY);
  this.setX(x);
  this.setY(y);
};

SnakeFood.prototype.draw = function (context, spacing) {
  DrawUtil.drawImage(
    context,
    this.img,
    spacing * this.getX(),
    spacing * this.getY(),
    spacing,
    spacing
  );
};
