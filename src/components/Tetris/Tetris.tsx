import { Box, styled } from '@mui/material';
import React, { useState } from 'react';
import { Stage } from '../Stage';
import { Display } from '../Display';
import { StartButton } from '../StartButton';
import { usePlayer } from '../../utils/hooks/usePlayer';
import { useStage } from '../../utils/hooks/useStage';
import { checkCollision, createStage } from '../../utils/gameHelpers';
import { useInterval } from '../../utils/hooks/useInterval';
import { useGameStatus } from '../../utils/hooks/useGameStatus';

const StyledBox = styled(Box)({
  width: '100vw',
  height: '100vh',
  backgroundColor: '#000000',
  overflow: 'hidden',
});

const StyledTetrisWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  padding: '40px',
  margin: '0 auto',
  maxWidth: '900px',
});

const StyledDisplayBox = styled(Box)({
  width: '100%',
  maxWidth: '200px',
  display: 'block',
  padding: '0 20px',
});

export const Tetris: React.FC = () => {
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPosition, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  const movePlayer = (direction: number) => {
    if (checkCollision(player, stage, { x: direction, y: 0 })) {
      return;
    }

    updatePlayerPosition({ x: direction, y: 0, collided: false });
  };

  const startGame = () => {
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPosition({ x: 0, y: 1, collided: false });
    } else {
      if (player.position.y < 1) {
        console.log('GAME OVER!!!');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPosition({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }: { keyCode: number }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000);
      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const move = ({ keyCode }: { keyCode: number }) => {
    if (gameOver) {
      return;
    }

    if (keyCode === 37) {
      movePlayer(-1);
    }

    if (keyCode === 39) {
      movePlayer(1);
    }

    if (keyCode === 40) {
      dropPlayer();
    }

    if (keyCode === 38) {
      playerRotate(stage, 1);
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledBox
      role="button"
      tabIndex={0}
      onKeyDown={event => move(event)}
      onKeyUp={event => keyUp(event)}
    >
      <StyledTetrisWrapper>
        <Stage
          stage={stage}
        />
        <StyledDisplayBox>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <Box>
              <Display gameOver={gameOver} text={`Score: ${score}`} />
              <Display gameOver={gameOver} text={`Rows: ${rows}`} />
              <Display gameOver={gameOver} text={`Level: ${level}`} />
            </Box>
          )}
          <StartButton
            callback={startGame}
          />
        </StyledDisplayBox>
      </StyledTetrisWrapper>
    </StyledBox>
  );
};
