import {
  useState,
  useEffect,
  useCallback,
  SetStateAction,
  Dispatch,
} from 'react';

type SetterInUseState = Dispatch<SetStateAction<number>>;

type ReturnFromUseGameStatus = [
  number,
  SetterInUseState,
  number,
  SetterInUseState,
  number,
  SetterInUseState,
];

export const useGameStatus = (rowsCleared: number): ReturnFromUseGameStatus => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  const linePoints = [40, 100, 300, 1200];

  const calcScore = useCallback(() => {
    if (rowsCleared > 0) {
      setScore(prev => prev + linePoints[rowsCleared - 1] * (level + 1));
      setRows(prev => prev + rowsCleared);
    }
  }, [level, linePoints, rowsCleared]);

  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared, score, level]);

  return [score, setScore, rows, setRows, level, setLevel];
};
