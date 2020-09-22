import { Grid } from '../../types';
import { FunctionCallExpression, IdentifierExpression } from '.';
import { Token } from '../token';
import { ArithmeticExpression } from './arithmetic';
import { Expression } from './expression';

type ArithmeticOperands = IdentifierExpression | FunctionCallExpression | Token;
export class OperationExpression extends Expression {
  private PRECEDENCE: { [key: string]: number } = {
    '+': 14,
    '-': 14,
    '/': 15,
    '*': 15
  }
  private list: (FunctionCallExpression | IdentifierExpression | Token)[]
  constructor(list: (FunctionCallExpression | IdentifierExpression | Token)[]) {
    super(null, null)
    this.list = list;
  }

  public evaluate(grid: Grid): number {
    const operands: ArithmeticOperands[] = [];
    const operators: Token[] = [];
    if(this.list.length === 1) {
      const identifier: IdentifierExpression = this.list[0] as IdentifierExpression;
      return identifier.evaluate(grid);
    } else {
      for (const item of this.list) {
        if(item instanceof FunctionCallExpression || item instanceof IdentifierExpression) {
          operands.push(item);
        } else {
          // It is a token
          const token = item as Token;
          if(operators.length !== 0) {
            for(let i = 0; i < operators.length; i++) {
              const peek = operators[operators.length - 1];
              if(this.PRECEDENCE[peek.Value] >= this.PRECEDENCE[token.Value]) {
                operands.push(operators.pop() as Token);
              } else {
                break;
              }
            }
          }
          operators.push(token);
        }
      }
      operators.reverse().forEach(operator => {
        operands.push(operator);
      });
    }
    
    return this.constructTree(operands).evaluate(grid);
  }

  public constructTree(operands: ArithmeticOperands[]): ArithmeticExpression {
    const list: (ArithmeticOperands | ArithmeticExpression)[] = [];
    for (const operand of operands) {
      if (operand instanceof Token) {
        const right = list.pop();
        const left = list.pop();
        // @ts-ignore
        list.push(new ArithmeticExpression(left, right, operand.Value as string));
      } else {
        list.push(operand);
      }
    }
    return list[0] as ArithmeticExpression;
  }
  
}