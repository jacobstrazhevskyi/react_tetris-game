/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { useCallback, useState } from 'react';
import { getRandomTetromino, TETROMINOS, TetrominoShape } from '../tetrominos';
import { checkCollision, STAGE_WIDTH } from '../gameHelpers';
import { Stage } from '../../types/Stage';
import { Player } from '../../types/Player';

type UpdatePlayerPositionProps = {
  x: number,
  y: number,
  collided: boolean,
};

type ReturnFromUsePlayer = [
  Player,
  ({ x, y, collided }: UpdatePlayerPositionProps) => void,
  () => void,
  (stage: Stage, direction: number) => void,
];

export const usePlayer: () => ReturnFromUsePlayer = () => {
  const [player, setPlayer] = useState({
    position: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const rotate = (matrix: TetrominoShape, direction: number) => {
    const rotatedTetro = matrix.map((_, index) => (
      matrix.map(column => column[index])
    ));

    if (direction > 0) {
      return rotatedTetro.map(row => row.reverse());
    }

    return rotatedTetro.reverse();
  };

  const playerRotate = (stage: Stage, direction: number) => {
    const playerCopy = JSON.parse(JSON.stringify(player));
    playerCopy.tetromino = rotate(playerCopy.tetromino, direction);

    const position = playerCopy.position.x;
    let offset = 1;

    while (checkCollision(playerCopy, stage, { x: 0, y: 0 })) {
      playerCopy.position.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > playerCopy.tetromino[0].length) {
        rotate(playerCopy.tetromino, -direction);
        playerCopy.position.x = position;
        return;
      }
    }

    setPlayer(playerCopy);
  };

  const updatePlayerPosition = ({ x, y, collided }: UpdatePlayerPositionProps) => {
    setPlayer(prev => ({
      ...prev,
      position: { x: (prev.position.x + x), y: (prev.position.y + y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      position: { x: (STAGE_WIDTH / 2 - 2), y: 0 },
      tetromino: getRandomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPosition, resetPlayer, playerRotate];
};
