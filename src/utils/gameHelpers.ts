import { Player } from '../types/Player';
import { Stage } from '../types/Stage';

export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

type CoordinatesProps = {
  x: number,
  y: number,
};

export const createStage = (): Stage => (
  Array.from(Array(STAGE_HEIGHT), () => (
    new Array(STAGE_WIDTH).fill([0, 'clear'])
  ))
);

export const checkCollision = (
  player: Player,
  stage: Stage,
  { x: moveX, y: moveY }: CoordinatesProps,
) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      if (player.tetromino[y][x] !== 0) {
        if (!stage[y + player.position.y + moveY]) {
          return true;
        }

        if (!stage[y + player.position.y + moveY][x + player.position.x + moveX]) {
          return true;
        }

        if (stage[y + player.position.y + moveY][x + player.position.x + moveX][1] !== 'clear') {
          return true;
        }
      }
    }
  }

  return false;
};
