import { FIELD_SIZE } from './constants';
import { fillField } from './DOM-functions';
import { timer } from './timer';
import { counter } from './counter';
import {
  clearInnerHTML, fillResultList, getSavedResults,
  removeClassFromChildren, createFieldArr,
} from './utils';

import {
  start, pause, result, save, loadSave,
  field, sizes, lock, best,
  list, bestButton,
} from './body';

let currentFieldSize = FIELD_SIZE;

let currentFieldArr = createFieldArr(currentFieldSize, false);

const bestResult = getSavedResults();

fillResultList(list, bestResult);

clearInnerHTML(field);

fillField(currentFieldArr);

sizes.addEventListener('click', (event) => {
  if (event.target.parentNode === sizes) {
    const newSize = parseInt(event.target.dataset.size, 10);
    if (currentFieldSize !== newSize) {
      timer.clear();
      counter.clear();
      lock.classList.add('on');
      pause.classList.remove('active');
      save.classList.remove('active');
      currentFieldArr = createFieldArr(newSize, false);
      clearInnerHTML(field);
      fillField(currentFieldArr);

      removeClassFromChildren(sizes, 'selected');
      event.target.classList.add('selected');
      currentFieldSize = newSize;
    }
  }
});

start.addEventListener('click', () => {
  currentFieldArr = createFieldArr(currentFieldSize, true);
  clearInnerHTML(field);
  fillField(currentFieldArr);
  timer.restart();
  counter.clear();
  lock.classList.remove('on');
  pause.classList.remove('active');
  save.classList.remove('active');
});

save.addEventListener('click', () => {
  localStorage.gemPuzzleSave = JSON.stringify(currentFieldArr);
  localStorage.gemPuzzleTime = JSON.stringify(timer.getTotal());
  localStorage.gemPuzzleScore = JSON.stringify(counter.value);
});

loadSave.addEventListener('click', () => {
  if (localStorage.gemPuzzleSave) {
    currentFieldArr = JSON.parse(localStorage.gemPuzzleSave);

    if (currentFieldSize !== currentFieldArr.length) {
      currentFieldSize = currentFieldArr.length;
      removeClassFromChildren(sizes, 'selected');
      sizes.querySelector(`[data-size="${currentFieldSize}"]`).classList.add('selected');
    }

    clearInnerHTML(field);
    fillField(currentFieldArr);
    timer.restart(JSON.parse(localStorage.gemPuzzleTime));
    counter.set(JSON.parse(localStorage.gemPuzzleScore));
    lock.classList.remove('on');
  }
});

pause.addEventListener('click', () => {
  if (timer.isStarted) {
    timer.stop();
    lock.classList.add('on');
    pause.classList.add('active');
    save.classList.add('active');
  } else {
    timer.start();
    lock.classList.remove('on');
    pause.classList.remove('active');
    save.classList.remove('active');
  }
});

result.addEventListener('click', () => {
  let timerStop = false;
  if (timer.isStarted) {
    timer.stop();
    timerStop = true;
  }
  best.classList.add('visible');
  bestButton.addEventListener('click', () => {
    best.classList.remove('visible');
    if (timerStop) {
      timer.start();
    }
  }, { once: true });
});
