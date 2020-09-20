import { Grid} from '@/types';

export const alphabeticPositions: { [key: string]: number } = {
    'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5,
    'G': 6, 'H': 7, 'I': 8, 'J': 9, 'K': 10, 'L': 11,
    'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18,
    'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24,
    'Z': 25
}

export function initialiseGrid(): Grid {
  const row = new Array(50).fill([]);
  for(let i = 0; i < 50; i++) {
    row[i] = (new Array(26)).fill(0).map(() => ({ formula: '', value: ''}));
  }
  return row;
}

export const alphabets = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];