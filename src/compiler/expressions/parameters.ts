import { Grid, ParameterExpression } from '../../types';
import { Expression } from './expression';

export class ParametersExpression extends Expression {
  private parameters: ParameterExpression;

  constructor(parameters: ParameterExpression) {
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