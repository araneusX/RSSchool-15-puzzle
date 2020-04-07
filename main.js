import { FIELD_SIZE } from './constants';
import Position from './position';
import createItem from './createItem';
import {
  start,
  pause,
  // result,
  save,
  returnSave,
  progress,
  time,
  field,
  sizes,
  lock,
  message,
  ok,
} from './body';

let currentFieldSize = FIELD_SIZE;
let currentFieldArr;

const counter = {
  HTMLElement: progress,
  value: 0,
  set(newValue) {
    this.value = newValue;
    this.HTMLElement.innerText = newValue;
  },
  next() {
    this.set(this.value + 1);
  },
  clear() {
    this.set(0);
  },
};

const timeFormatter = (timeValue) => {
  const seconds = Math.round(timeValue / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const hoursStr = hours > 0 ? `${hours}:` : '';
  const minutesStr = minutes % 60 > 9 ? `${minutes % 60}:` : `0${minutes % 60}:`;
  const secondsStr = seconds % 60 > 9 ? `${seconds % 60}` : `0${seconds % 60}`;
  return hoursStr + minutesStr + secondsStr;
};

class Timer {
  constructor(HTMLElement, startValue = 0) {
    this.startTime = Date.now();
    this.current = 0;
    this.startValue = startValue;
    this.total = startValue;
    this.HTMLElement = HTMLElement;
    this.HTMLElement.innerText = timeFormatter(0);
    this.display.bind(this);
    this.isStarted = false;
  }

  getCurrent() {
    this.current = Date.now() - this.startTime;
    return this.current;
  }

  getTotal() {
    if (this.isStarted) {
      this.total = this.startValue + this.getCurrent();
    }
    return this.total;
  }

  display() {
    this.HTMLElement.innerText = timeFormatter(this.getTotal());
  }

  start() {
    this.startTime = Date.now();
    this.startValue = this.total;
    this.isUsed = true;
    if (!this.isStarted) {
      this.interval = setInterval(() => (this.display()), 1000);
    }
    this.isStarted = true;
  }

  stop() {
    if (this.isStarted) {
      clearInterval(this.interval);
      this.getTotal();
      this.isStarted = false;
    }
  }

  restart(newStartValue = 0) {
    this.HTMLElement.innerText = timeFormatter(newStartValue);
    this.startTime = Date.now();
    this.total = newStartValue;
    this.current = 0;
    this.startValue = newStartValue;
    if (!this.isStarted) {
      this.start();
    }
  }
}

let timer = new Timer(time);

const clearField = () => {
  while (field.firstChild) {
    field.removeChild(field.firstChild);
  }
};

const fillField = (fieldArr) => {
  const itemSize = 100 / fieldArr.length;
  for (let i = 0; i < fieldArr.length; i += 1) {
    for (let j = 0; j < fieldArr.length; j += 1) {
      const name = fieldArr[i][j];
      const position = new Position(j, i);
      if (name !== 0) {
        field.appendChild(createItem(name, itemSize, position, fieldArr, counter));
      }
    }
  }
};

const createField = (fieldSize = currentFieldSize || FIELD_SIZE, shuffle = true) => {
  clearField();

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

  fillField(fieldArr);
  return fieldArr;
};

currentFieldArr = createField(currentFieldSize, false);


const clearSize = () => {
  Array.from(sizes.children).forEach((item) => {
    item.classList.remove('selected');
  });
};

const onSizeClick = (event) => {
  if (event.target.parentNode === sizes) {
    const newSize = parseInt(event.target.dataset.size, 10);
    if (currentFieldSize !== newSize) {
      timer.stop();
      timer = new Timer(time);
      counter.clear();
      lock.classList.remove('active');
      currentFieldArr = createField(newSize, false);
      clearSize();
      event.target.classList.add('selected');
      currentFieldSize = newSize;
    }
  }
};

sizes.addEventListener('click', onSizeClick);
start.addEventListener('click', () => {
  createField();
  timer.restart();
  counter.clear();
  lock.classList.remove('active');
});

save.addEventListener('click', () => {
  localStorage.gemPuzzleSave = JSON.stringify(currentFieldArr);
  localStorage.gemPuzzleTime = JSON.stringify(timer.getTotal());
  localStorage.gemPuzzleScore = JSON.stringify(counter.value);
});

returnSave.addEventListener('click', () => {
  if (localStorage.gemPuzzleSave) {
    currentFieldArr = JSON.parse(localStorage.gemPuzzleSave);

    if (currentFieldSize !== currentFieldArr.length) {
      currentFieldSize = currentFieldArr.length;
      clearSize();
      sizes.querySelector(`[data-size="${currentFieldSize}"]`).classList.add('selected');
    }

    clearField();
    fillField(currentFieldArr);
    timer.restart(JSON.parse(localStorage.gemPuzzleTime));
    counter.set(JSON.parse(localStorage.gemPuzzleScore));
  }
});

pause.addEventListener('click', () => {
  if (timer.isStarted) {
    timer.stop();
  } else {
    timer.start();
  }
});

document.addEventListener('win', () => {
  timer.stop();
  const totalScore = document.getElementById('js-count');
  const totalTime = document.getElementById('js-time');
  totalScore.innerText = counter.value;
  totalTime.innerText = timeFormatter(timer.getTotal());
  message.classList.add('visible');
  ok.addEventListener('click', () => {
    counter.clear();
    timer = new Timer(time);
    message.classList.remove('visible');
    lock.classList.add('active');
  });
});
