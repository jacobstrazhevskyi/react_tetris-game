import React from 'react';

import { Box, styled } from '@mui/material';
import { TetrominoName, TETROMINOS } from '../../utils/tetrominos';

type Props = {
  type: TetrominoName,
};

type CellProps = {
  type: TetrominoName,
  color: string,
};

const StyledCell = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'type' && prop !== 'color',
})<CellProps>(({ type, color }) => ({
  width: 'auto',
  backgroundColor: `rgba(${color}, 0.8)`,
  border: `${type === 0 ? '0px solid' : '4px solid'}`,
  borderBottomColor: `rgba(${color}, 0.1)`,
  borderRightColor: `rgba(${color}, 1)`,
  borderTopColor: `rgba(${color}, 1)`,
  borderLeftColor: `rgba(${color}, 0.3)`,
}));

export const Cell: React.FC<Props> = ({ type }) => (
  <StyledCell
    type={type}
    color={TETROMINOS[type].color}
  />
);
