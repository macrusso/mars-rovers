const Rover = require('./Rover');

class Mars {
  constructor(x, y) {
    // constructor takes upper right coordinates not grid size,
    // grid starts at 0,0, hence adding one to total grid size
    this.grid = {
      x: x + 1,
      y: y + 1
    };
    this.currentRover = null;
    this.rovers = [];
    this.isLocationOccupied = this.isLocationOccupied.bind(this);
  }

  addRover(x, y, direction) {
    this.checkPositionValidity(x, y, direction);

    this.currentRover = new Rover(x, y, direction);
    this.rovers.push(this.currentRover); return `Created rover no. ${this.rovers.length} at ${this.getCurrentRoverPosition()}`;
  }

  checkPositionValidity(x, y, direction) {
    if (['N', 'E', 'S', 'W'].indexOf(direction) < 0) {
      throw Error('Wrong direction');
    }
    if (!this.isLocationInGrid(x, y)) {
      throw Error('Coordinates out of the grid');
    }
    if (this.isLocationOccupied(x, y)) {
      throw Error('Location occupied');
    }
  }

  execute(order) {
    order.split('').forEach(char => {
      if (char === 'R') this.currentRover.rotate('R');
      if (char === 'L') this.currentRover.rotate('L');
      if (char === 'M') this.currentRover.move(this.isLocationOccupied, this.getGridSize());
    });
  }

  getCurrentRoverPosition() {
    return this.currentRover.getPosition();
  }

  getFinalRoversPosition() {
    return this.rovers.map(rover => rover.getPosition());
  }

  getGridSize() {
    return this.grid;
  }

  isLocationOccupied(x, y) {
    return this.rovers.find(rover => {
      const [roverX, roverY] = rover.getPosition().split(' ');
      return roverX == x && roverY == y;
    });
  }

  isLocationInGrid(x, y) {
    return (
      x >= 0 &&
      y >= 0 &&
      x < this.grid.x &&
      y < this.grid.y
    );
  }

}

module.exports = Mars;