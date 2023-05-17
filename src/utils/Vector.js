class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  mDistance(otherPos) {
    return Math.abs(otherPos.x - this.x) + Math.abs(otherPos.y - this.y);
  }
  getDir(other) {
    if (this.x === other.x) {
      if (this.y > other.y && Math.abs(this.y - other.y) > 1) {
        return "down";
      } else if (this.y < other.y && Math.abs(this.y - other.y) === 1) {
        return "down";
      } else {
        return "up";
      }
    } else {
      if (this.x > other.x && Math.abs(this.x - other.x) > 1) {
        return "right";
      } else if (this.x < other.x && Math.abs(this.x - other.x) === 1) {
        return "right";
      } else {
        return "left";
      }
    }
  }
}

export default Vector;
