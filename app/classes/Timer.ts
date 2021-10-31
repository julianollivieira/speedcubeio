interface Options {
  onTick: (time: number) => void;
  onReadying: () => void;
  onReady: () => void;
  onStart: () => void;
  onCancelReady: () => void;
  onStop: (time: number) => void;
}

class Timer {
  public isReady = false;
  public isReadying = false;
  public isRunning = false;
  public justStopped = false;

  private time = 0;
  private timerInterval: NodeJS.Timer | undefined;
  private readyTime = 0;
  private readyingInterval: NodeJS.Timer | undefined;
  private onTick: (time: number) => void;
  private onReadying: () => void;
  private onReady: () => void;
  private onStart: () => void;
  private onCancelReady: () => void;
  private onStop: (time: number) => void;

  public constructor(options: Options) {
    this.onTick = options.onTick;
    this.onReadying = options.onReadying;
    this.onReady = options.onReady;
    this.onStart = options.onStart;
    this.onCancelReady = options.onCancelReady;
    this.onStop = options.onStop;
  }

  public startReadying(): void {
    if (!this.justStopped) {
      this.isReadying = true;
      this.readyTime = 0;
      this.readyingInterval = setInterval(this.readyTick.bind(this), 10);
      this.onReadying();
    }
  }

  public cancelReadying(): void {
    this.isReadying = false;
    this.onCancelReady();
    if (this.readyingInterval) clearInterval(this.readyingInterval);
  }

  public readyTick(): void {
    this.readyTime += 10;
    if (this.readyTime >= 500) {
      this.ready();
    }
  }

  public timerTick(): void {
    this.time += 10;
    this.onTick(this.time);
  }

  public ready(): void {
    this.onReady();
    this.isReady = true;
    if (this.readyingInterval) clearInterval(this.readyingInterval);
  }

  public start(): void {
    this.onStart();
    this.isRunning = true;
    this.isReadying = false;
    this.isReady = false;
    this.time = 0;
    if (this.readyingInterval) clearInterval(this.readyingInterval);
    this.timerInterval = setInterval(this.timerTick.bind(this), 10);
  }

  public stop(): void {
    this.justStopped = true;
    this.isRunning = false;
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.onStop(this.time);
  }
}

export default Timer;
