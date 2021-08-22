interface Options {
  onTick: Function;
  onReadying: Function;
  onReady: Function;
  onStart: Function;
  onCancelReady: Function;
  onStop: Function;
}

class Timer {
  isReady: boolean = false;
  isReadying: boolean = false;
  isRunning: boolean = false;
  justStopped: boolean = false;
  time: number = 0;
  timerInterval: any = null;
  readyTime: number = 0;
  readyingInterval: any = null;
  onTick: any = null;
  onReadying: any = null;
  onReady: any = null;
  onStart: any = null;
  onCancelReady: any = null;
  onStop: any = null;

  init(options: Options) {
    this.onTick = options.onTick;
    this.onReadying = options.onReadying;
    this.onReady = options.onReady;
    this.onStart = options.onStart;
    this.onCancelReady = options.onCancelReady;
    this.onStop = options.onStop;
  }

  startReadying() {
    if (!this.justStopped) {
      console.log('🟢 Readying');
      this.isReadying = true;
      this.readyTime = 0;
      this.readyingInterval = setInterval(this.readyTick.bind(this), 10);
      this.onReadying();
    }
  }

  cancelReadying() {
    this.isReadying = false;
    this.onCancelReady();
    clearInterval(this.readyingInterval);
    console.log('🔴 Cancelled readying');
  }

  readyTick() {
    this.readyTime += 10;
    if (this.readyTime >= 500) {
      this.ready();
    }
  }

  timerTick() {
    this.time += 10;
    this.onTick(this.time);
  }

  ready() {
    this.onReady();
    this.isReady = true;
    clearInterval(this.readyingInterval);
    console.log('🔵 Ready');
  }

  start() {
    this.onStart();
    this.isRunning = true;
    this.isReadying = false;
    this.isReady = false;
    this.time = 0;
    clearInterval(this.readyingInterval);
    this.timerInterval = setInterval(this.timerTick.bind(this), 10);
    console.log('🟣 Started');
  }

  stop() {
    this.justStopped = true;
    this.isRunning = false;
    clearInterval(this.timerInterval);
    console.log(`🟠 Stopped ${this.time / 1000}`);
    this.onStop(this.time);
  }
}

export default Timer;
