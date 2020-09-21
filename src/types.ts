import { FunctionCallExpression, IdentifierExpression, ParametersExpression } from './compiler/expressions';

export interface Cell {
  formula: string;
  value: number | string;
}

export interface AppState {
  grid: Grid;
}

export type Grid = Array<Array<Cell>>;

export type ParameterExpression = (FunctionCallExpression | ParametersExpression | IdentifierExpression)[]
export interface Payload {
  cell: {
    row: number;
    column: number;
  };
  value: {
    formula: string;
    value: string | number;
  };
}