import { alphabeticPositions } from '../../helpers/grid';
import { Grid } from '../../types';
import { Expression } from './expression';
import { IdentifierExpression } from './identifier';

export class RangeExpression extends Expression {
  protected left: IdentifierExpression;
  protected right: IdentifierExpression;

  constructor(left: IdentifierExpression, right: IdentifierExpression) {
    super(left, right);
    this.left = left;
    this.right = right;
  }

  public evaluate (grid: Grid): unknown {
    // left represents the start of the range
    // Right represents the end of the range
    // This should expand into actual values then return them as an array
    const firstColumnAlphabet = this.left?.Value[0].toUpperCase();
    const lastColumnAlphabet = this.right?.Value[0].toUpperCase();
    if (firstColumnAlphabet !== lastColumnAlphabet) {
      throw Error(`Column must be the same in range ${this.left?.Value}:${this.right?.Value}`);
    }
    const column = alphabeticPositions[firstColumnAlphabet];
    const rowStart = parseInt(this.left?.Value.substring(1)) - 1;
    const rowEnd = parseInt(this.right?.Value.substring(1)) - 1;

    const list = [];
    for(let i = rowStart; i <= rowEnd; i++) {
      const value = grid[i][column].value;
      if (typeof value === 'string') throw Error(`Invalid string ${value} in ${firstColumnAlphabet}${i + 1}`);
      list.push(value);
    }
    return list;
  }
}