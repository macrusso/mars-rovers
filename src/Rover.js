class Rover {
  constructor(x, y, direction) {
    this.location = {
      x, y
    };
    this.direction = direction;
  }

  rotate(direction) {
    const compassPoints = ['N', 'E', 'S', 'W'];
    const currentDirectionAsNumber = compassPoints.indexOf(this.direction);

    if (direction === 'R') {
      this.direction = compassPoints[(currentDirectionAsNumber + 1) % 4];
    }

    if (direction === 'L') {
      this.direction = compassPoints[(currentDirectionAsNumber + 4 - 1) % 4];
    }
  }

  move(isLocationOccupied, grid) {
    let { x, y } = this.location;

    if (this.direction === 'N') {
      y = (y + 1) % grid.x;
    }
    if (this.direction === 'E') {
      x = (x + 1) % grid.y;
    }
    if (this.direction === 'S') {
      y = (y > 0) ? y - 1 : grid.y - 1;
    }
    if (this.direction === 'W') {
      x = (x > 0) ? x - 1 : grid.x - 1;
    }
    if (isLocationOccupied(x, y)) {
      throw Error('Path is occupied, rover stopped');
    };
    this.location = { x, y };
  }


  getPosition() {
    return `${this.location.x} ${this.location.y} ${this.direction}`;
  }
}

module.exports = Rover;