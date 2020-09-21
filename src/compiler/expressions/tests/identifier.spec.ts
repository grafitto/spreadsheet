import { initialiseGrid } from '@/helpers/grid';
import { Grid } from '@/types';
import { IdentifierExpression } from ".."
import { fixtures } from './fixtures';

describe('Identifier', () => {
  let identifier: IdentifierExpression;
  let cell = '';
  let grid: Grid;
  let cellValue: any;

  beforeAll(() => {
    cellValue = {
      fixture: '',
      value: 1234
    }
    cell = 'A1';
    grid = initialiseGrid();
    identifier = new IdentifierExpression(cell);
    grid = fixtures.insertDataToGrid(grid, cell, cellValue);
  })

  describe('Success', () => {
    it('Should evaluate to the correct cell value', () => {
      const value = identifier.evaluate(grid);
      expect(value).toStrictEqual(cellValue.value);
    })
  })
  describe('Error', () => {
    beforeAll(() => {
      cellValue = {
        formula: '', value: 'string'
      }
      grid = fixtures.insertDataToGrid(grid, cell, cellValue);
    })
    it('should throw an error if value is a string', () => {
      expect(() => identifier.evaluate(grid)).toThrowError();
    })
  })
})