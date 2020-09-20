import { Grid } from '@/types';
import { IdentifierExpression } from '.';
import { Expression } from './expression';

export class ParametersExpression extends Expression {
  private parameters: (ParametersExpression | IdentifierExpression)[];

  constructor(parameters: (ParametersExpression | IdentifierExpression)[]) {
    super(null, null);
    this.parameters = parameters;
  }

  public evaluate(grid: Grid): unknown {
    const values: number[] = [];
    this.parameters.forEach((parameter: Expression) => {
      values.push(parameter.evaluate(grid) as number);
    });
    return values;
  }
}