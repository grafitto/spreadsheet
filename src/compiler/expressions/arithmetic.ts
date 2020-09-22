import { Grid } from '../../types';
import { FunctionCallExpression, IdentifierExpression } from '.';
import { Expression } from './expression';

export class ArithmeticExpression extends Expression {
  private operator: string;
  constructor(left: IdentifierExpression, right: ArithmeticExpression | IdentifierExpression | FunctionCallExpression, operator: string) {
    super(left, right);
    this.operator = operator;
  }

  public evaluate(grid: Grid): number {
    switch (this.operator) {
      case '+':
        // @ts-ignore
        return (this.left?.evaluate(grid) as number) + (this.right?.evaluate(grid)) as number;
      case '-':
        // @ts-ignore
        return (this.left?.evaluate(grid) as number) - (this.right?.evaluate(grid)) as number;
      case '*':
        // @ts-ignore
        return (this.left?.evaluate(grid) as number) * (this.right?.evaluate(grid)) as number;
      case '/':
        // @ts-ignore
        return (this.left?.evaluate(grid) as number) / (this.right?.evaluate(grid)) as number;
      default:
        throw Error('Unknown arithmetic operator');

    }
  }
}