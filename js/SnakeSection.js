var SNAKE_SECTION_GREEN = "#00DD00";

class SnakeSection {
  constructor(x, y) {
    // Set snake section coordinates
    this.setX(x);
    this.setY(y);
  }
  draw(context, spacing) {
    DrawUtil.drawCircle(
      context,
      spacing * this.getX() + spacing / 2,
      spacing * this.getY() + spacing / 2,
      spacing / 2,
      SNAKE_SECTION_GREEN
    );
  }
}

SnakeSection.prototype = new SnakeWorldObject();


