import { useState } from 'react';
import { getRandomTetromino } from '../tetrominos';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    position: { x: 0, y: 0 },
    tetromino: getRandomTetromino().shape,
    collided: false,
  });

  return [player];
};
