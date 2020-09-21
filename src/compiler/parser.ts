import { Expression } from './expressions/expression';
import { Lexer } from './lexer';
import { TokenType } from './token-type';
import {
  RangeExpression,
  ProgramExpression,
  IdentifierExpression,
  FunctionCallExpression,
} from './expressions';
import { ParametersExpression } from './expressions/parameters';
import { OperationExpression } from './expressions/operation';
import { Token } from './token';
import { ParameterExpression } from '../types';

export class Parser {
  private lexer: Lexer;
  // @ts-ignore
  private program: ProgramExpression;

  constructor (code: string) {
    this.lexer = new Lexer(code);
    this.lexer.generate();
  }

  public parse (): ProgramExpression {
    const token = this.lexer.next();
    while(token.Type !== TokenType.EOF) {
      if(token.Type === TokenType.FUNCTION) {
        this.lexer.previous();
        const functionCall = this.functionCall();
        if (this.lexer.peek().Type ===TokenType.EOF) {
          // Its a single function
          return new ProgramExpression(functionCall);
        } else {
          // Its an expression that begins with a function
          return new ProgramExpression(this.operation(functionCall));

        }
      } else if(token.Type === TokenType.IDENTIFIER) {
        // An operation starting with an identifier
        const identifier = new IdentifierExpression(token.Value as string);
        return new ProgramExpression(this.operation(identifier));
      }
    }
    return this.program;
  }

  private operation (firstOperand: FunctionCallExpression | IdentifierExpression): OperationExpression {
    const list: (FunctionCallExpression | IdentifierExpression | Token)[] = [];
    list.push(firstOperand);
    let token = this.lexer.next();
    while (token.Type !== TokenType.EOF) {
      if (token.IsOperator) {
        list.push(token);
        token = this.lexer.next();
      } else if (token.Type === TokenType.FUNCTION) {
        this.lexer.previous();
        list.push(this.functionCall());
      } else if (token.Type === TokenType.IDENTIFIER) {
        list.push(new IdentifierExpression(token.Value as string));
        token = this.lexer.next();
      }
    }
    return new OperationExpression(list);
  }

  private functionCall (): FunctionCallExpression {
    const name = this.lexer.next();
    this.consume(TokenType.OPEN_BRACKET);
    const parameters = this.functionParameters();
    this.consume(TokenType.CLOSE_BRACKET);
    return new FunctionCallExpression(parameters, name.Value as string);
  }

  private functionParameters (): RangeExpression | ParametersExpression {
    const token = this.lexer.next();
    if (token.Type === TokenType.IDENTIFIER) {
      if (this.lexer.peek().Type === TokenType.FULL_COLLON) {
        // Its a range
        const start = new IdentifierExpression(token.Value as string);
        this.consume(TokenType.FULL_COLLON);
        const end = new IdentifierExpression(this.lexer.next().Value as string)
        return new RangeExpression(start, end);
      } else if (this.lexer.peek().Type === TokenType.COMMA) {
        this.lexer.previous();
        const parameters: ParameterExpression = [];
        while (this.lexer.peek().Type !== TokenType.CLOSE_BRACKET) {
          const innerToken = this.lexer.next();
          if (innerToken.Type === TokenType.IDENTIFIER) {
            parameters.push(new IdentifierExpression(innerToken.Value as string));
          } else if (innerToken.Type === TokenType.FUNCTION) {
            this.lexer.previous();
            parameters.push(this.functionCall())
          }
        }
        return new ParametersExpression(parameters);
      } else {
        throw Error(`Unknown character ${token.RawValue} at position ${this.lexer.Position}`)
      }
    } else if (token.Type === TokenType.FUNCTION) {
      const parameters: ParameterExpression = [];
      this.lexer.previous();
      const functionCall: FunctionCallExpression = this.functionCall() as FunctionCallExpression;
      parameters.push(functionCall);
      if (this.lexer.peek().Type === TokenType.COMMA) {
        while (this.lexer.peek().Type !== TokenType.CLOSE_BRACKET) {
          const innerToken = this.lexer.next();
          if (innerToken.Type === TokenType.COMMA) {
            continue;
          } else if (innerToken.Type === TokenType.IDENTIFIER) {
            parameters.push(new IdentifierExpression(innerToken.Value as string));
          } else if (innerToken.Type === TokenType.FUNCTION) {
            this.lexer.previous();
            parameters.push(this.functionCall())
          }
        }
        return new ParametersExpression(parameters);
      } else {
        throw Error(`Unsupported character ${token.RawValue}`);
      }
    } else {
      throw Error(`Unsupported character ${token.RawValue}`);
    }
  }

  private consume(token: TokenType): void {
    const consumed = this.lexer.next();
    if (consumed.Type !== token) {
      throw Error(`Unexpected token ${consumed.RawValue} at position ${this.lexer.Position}`);
    }
  }
}