import { Box, styled } from '@mui/material';
import React, { useState } from 'react';
import { Stage } from '../Stage';
import { Display } from '../Display';
import { StartButton } from '../StartButton';
import { usePlayer } from '../../utils/hooks/usePlayer';
import { useStage } from '../../utils/hooks/useStage';
import { checkCollision, createStage } from '../../utils/gameHelpers';

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
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPosition, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  // console.log(player);
  // console.log(stage);

  const movePlayer = (direction: number) => {
    // console.log('move');
    if (checkCollision(player, stage, { x: direction, y: 0 })) {
      return;
    }

    updatePlayerPosition({ x: direction, y: 0 });
  };

  const startGame = () => {
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
  };

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPosition({ x: 0, y: 1, collided: false });
    } else {
      if (player.position.y < 1) {
        console.log('GAME OVER!!!');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPosition({ x: 0, y: 0, collided: true });
      console.log('collided');
    }
  };

  const dropPlayer = () => {
    drop();
  };

  const move = ({ keyCode }) => {
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

  return (
    <StyledBox
      role="button"
      tabIndex={0}
      onKeyDown={event => move(event)}
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
              <Display gameOver={gameOver} text="Score" />
              <Display gameOver={gameOver} text="Rows" />
              <Display gameOver={gameOver} text="Level" />
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
