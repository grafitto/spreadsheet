import { Grid } from '@/types';
import { Token } from '../token';
import { Expression } from './expression';

export class OperationExpression extends Expression {
  private list: (Expression | Token)[]
  constructor(list: (Expression | Token)[]) {
    super(null, null)
    this.list = list;
  }

  public evaluate(grid: Grid): unknown {
    return 0;
  }
}