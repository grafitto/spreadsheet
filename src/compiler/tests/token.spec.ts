import { Token } from "../token";
import { TokenType } from '../token-type';

describe('Token', () => {
  let token: Token;
  let type: TokenType;
  let value: string;

  beforeAll(() => {
    type = TokenType.PLUS;
    value = '+';
    token = new Token(type, value, value);
  })

  describe('Success', () => {
    it('Should create a valid token with the correct type', () => {
      const finalType = token.Type;
      expect(finalType).toEqual(type);
    })
    
    it('Should create a valid token with the correct raw value', () => {
      const rawValue = token.RawValue;
      expect(rawValue).toEqual(value);
    })

    it('Should create a valid token with the correct value (string)', () => {
      const finalValue = token.Value;
      expect(finalValue).toEqual(value);
    })

    it('Should create a valid token with the correct raw value (number)', () => {
      const value = 2;
      token = new Token(TokenType.NUMBER, value.toString(), value);
      expect(token.Value).toEqual(value);
    })
    
  })
})
