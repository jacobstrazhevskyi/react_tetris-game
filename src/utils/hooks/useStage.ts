import { useEffect, useState } from 'react';
import { createStage } from '../gameHelpers';
import { Tetromino } from '../tetrominos';

type Player = {
  position: {
    x: number,
    y: number,
  },
  tetromino: Tetromino,
  collided: boolean,
};

type ResetPlayer = () => void;

export const useStage = (player: Player, resetPlayer: ResetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = (stage) => {
      let newStage = [...stage];
      let rowsCleared = 0;

      for (let y = 0; y < newStage.length; y++) {
        if (newStage[y].every(cell => cell[0] !== 0)) {
          rowsCleared += 1;
          newStage.splice(y, 1);
          newStage.unshift(new Array(newStage[0].length).fill([0, 'clear']));
          y -= 1;
        }
      }

      setRowsCleared(prev => prev + rowsCleared);

      return newStage;
    };

    const updateStage = (prevStage) => {
      console.log('stage');
      const newStage = prevStage.map(row => (
        row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      ));

      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.position.y][x + player.position.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
            ];
          }
        });
      });

      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }

      return newStage;
    };

    setStage(prev => updateStage(prev));
  }, [player, resetPlayer, rowsCleared]);

  return [stage, setStage];
};
