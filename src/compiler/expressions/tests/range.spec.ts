import { initialiseGrid } from '@/helpers/grid';
import { Grid } from '@/types';
import { IdentifierExpression, RangeExpression } from ".."
import { fixtures } from './fixtures';

describe('Function call', () => {
  let range: RangeExpression;
  let start: IdentifierExpression;
  let end: IdentifierExpression;
  let cells = [];
  let grid: Grid;
  let cellValue: any;

  beforeAll(() => {
    cellValue = {
      fixture: '',
      value: 12
    }
    cells = ['A1', 'A5'];
    grid = initialiseGrid();
    start = new IdentifierExpression(cells[0]);
    end = new IdentifierExpression(cells[1]);
    grid = fixtures.insertDataToGrid(grid, 'A1', cellValue);
    grid = fixtures.insertDataToGrid(grid, 'A2', cellValue);
    grid = fixtures.insertDataToGrid(grid, 'A3', cellValue);
    grid = fixtures.insertDataToGrid(grid, 'A4', cellValue);
    grid = fixtures.insertDataToGrid(grid, 'A5', cellValue);
    range = new RangeExpression(start, end);
  })

  describe('Success', () => {
   it('Should get the values from one cell to the other', () => {
     const list = range.evaluate(grid);
     expect(list).toEqual([12, 12, 12, 12, 12]);
     expect(list).toBeInstanceOf(Array);
   })
  })
  describe('Error', () => {
    it('should throw an error when one of the values is a string', () => {
      grid = fixtures.insertDataToGrid(grid, 'A5', { formula: '', value: 'some value'});
      expect(() => range.evaluate(grid)).toThrowError();
    })
  })
})