export interface Cell {
  formular: string;
  value: number | string;
}

export interface AppState {
  grid: Grid;
}

export type Grid = Array<Array<Cell>>;

export interface Payload {
  cell: {
    row: number;
    column: number;
  };
  value: {
    formular: string;
    value: string | number;
  };
}