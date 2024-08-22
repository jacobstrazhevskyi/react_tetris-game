import { Box, styled, Typography } from '@mui/material';
import React from 'react';

type Props = {
  gameOver: boolean,
  text: string,
};

type StyledBoxCustomProps = {
  gameOver: boolean,
};

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'gameOver',
})<StyledBoxCustomProps>(({ gameOver }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  margin: '0 0 20px 0',
  padding: '20px',
  border: '4px solid #333',
  minHeight: '30px',
  width: '100%',
  borderRadius: '20px',
  color: `${gameOver ? 'red' : '#999'}`,
  background: '#000000',
}));

export const Display: React.FC<Props> = ({
  gameOver,
  text,
}) => (
  <StyledBox
    gameOver={gameOver}
  >
    <Typography>
      {text}
    </Typography>
  </StyledBox>
);
