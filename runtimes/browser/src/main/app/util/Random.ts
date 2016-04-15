export class Random {

  /**
   * @param   min default to 0
   * @param   max default to 100
   * @returns random value between `min` and `max` included
   */
  static gen(min: number = 0, max: number = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
