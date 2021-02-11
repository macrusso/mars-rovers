const expect = require('chai').expect;
const Mars = require('../src/Mars');

describe('Mars control tests', () => {
  let mars;
  const x = 5;
  const y = 5;

  beforeEach('create Mars', () => {
    mars = new Mars(x, y);
  });

  const outOfGrid = [[0, -1, 'N'], [6, 6, 'N'], [-1, -1, 'N']];
  outOfGrid.forEach(deployment => {
    it('should NOT create rover out of the grid', () => {
      const [x, y, dir] = deployment;
      expect(() => mars.addRover(x, y, dir)).to.throw('Coordinates out of the grid');
    });
  });

  const wrongDirection = [[0, 0, 'F'], [0, 0, null], [0, 0, 1]];
  wrongDirection.forEach(deployment => {
    it('should NOT create rover with wrong direction', () => {
      const [x, y, dir] = deployment;
      expect(() => mars.addRover(x, y, dir)).to.throw('Wrong direction');
    });
  });

  it('should NOT create a new rover in the existing one position', () => {
    mars.addRover(1, 1, 'N');
    expect(() => mars.addRover(1, 1, 'N')).to.throw('Location occupied');
  });

  it('should NOT not move a rover to the occupied position', () => {
    mars.addRover(0, 1, 'N'); // first rover
    mars.addRover(0, 0, 'N'); // second rover - moved
    expect(() => mars.execute('M')).to.throw('Path is occupied, rover stopped');
  });
});