import { progress } from './body';

class Counter {
  constructor(HTMLElement) {
    this.HTMLElement = HTMLElement;
    this.value = 0;
  }

  set(newValue) {
    this.value = newValue;
    this.HTMLElement.innerText = newValue;
  }

  next() {
    this.set(this.value + 1);
  }

  clear() {
    this.set(0);
  }
}

export const counter = new Counter(progress);

export default Counter;
