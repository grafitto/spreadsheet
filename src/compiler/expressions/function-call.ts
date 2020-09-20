import { Grid } from '@/types';
import { RangeExpression } from '.';
import { Expression } from './expression';

export class FunctionCallExpression extends Expression {
  private name: string;

  constructor(parameters: RangeExpression | Expression, name: string) {
    super(null, parameters);
    this.name = name;
  }

  public evaluate(grid: Grid): number {
    // Should evaluate the right side then apply the function call
    switch(this.name) {
      case 'SUM':
        return this.sum(this.right?.evaluate(grid) as number[]);
      case 'AVG': {
        const paramValues = this.right?.evaluate(grid) as number[];
        return this.sum(paramValues) / paramValues.length;
      }
      default:
        throw Error(`Error evaluating the function call ${this.name}`);
    }
  }

  private sum(items: number[]): number {
    return items.reduce((sum: number, current: number) => sum + current, 0);
  }
}