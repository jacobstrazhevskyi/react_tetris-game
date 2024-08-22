import { Box, styled } from '@mui/material';
import React, { useState } from 'react';
import { Stage } from '../Stage';
import { Display } from '../Display';
import { StartButton } from '../StartButton';
import { usePlayer } from '../../utils/hooks/usePlayer';
import { useStage } from '../../utils/hooks/useStage';

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

  const [player] = usePlayer();
  const [stage, setStage] = useStage(player);

  console.log('rerender');

  return (
    <StyledBox>
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
          <StartButton callback={() => { }} />
        </StyledDisplayBox>
      </StyledTetrisWrapper>
    </StyledBox>
  );
};
