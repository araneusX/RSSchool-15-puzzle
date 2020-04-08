import Position from './position';
import { timer } from './timer';
import { counter } from './counter';
import {
  timeFormatter, fillResultList, getSavedResults, getNewResult,
  saveResult, createHTMLElement, searchEmpty, checkWin,
} from './utils';
import {
  pause, save, lock, message,
  winButton, list, field,
} from './body';

export const doIfWin = () => {
  const totalScore = document.getElementById('js-count');
  const totalTime = document.getElementById('js-time');

  let bestResult = getSavedResults();

  timer.stop();
  const resultScore = counter.value;
  const resultTime = timer.getTotal();

  totalScore.innerText = resultScore;
  totalTime.innerText = timeFormatter(resultTime);
  message.classList.add('visible');

  bestResult = getNewResult(bestResult, resultScore, resultTime);
  saveResult(bestResult);
  fillResultList(list, bestResult);

  winButton.addEventListener('click', () => {
    counter.clear();
    timer.restart();
    message.classList.remove('visible');
    lock.classList.add('on');
    pause.classList.remove('active');
    save.classList.remove('active');
  }, { once: true });

  list.classList.remove('empty');
};

const createItem = (name, size, position, fieldArr) => {
  const fieldLink = fieldArr;
  let itemPosition = position;

  const itemHTMLElement = createHTMLElement('div', 'item');
  itemHTMLElement.innerText = `${name}`;
  itemHTMLElement.style.height = `${size}%`;
  itemHTMLElement.style.width = `${size}%`;
  itemHTMLElement.style.top = `${size * itemPosition.y}%`;
  itemHTMLElement.style.left = `${size * itemPosition.x}%`;

  itemHTMLElement.addEventListener('mousedown', (e) => {
    const newPosition = searchEmpty(itemPosition, fieldLink);
    const startPosition = new Position(e.clientX, e.clientY);
    let isMoved = false;
    if (newPosition) {
      const currentHTMLPosition = new Position(itemPosition.x * size, itemPosition.y * size);

      const limitX = newPosition.x < itemPosition.x
        ? [newPosition.x, itemPosition.x]
        : [itemPosition.x, newPosition.x];

      const limitY = newPosition.y < itemPosition.y
        ? [newPosition.y, itemPosition.y]
        : [itemPosition.y, newPosition.y];

      const changeField = () => {
        if ((
          limitX[0] !== limitX[1]
          && Math.abs(newPosition.x * size - currentHTMLPosition.x)
          < Math.abs(itemPosition.x * size - currentHTMLPosition.x)
        ) || (
          limitY[0] !== limitY[1]
          && Math.abs(newPosition.y * size - currentHTMLPosition.y)
          < Math.abs(itemPosition.y * size - currentHTMLPosition.y)
        ) || (!isMoved)
        ) {
          fieldLink[itemPosition.y][itemPosition.x] = 0;
          itemPosition = newPosition;
          fieldLink[itemPosition.y][itemPosition.x] = name;
          counter.next();
          checkWin(fieldLink, doIfWin);
        }

        itemHTMLElement.style.top = `${size * itemPosition.y}%`;
        itemHTMLElement.style.left = `${size * itemPosition.x}%`;
      };

      const move = (eMove) => {
        const HTMLShift = new Position(
          eMove.clientX - startPosition.x,
          eMove.clientY - startPosition.y,
        );

        if (Math.abs(HTMLShift.x) + Math.abs(HTMLShift.y) > 5) {
          isMoved = true;
        }

        const newHTMLPositionX = (
          size * itemPosition.x + (size * HTMLShift.x) / itemHTMLElement.offsetWidth
        );
        const newHTMLPositionY = (
          size * itemPosition.y + (size * HTMLShift.y) / itemHTMLElement.offsetHeight
        );

        if ((newPosition.x - itemPosition.x) !== 0) {
          if (newHTMLPositionX >= limitX[0] * size && newHTMLPositionX <= limitX[1] * size) {
            itemHTMLElement.style.left = `${newHTMLPositionX}%`;
            currentHTMLPosition.x = newHTMLPositionX;
          }
        } else if (newHTMLPositionY >= limitY[0] * size && newHTMLPositionY <= limitY[1] * size) {
          itemHTMLElement.style.top = `${newHTMLPositionY}%`;
          currentHTMLPosition.y = newHTMLPositionY;
        }
      };

      itemHTMLElement.classList.remove('smooth');
      window.addEventListener('mousemove', move);

      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', move);
        itemHTMLElement.classList.add('smooth');
        changeField();
      }, { once: true });
    }
  });

  return itemHTMLElement;
};

export const fillField = (fieldArr) => {
  const itemSize = 100 / fieldArr.length;
  for (let i = 0; i < fieldArr.length; i += 1) {
    for (let j = 0; j < fieldArr.length; j += 1) {
      const name = fieldArr[i][j];
      const position = new Position(j, i);
      if (name !== 0) {
        field.appendChild(createItem(name, itemSize, position, fieldArr));
      }
    }
  }
};
