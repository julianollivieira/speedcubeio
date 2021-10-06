import { Box, Time } from '@/types';

class TimeList {
  public times: number[] = [];
  public ao5s: (number | null)[] = [];
  public ao12s: (number | null)[] = [];

  public constructor(box: Box) {
    const sortedTimes = box.times?.sort((a, b) => a.createdAt - b.createdAt);
    this.times = (sortedTimes ?? []).map((time: Time) => time.time);
    this.ao5s = this.times.map((item, index) => {
      if (index < 4) return null;
      const five = this.times.slice(index - 4, index + 1);
      return this.average(this.removeWorstAndBest(five));
    });
    this.ao12s = this.times.map((item, index) => {
      if (index < 11) return null;
      const twelve = this.times.slice(index - 11, index + 1);
      return this.average(this.removeWorstAndBest(twelve));
    });
  }

  // public getGraphObject(): any[] {
  //   return this.times.map((item, index) => ({
  //     name: index + 1,
  //     time: msToTimeNull(this.times[index]),
  //     ao5: msToTimeNull(this.ao5s[index]),
  //     ao12: msToTimeNull(this.ao12s[index]),
  //   }));
  // }

  // public getPuzzlesPieChartObject(): any[] {
  //   let data: any = [];
  //   this.timesRaw?.forEach((time) => {
  //     let found = data.find((element: any) => element.name == time.puzzle);
  //     if (found) {
  //       found.value += 1;
  //     } else {
  //       data.push({ name: time.puzzle, value: 1 });
  //     }
  //   });
  //   return data;
  // }

  public getAverageOf5(index: number): number | null {
    if (this.ao5s.length < 4) return null;
    return this.ao5s[index];
  }

  public getAverageOf12(index: number): number | null {
    if (this.ao12s.length < 11) return null;
    return this.ao12s[index];
  }

  // Get the best time
  public getBestTime(): number | null {
    if (this.times.length < 1) return null;
    return Math.min(...this.times);
  }

  // Get the worst time
  public getWorstTime(): number | null {
    if (this.times.length < 1) return null;
    return Math.max(...this.times);
  }

  // Get the last time
  public getLastTime(): number | null {
    if (this.times.length < 1) return null;
    return this.times[this.times.length - 1];
  }

  // Get the best average of 5
  public getBestAverageOf5(): number | null {
    if (this.ao5s.length < 4) return null;
    const timesWithoutNull = <number[]>this.ao5s.filter((time) => time !== null);
    return Math.min(...timesWithoutNull);
  }

  // Get the worst average of 5
  public getWorstAverageOf5(): number | null {
    if (this.ao5s.length < 4) return null;
    const timesWithoutNull = <number[]>this.ao5s.filter((time) => time !== null);
    return Math.max(...timesWithoutNull);
  }

  // Get the last average of 5
  public getLastAverageOf5(): number | null {
    if (this.ao5s.length < 4) return null;
    return this.ao5s[this.ao5s.length - 1];
  }

  // Get the best average of 12
  public getBestAverageOf12(): number | null {
    if (this.ao12s.length < 11) return null;
    const timesWithoutNull = <number[]>this.ao12s.filter((time) => time !== null);
    return Math.min(...timesWithoutNull);
  }

  // Get the best average of 12
  public getWorstAverageOf12(): number | null {
    if (this.ao12s.length < 11) return null;
    const timesWithoutNull = <number[]>this.ao12s.filter((time) => time !== null);
    return Math.max(...timesWithoutNull);
  }

  // Get the last average of 12
  public getLastAverageOf12(): number | null {
    if (this.ao5s.length < 11) return null;
    return this.ao12s[this.ao12s.length - 1];
  }

  // Return the average of a list of times
  private average(times: number[]): number {
    let total = 0;
    times.forEach((time) => (total += time));
    return total / times.length;
  }

  // Remove the shortest and the longest time from a list of times
  private removeWorstAndBest(times: number[]): number[] {
    const best = Math.min(...times);
    const worst = Math.max(...times);

    const firstBestIndex = times.findIndex((time) => time === best);
    times.splice(firstBestIndex, 1);

    const firstWorstIndex = times.findIndex((time) => time === worst);
    times.splice(firstWorstIndex, 1);

    return times;
  }
}

export default TimeList;
