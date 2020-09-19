import { ProgramExpression } from '../expressions';
import { Parser } from '../parser';

describe('Paser', () => {
  let parser: Parser;

  describe('Success', () => {
    describe('Function calls', () => {
      const functions = ['SUM(A1, A2, A3)', 'SUM(A1:A3)', 'SUM(AVG(A1:A3), A5)'];

      functions.forEach((func: string) => {
        it(`Should parse and create the correct syntax tree ${func}`, async () => {
          const code = func;
          parser = new Parser(code);
          const program = parser.parse();
          expect(program).toMatchSnapshot();
          expect(program).toBeInstanceOf(ProgramExpression);
        })
      })
    })
    describe('Arithmetic expressions', () => {
      const expressions = ['A1', 'A1 + A2', 'SUM(A1:A5) - A9'];

      expressions.forEach((expression: string) => {
        it(`Should parse and create the correct syntax tree ${expression}`, async () => {
          const code = expression;
          parser = new Parser(code);
          const program = parser.parse();
          expect(program).toMatchSnapshot();
          expect(program).toBeInstanceOf(ProgramExpression);
        })
      })
    })
  })
})
