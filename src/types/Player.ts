import { TetrominoShape } from '../utils/tetrominos';

export interface Player {
  position: {
    x: number,
    y: number,
  },
  tetromino: TetrominoShape,
  collided: boolean,
}
