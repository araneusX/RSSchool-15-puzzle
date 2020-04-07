import { FIELD_SIZE } from './constants';
import { createHTMLElement, createButton } from './utils';

const controlls = createHTMLElement('div', 'controlls');
const [
  start,
  pause,
  result,
  save,
  returnSave,
] = [
  'Размешать и начать',
  'Пауза / Продолжить',
  'Результаты',
  'Сохранить',
  'Вернуться к сохраненной игре',
].map((name) => {
  const button = createButton(name);
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

const lock = createHTMLElement('div', 'lock', 'active');

const message = createHTMLElement('div', 'message');
const text = createHTMLElement('p', 'text');
text.innerHTML = `
Ура! Вы решили головоломку за <span id="js-time"></span> и <span id="js-count"></span> ходов!
`;
const ok = createButton('OK');
message.appendChild(text);
message.appendChild(ok);

document.body.appendChild(controlls);
document.body.appendChild(score);
document.body.appendChild(field);
document.body.appendChild(sizes);
document.body.appendChild(lock);
document.body.appendChild(message);

export {
  start,
  pause,
  result,
  save,
  returnSave,
  progress,
  time,
  field,
  sizes,
  lock,
  message,
  ok,
};