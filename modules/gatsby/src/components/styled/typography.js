import React from 'react';

import {styled} from 'baseui';

export {H4, H5, H6} from 'baseui/typography';

export const H1 = styled('h1', ({$theme}) => ({
  ...$theme.typography.font700,
  fontFamily: 'Uber Move',
  letterSpacing: '0.02em',
  margin: '36px 0 24px'
}));

export const H2 = styled('h2', ({$theme}) => ({
  ...$theme.typography.font500,
  fontFamily: 'Uber Move',
  margin: '16px 0 24px'
}));

export const H3 = styled('h3', ({$theme}) => ({
  fontFamily: 'Uber Move',
  ...$theme.typography.font350,
}));

export const P = styled('p', ({$theme}) => ({
  fontFamily: 'Uber Move',
  ...$theme.typography.font300,
  margin: '20px 0'
}));
