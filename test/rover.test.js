const expect = require('chai').expect;
const Mars = require('../src/Mars');

describe('Rover movement and rotation test', () => {
  let mars;
  const x = 5;
  const y = 5;

  beforeEach('create Mars and add Rover', () => {
    mars = new Mars(x, y);
    mars.addRover(0, 0, 'N');
  });

  const rotateRight = [
    [90, 'R', '0 0 E'],
    [180, 'RR', '0 0 S'],
    [270, 'RRR', '0 0 W'],
    [360, 'RRRR', '0 0 N'],
  ];

  describe('should rotate right', () => {
    rotateRight.forEach(test => {
      const [angle, value, result] = test;

      it(`should rotate ${angle} deg right`, () => {
        mars.execute(value);
        expect(mars.getCurrentRoverPosition()).to.deep.equal(result);
      });
    });
  });

  const rotateLeft = [
    [90, 'L', '0 0 W'],
    [180, 'LL', '0 0 S'],
    [270, 'LLL', '0 0 E'],
    [360, 'LLLL', '0 0 N'],
  ];

  describe('should rotate left', () => {
    rotateLeft.forEach(test => {
      const [angle, value, result] = test;

      it(`should rotate ${angle} deg left`, () => {
        mars.execute(value);
        expect(mars.getCurrentRoverPosition()).to.deep.equal(result);
      });
    });
  });

  const moveUp = [
    ['M', '0 1 N'],
    ['MMMMM', '0 5 N'],
    ['MMMMMM', '0 0 N'],
  ];

  describe('should move up', () => {
    moveUp.forEach(test => {
      const [value, result] = test;
      const text = value.length >= 5 ? ' and wrap around' : '';

      it(`should move up ${value.length} times${text}`, () => {
        mars.execute(value);
        expect(mars.getCurrentRoverPosition()).to.deep.equal(result);
      });
    });
  });

  const moveRight = [
    ['RM', '1 0 E'],
    ['RMMMMM', '5 0 E'],
    ['RMMMMMM', '0 0 E'],
  ];

  describe('should rotate right and move right', () => {
    moveRight.forEach(test => {
      const [value, result] = test;
      const text = value.split('R')[1].length >= 6 ? ' and wrap around' : '';

      it(`should move right ${value.split('R')[1].length} times${text}`, () => {
        mars.execute(value);
        expect(mars.getCurrentRoverPosition()).to.deep.equal(result);
      });
    });
  });

  const moveDown = [
    ['RRM', '0 5 S'],
    ['RRMMMMM', '0 1 S'],
    ['RRMMMMMM', '0 0 S'],
  ];

  describe('should rotate right twice and move down', () => {
    moveDown.forEach(test => {
      const [value, result] = test;
      const text = value.split('R')[1].length >= 6 ? ' and wrap around' : '';

      it(`should move down ${value.split('R')[1].length} times${text}`, () => {
        mars.execute(value);
        expect(mars.getCurrentRoverPosition()).to.deep.equal(result);
      });
    });
  });

  const moveLeft = [
    ['LM', '5 0 W'],
    ['LMMMMM', '1 0 W'],
    ['LMMMMMM', '0 0 W'],
  ];

  describe('should rotate left and move left', () => {
    moveLeft.forEach(test => {
      const [value, result] = test;
      const text = value.split('L')[1].length >= 6 ? ' and wrap around' : '';

      it(`should move left ${value.split('L')[1].length} times${text}`, () => {
        mars.execute(value);
        expect(mars.getCurrentRoverPosition()).to.deep.equal(result);
      });
    });
  });
});