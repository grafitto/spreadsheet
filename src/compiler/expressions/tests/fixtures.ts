import { alphabeticPositions } from '@/helpers/grid';
import { Grid } from '@/types';

export const fixtures = {
  insertDataToGrid: (grid: Grid, name: string, value: { formular: string; value: number | string }) => {
    const column = alphabeticPositions[name[0].toUpperCase()];
    const row = parseInt(name[1]) - 1;
    grid[row][column] = value;
    return grid;
  }
}