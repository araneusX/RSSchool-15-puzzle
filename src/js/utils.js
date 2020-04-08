import { FIELD_SIZE } from './constants';
import Position from './position';

export const createHTMLElement = (tag, ...classes) => {
  const elem = document.createElement(tag);
  classes.forEach((className) => {
    elem.classList.add(className);
  });
  return elem;
};

export const createButton = (innerText, ...classes) => {
  const button = document.createElement('button');
  button.innerText = innerText;
  classes.forEach((className) => {
    button.classList.add(className);
  });
  return button;
};

export const searchEmpty = (position, fieldArr) => {
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

export const timeFormatter = (timeValue) => {
  const seconds = Math.round(timeValue / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const hoursStr = hours > 0 ? `${hours}:` : '';
  const minutesStr = minutes % 60 > 9 ? `${minutes % 60}:` : `0${minutes % 60}:`;
  const secondsStr = seconds % 60 > 9 ? `${seconds % 60}` : `0${seconds % 60}`;
  return hoursStr + minutesStr + secondsStr;
};

export const clearInnerHTML = (HTMLelement) => {
  while (HTMLelement.firstChild) {
    HTMLelement.removeChild(HTMLelement.firstChild);
  }
};

export const fillResultList = (listHTMLElement, resultArr) => {
  clearInnerHTML(listHTMLElement);

  if (resultArr.length === 0) {
    listHTMLElement.classList.add('empty');
  } else {
    for (let i = 0; i < resultArr.length && i < 10; i += 1) {
      const item = createHTMLElement('li');
      item.innerText = `${i + 1}-е место: ${resultArr[i].bestScore} ходов за время: ${timeFormatter(resultArr[i].bestTime)}.`;
      listHTMLElement.appendChild(item);
    }

    listHTMLElement.classList.remove('empty');
  }
};

export const getSavedResults = () => {
  const bestResultArr = [];
  for (let i = 0; i < 10; i += 1) {
    if (localStorage.getItem(`gemPuzzleBestScore${i}`)) {
      const bestScore = parseInt(localStorage.getItem(`gemPuzzleBestScore${i}`), 10);
      const bestTime = parseInt(localStorage.getItem(`gemPuzzleBestTime${i}`), 10);
      bestResultArr.push({
        bestScore,
        bestTime,
      });
    }
  }
  return bestResultArr;
};

export const getNewResult = (currentResultArr, newResultScore, newResultTime) => {
  const newBestResult = [];
  let isSaved = false;

  if (currentResultArr.length === 0) {
    newBestResult.push({
      bestScore: newResultScore,
      bestTime: newResultTime,
    });
  } else {
    for (let i = 0; i < currentResultArr.length; i += 1) {
      if (!isSaved
         && (currentResultArr[i].bestScore > newResultScore
          || currentResultArr[i].bestTime > newResultTime)) {
        newBestResult.push({
          bestScore: newResultScore,
          bestTime: newResultTime,
        });
        isSaved = true;
      }
      newBestResult.push(currentResultArr[i]);
    }
  }
  return newBestResult;
};

export const saveResult = (resultArr) => {
  for (let i = 0; i < resultArr.length && i < 10; i += 1) {
    localStorage.setItem(`gemPuzzleBestScore${i}`, `${resultArr[i].bestScore}`);
    localStorage.setItem(`gemPuzzleBestTime${i}`, `${resultArr[i].bestTime}`);
  }
};

export const removeClassFromChildren = (parent, className) => {
  Array.from(parent.children).forEach((item) => {
    item.classList.remove(className);
  });
};

export const checkWin = (fieldArr, callbackIfWin) => {
  const checkedField = fieldArr.flat();
  if (checkedField.pop() === 0) {
    const sortCheckedField = [...checkedField].sort((a, b) => a - b);
    if (checkedField.join('') === sortCheckedField.join('')) {
      callbackIfWin();
    }
  }
};

export const createFieldArr = (fieldSize = FIELD_SIZE, shuffle = true) => {
  const fieldArr = [];
  let value = 1;

  for (let i = 0; i < fieldSize; i += 1) {
    const row = [];
    for (let j = 0; j < fieldSize; j += 1) {
      row.push(value);
      value += 1;
    }
    fieldArr.push(row);
  }

  fieldArr[fieldSize - 1][fieldSize - 1] = 0;

  let emptyPosition = new Position(fieldSize - 1, fieldSize - 1);

  if (shuffle) {
    for (let i = 0; i < fieldSize ** 2 * 100; i += 1) {
      const randomizer = Math.floor(Math.random() * 4);
      const newPosition = { ...emptyPosition };
      switch (randomizer) {
        case 0:
          newPosition.x -= 1;
          break;
        case 1:
          newPosition.x += 1;
          break;
        case 2:
          newPosition.y -= 1;
          break;
        default:
          newPosition.y += 1;
      }

      if (newPosition.x >= 0 && newPosition.x < fieldSize
          && newPosition.y >= 0 && newPosition.y < fieldSize) {
        const temp = fieldArr[newPosition.x][newPosition.y];
        fieldArr[newPosition.x][newPosition.y] = 0;
        fieldArr[emptyPosition.x][emptyPosition.y] = temp;
        emptyPosition = newPosition;
      }
    }
  }
  return fieldArr;
};
