import { CharacterType } from './characters';
import { InputStream } from './input-stream';
import { Token } from './token';
import { TokenType } from './token-type';

export class Lexer {
  private stream: InputStream;
  private tokens: Token[];

  constructor (code: string) {
    this.tokens = [];
    this.stream = new InputStream(code);
  }

  public generate(): Token[] {
    while (!this.stream.end()) {
      const char = this.stream.next();

      if (char === ' ') {
        continue;
      } else if(char === CharacterType.CLOSE_BRACKET) {
        this.tokens.push(new Token(TokenType.CLOSE_BRACKET, char, char));
      } else if (char === CharacterType.COMMA) {
        this.tokens.push(new Token(TokenType.COMMA, char, char));
      } else if (char === CharacterType.DIVIDE) {
        this.tokens.push(new Token(TokenType.DIVIDE, char, char));
      } else if (char === CharacterType.FULL_COLON) {
        this.tokens.push(new Token(TokenType.FULL_COLLON, char, char));
      } else if (char === CharacterType.MINUS) {
        this.tokens.push(new Token(TokenType.MINUS, char, char));
      } else if (char === CharacterType.OPEN_BRACKET) {
        this.tokens.push(new Token(TokenType.OPEN_BRACKET, char, char));
      } else if (char === CharacterType.PLUS) {
        this.tokens.push(new Token(TokenType.PLUS, char, char));
      } else if (char === CharacterType.TIMES) {
        this.tokens.push(new Token(TokenType.TIMES, char, char));
      } else if (this.isAlphabet(char)) {
        if (char === 'A' && this.stream.peek() === 'V') {
          // AVG function name
          const name = char + this.stream.next() + this.stream.next();
          this.tokens.push(new Token(TokenType.FUNCTION, name, name));
        } else if (char === 'S' && this.stream.peek() === 'U') {
          // SUM function name
          const name = char + this.stream.next() + this.stream.next();
          this.tokens.push(new Token(TokenType.FUNCTION, name, name));
        } else {
          // must be an identifier
          let identifier = char;
          while(!['+', '*','-','/', ':', ',', ')', '('].includes(this.stream.peek())) {
            identifier += this.stream.next();
            this.tokens.push(new Token(TokenType.IDENTIFIER, identifier, identifier));
          }
        }
      } else {
        throw Error(`Unknown character ${char} at position ${this.stream.Position}`);
      }
    }
    return this.tokens
  }

  private isAlphabet(char: string): boolean {
    return [
      'A','B','C','D','E','F','G','H','I','J',
      'K','L','M','N','O','P','Q','R','S','T',
      'U','V','W','X','Y','Z'].includes(char);
  }
}