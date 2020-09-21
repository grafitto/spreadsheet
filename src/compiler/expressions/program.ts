import { Grid } from '../../types';
import { Expression } from './expression';

export class ProgramExpression extends Expression {
  constructor(right: Expression) {
    super(null, right);
  }

  public evaluate (grid: Grid): unknown {
    return this.right?.evaluate(grid);
  }
}