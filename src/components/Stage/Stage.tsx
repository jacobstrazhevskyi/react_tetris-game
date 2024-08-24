import { Box, styled } from '@mui/material';
import uuid from 'react-uuid';
import React from 'react';
import { Cell } from '../Cell';
import { Stage as StageType } from '../../types/Stage';
import { TetrominoName } from '../../utils/tetrominos';

type Props = {
  stage: StageType,
};

type StyledBoxCustomProps = {
  width: number,
  height: number,
};

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'width' && prop !== 'height',
})<StyledBoxCustomProps>(({ width, height }) => ({
  display: 'grid',
  gridTemplateRows: `repeat(${height}, calc(25vw / ${width}))`,
  gridTemplateColumns: `repeat(${width}, 1fr)`,
  gridGap: '1px',
  border: '2px solid #333',
  width: '100%',
  maxWidth: '25vw',
  background: '#111111',
}));

export const Stage: React.FC<Props> = ({ stage }) => (
  <StyledBox
    width={stage[0].length}
    height={stage.length}
  >
    {stage.map(
      (row) => row.map(
        (cell) => (
          <Cell
            key={uuid()}
            type={cell[0] as TetrominoName | 0} 
          />
        ),
      ),
    )}
  </StyledBox>
);
