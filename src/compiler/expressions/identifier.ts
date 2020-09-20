import { Grid } from '@/types';
import { Expression } from './expression';
import { alphabeticPositions } from '@/helpers/grid';

export class IdentifierExpression extends Expression {
  private value: string;

  constructor (value: string) {
    super(null, null)
    this.value = value;
  }

  get Value () {
    return this.value;
  }

  /**
   * Fetches the value from the store and returns it
   */
  public evaluate (grid: Grid): unknown {
    const column = alphabeticPositions[this.value[0].toUpperCase()];
    const row = parseInt(this.value[1]) - 1;
    const value = grid[row][column].value;
    if(typeof value === 'number') {
      return value;
    } else {
      throw Error(`Cell ${this.value} has a an unsupported type.`);
    }
  }
}