import { Lexer } from '../lexer';

describe('Lexer', () => {
  const code = 'SUM(S1,S3,S5)';
  let lexer: Lexer;

  beforeAll(() => {
    lexer = new Lexer(code);
  })

  describe('Success', () => {
    it('Should create the correct token list', () => {
      const all = lexer.generate();
      expect(all).toMatchSnapshot();
      expect(all).toBeInstanceOf(Array);
      expect(all.length).toEqual(9);
    })
  })
})
