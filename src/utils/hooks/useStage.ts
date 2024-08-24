import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { createStage } from '../gameHelpers';

import { Player } from '../../types/Player';
import { Stage } from '../../types/Stage';

type ResetPlayer = () => void;

type ReturnFromUseStage = [
  Stage,
  Dispatch<SetStateAction<Stage>>,
  number,
];

export const useStage = (player: Player, resetPlayer: ResetPlayer): ReturnFromUseStage => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    const sweepRows = (stageToSweep: Stage) => {
      const newStage = [...stageToSweep];
      let clearedRows = 0;

      for (let y = 0; y < newStage.length; y++) {
        if (newStage[y].every(cell => cell[0] !== 0)) {
          clearedRows += 1;
          newStage.splice(y, 1);
          newStage.unshift(new Array(newStage[0].length).fill([0, 'clear']));
        }
      }

      setRowsCleared(prev => prev + clearedRows);

      return newStage;
    };

    const updateStage = (prevStage: Stage) => {
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
    setRowsCleared(0);
  }, [player, resetPlayer, rowsCleared]);

  return [stage, setStage, rowsCleared];
};
