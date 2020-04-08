import { FIELD_SIZE } from './constants';
import { createHTMLElement, createButton } from './utils';

const controlls = createHTMLElement('div', 'controlls');
const [
  start,
  pause,
  result,
  save,
  loadSave,
] = [
  ['Размешать и начать', 'start'],
  ['Пауза / Продолжить', 'pause'],
  ['Результаты', 'result'],
  ['Сохранить', 'save'],
  ['Вернуться к сохраненной игре', 'loadSave'],
].map((data) => {
  const button = createButton(...data);
  controlls.appendChild(button);
  return button;
});

const score = createHTMLElement('div', 'score');
const progress = createHTMLElement('span', 'progress');
const time = createHTMLElement('span', 'time');
progress.innerText = '0';
time.innerText = '00:00';
score.appendChild(progress);
score.appendChild(time);

const field = createHTMLElement('div', 'field');

const sizes = createHTMLElement('div', 'sizes');

[3, 4, 5, 6, 7, 8].forEach((size) => {
  const toggle = createButton(`${size}x${size}`);
  toggle.setAttribute('data-size', size);
  if (size === FIELD_SIZE) {
    toggle.classList.add('selected');
  }
  sizes.appendChild(toggle);
});

const lock = createHTMLElement('div', 'lock', 'on');

const message = createHTMLElement('div', 'message');
const text = createHTMLElement('p', 'text');
text.innerHTML = `
Ура! Вы решили головоломку за <span id="js-time"></span> и <span id="js-count"></span> ходов!
`;
const winButton = createButton('OK');
message.appendChild(text);
message.appendChild(winButton);

const best = createHTMLElement('div', 'best');
const bestPlace = createHTMLElement('div', 'best__place');
const title = createHTMLElement('h4', 'best__title');
const list = createHTMLElement('ul', 'best__list');
title.innerText = 'Рекорды';
const bestButton = createButton('OK');
bestPlace.appendChild(title);
bestPlace.appendChild(list);
bestPlace.appendChild(bestButton);
best.appendChild(bestPlace);

document.body.appendChild(controlls);
document.body.appendChild(score);
document.body.appendChild(field);
document.body.appendChild(sizes);
document.body.appendChild(lock);
document.body.appendChild(message);
document.body.appendChild(best);


export {
  start,
  pause,
  result,
  save,
  loadSave,
  progress,
  time,
  field,
  sizes,
  lock,
  message,
  winButton,
  best,
  list,
  bestButton,
};
