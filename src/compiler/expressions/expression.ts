import { Grid } from '@/types';

export abstract class Expression {
  protected left: Expression | null;
  protected right: Expression | null;

  constructor (left: Expression | null, right: Expression | null) {
    this.left = left;
    this.right = right;
  }
  abstract evaluate(grid: Grid): unknown ;
}