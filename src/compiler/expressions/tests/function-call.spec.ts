import { initialiseGrid } from '@/helpers/grid';
import { Grid } from '@/types';
import { FunctionCallExpression, IdentifierExpression, RangeExpression } from ".."
import { ParametersExpression } from '../parameters';
import { fixtures } from './fixtures';

describe('Function call', () => {
  let func: FunctionCallExpression;
  let first: IdentifierExpression;
  let second: IdentifierExpression;
  let cells = [];
  let grid: Grid;
  let cellValue: any;

  beforeAll(() => {
    cellValue = {
      fixture: '',
      value: 12
    }
    cells = ['A1', 'A2'];
    grid = initialiseGrid();
    first = new IdentifierExpression(cells[0]);
    second = new IdentifierExpression(cells[1]);
    grid = fixtures.insertDataToGrid(grid, cells[0], cellValue);
    grid = fixtures.insertDataToGrid(grid, cells[1], cellValue);
    func = new FunctionCallExpression(new ParametersExpression([first, second]), 'SUM');
  })

  describe('Success', () => {
    it('Should SUM to the correct cell value', () => {
      const value = func.evaluate(grid);
      expect(value).toEqual(cellValue.value * 2);
    })
    it('Should AVG to the correct cell value', () => {
      func = new FunctionCallExpression(new ParametersExpression([first, second]), 'AVG');
      const value = func.evaluate(grid);
      expect(value).toEqual(cellValue.value);
    })
    it('Should SUM values in range', () => {
      func = new FunctionCallExpression(new RangeExpression(first, second), 'SUM');
      const value = func.evaluate(grid);
      expect(value).toEqual(cellValue.value * 2);
    })
    it('Should AVG values in range', () => {
      func = new FunctionCallExpression(new RangeExpression(first, second), 'AVG');
      const value = func.evaluate(grid);
      expect(value).toEqual(cellValue.value);
    })
  })
  describe('Error', () => {
    it('should throw an error when unknown function is used', () => {
      func = new FunctionCallExpression(new ParametersExpression([first, second]), 'UNKNOWN');
      expect(() => func.evaluate(grid)).toThrowError();
    })
  })
})