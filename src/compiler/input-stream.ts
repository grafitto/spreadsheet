export class InputStream {
  private position = 0;
  private code = '';

  constructor (code: string) {
    this.code = code;
  }

  get Position (): number {
    return this.position;
  }

  /**
   * Fetches the next character then steps one step
   * @returns {string}
   */

  public next(): string {
    if(!this.end()) {
      const character = this.code[this.position++];
      return character;
    } else {
      throw Error('Reached end of the code');
    }
  }

  public Position() {
    return this.position;
  }

  /**
   * Returns the next character that will be returned when next is called
   * @param {number} ahead
   */
  public peek(ahead = 0): string {
    return this.code[this.position + ahead];
  }

  /**
   * Checks whether we have reached the end of the code string
   */
  public end(): boolean {
    return this.position >= this.code.length;
  }

  /**
   * Steps back one character
   */
  public previous(steps = 1): void {
    this.position -= steps;
  }
}