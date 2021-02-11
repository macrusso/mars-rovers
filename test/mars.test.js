const expect = require('chai').expect;
const Mars = require('../src/Mars');

describe('Main task tests', () => {
  let mars;
  const x = 5;
  const y = 5;

  it('should create mars with upper right corner at (5 5)', () => {
    mars = new Mars(x, y);
    const gridSize = {
      x: x + 1,
      y: y + 1
    };

    expect(mars).to.exist;
    expect(mars.getGridSize()).to.deep.equal(gridSize);
  });

  it('should create 1st rover at position (1 2 N)', () => {
    mars.addRover(1, 2, 'N');
    expect(mars.getCurrentRoverPosition()).to.equal('1 2 N');
  });

  it('should move 1st rover with provided command', () => {
    mars.execute('LMLMLMLMM');
    expect(mars.getCurrentRoverPosition()).to.equal('1 3 N');
  });

  it('should create 2nd rover at position (3 3 E)', () => {
    mars.addRover(3, 3, 'E');
    expect(mars.getCurrentRoverPosition()).to.equal('3 3 E');
  });

  it('should move 2nd rover with provided command', () => {
    mars.execute('MMRMMRMRRM');
    expect(mars.getCurrentRoverPosition()).to.equal('5 1 E');
  });

  it('should return final position for all rovers', () => {
    const finalPosition = ['1 3 N', '5 1 E'];
    expect(mars.getFinalRoversPosition()).to.deep.equal(finalPosition);
  });
});