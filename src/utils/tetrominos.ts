 type TetrominoShape = (string | number)[][];

export interface Tetromino {
  shape: TetrominoShape;
  color: string;
  length?: number,
}

export type TetrominoName = 0 | 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

interface Tetrominos {
  0: Tetromino;
  I: Tetromino;
  J: Tetromino;
  L: Tetromino;
  O: Tetromino;
  S: Tetromino;
  T: Tetromino;
  Z: Tetromino;
}

export const TETROMINOS: Tetrominos = {
  0: { shape: [[0]], color: '#000000' },
  I: {
    shape: [
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
    ],
    color: '80, 228, 230',
  },
  J: {
    shape: [
      [0, 'J', 0],
      [0, 'J', 0],
      ['J', 'J', 0],
    ],
    color: '36, 95, 223',
  },
  L: {
    shape: [
      [0, 'L', 0],
      [0, 'L', 0],
      [0, 'L', 'L'],
    ],
    color: '223, 173, 46',
  },
  O: {
    shape: [
      ['O', 'O'],
      ['O', 'O'],
    ],
    color: '223, 217, 36',
  },
  S: {
    shape: [
      [0, 'S', 'S'],
      ['S', 'S', 0],
      [0, 0, 0],
    ],
    color: '48, 211, 56',
  },
  T: {
    shape: [
      [0, 0, 0],
      ['T', 'T', 'T'],
      [0, 'T', 0],
    ],
    color: '132, 61, 198',
  },
  Z: {
    shape: [
      ['Z', 'Z', 0],
      [0, 'Z', 'Z'],
      [0, 0, 0],
    ],
    color: '227, 78, 78',
  },
};

export const getRandomTetromino = () => {
  const tetrominos = 'IJLOSTZ';
  
  const randomTetromino: TetrominoName = tetrominos[
    Math.floor(Math.random() * tetrominos.length)
  ] as TetrominoName;

  return TETROMINOS[randomTetromino];
};
