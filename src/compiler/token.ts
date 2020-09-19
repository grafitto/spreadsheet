import { TokenType } from './token-type';

export class Token {
  private type: TokenType;
  private rawValue: string;
  private value: string | number;

  constructor (type: TokenType, rawValue: string, value: string | number) {
    this.type = type;
    this.rawValue = rawValue;
    this.value = value;
  }

  get Type (): TokenType {
    return this.type;
  }

  get Value (): string | number {
    return this.value;
  }

  get RawValue (): string {
    return this.rawValue;
  }

  get IsOperator (): boolean {
    return this.isOfType(TokenType.PLUS) ||
          this.isOfType(TokenType.MINUS) ||
          this.isOfType(TokenType.DIVIDE) ||
          this.isOfType(TokenType.TIMES)
  }

  public isOfType(type: TokenType): boolean {
    return this.type === type;
  }
}