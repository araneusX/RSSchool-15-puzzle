import Position from './position';

const searchEmpty = (position, fieldArr) => {
  for (let i = -1; i <= 1; i += 1) {
    for (let j = -1; j <= 1; j += 1) {
      if (position.x + j > -1 && position.x + j < fieldArr.length
          && position.y + i > -1 && position.y + i < fieldArr[0].length) {
        if (Math.abs(i) !== Math.abs(j) && fieldArr[position.y + i][position.x + j] === 0) {
          return new Position(position.x + j, position.y + i);
        }
      }
    }
  }
  return false;
};

export default searchEmpty;
