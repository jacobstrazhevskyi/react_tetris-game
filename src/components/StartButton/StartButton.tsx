import { Button, styled } from '@mui/material';
import React from 'react';

const StyledButton = styled(Button)({
  boxSizing: 'border-box',
  margin: '0 0 20px 0',
  padding: '20px',
  minHeight: '30px',
  width: '100%',
  borderRadius: '20px',
  color: 'white',
  background: '#333333',
  fontSize: '1rem',
  cursor: 'pointer',
});

type Props = {
  callback: () => void,
};

export const StartButton: React.FC<Props> = ({
  callback,
}) => (
  <StyledButton
    onClick={callback}
  >
    Start Game
  </StyledButton>
);
