import { timeFormatter } from './utils';
import { time } from './body';

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
    clearInterval(this.interval);
    this.HTMLElement.innerText = timeFormatter(newStartValue);
    this.startTime = Date.now();
    this.total = newStartValue;
    this.current = 0;
    this.startValue = newStartValue;
    this.isStarted = false;
    this.start();
  }

  clear() {
    clearInterval(this.interval);
    this.isStarted = false;
    this.HTMLElement.innerText = timeFormatter(0);
  }
}

export const timer = new Timer(time);

export default Timer;
