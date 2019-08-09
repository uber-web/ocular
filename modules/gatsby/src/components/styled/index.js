/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
import React from 'react';

import {styled} from 'baseui';
/* eslint-disable import/prefer-default-export */

// Typography 

export {CodeBlock, H1, H2, H3, H4, H5, H6, InlineCode, MarkdownBody, P, Pre} from './typography';

// top-level layoout

export const BodyContainerFull = styled('div', ({$theme, ...props}) => ({
  margin: '0 auto',

  '.contributors': {
    maxWidth: '400px',
    margin: '100px auto 0'
  }
}));


export const BodyContainerToC = styled('div', ({$theme, ...props}) => ({
  gridColumn: '2 / 3',
  gridRow: '2 / 3',
  width: '100%',
  padding: $theme.sizing.scale500,
  [`@media screen and (max-width: ${$theme.breakpoints.medium})`]: {
    order: 2
  },

  '& > div': {
    maxWidth: $theme.breakpoints.large,
    margin: 'auto'
  },
  '& p': {
    marginBottom: $theme.sizing.scale500
  },

  '& > h1': {
    color: $theme.colors.mono1000
  }
}));

export const BodyGrid = styled('div', ({$theme, ...props}) => ({
  height: '100vh',
  display: 'grid',
  gridTemplateRows: '64px 1fr',
  gridTemplateColumns: '300px 1fr',
  maxWidth: `${$theme.breakpoints.large}px`,
  [`@media screen and (max-width: ${$theme.breakpoints.medium})`]: {
    display: 'flex',
    flexDirection: 'column',
    height: 'inherit'
  }
}));

export const HeaderContainer = styled('div', ({$theme, ...props}) => ({
  gridColumn: '1 / 3',
  gridRow: '1 / 2',
  zIndex: 2,
  [`@media screen and (max-width: ${$theme.breakpoints.medium})`]: {
    order: 1
  }
}));

export const ToCContainer = styled('div', ({$theme, ...props}) => ({
  gridColumn: '1 / 2',
  gridRow: '2 / 3',
  background: $theme.colors.mono200,
  overflow: 'scroll',
  [`@media screen and (max-width: ${$theme.breakpoints.medium})`]: {
    order: 3,
    overflow: 'inherit'
  }
}));

// example

export const MainExample = styled('main', ({$theme, ...props}) => ({
  height: 'calc(100vh - 96px)',
  [`@media screen and (max-width: ${$theme.breakpoints.medium})`]: {
    marginTop: '64px'
  }
}));

// examples

export const MainExamples = styled('main', ({$theme, ...props}) => ({
  background: $theme.colors.mono100,
  display: 'flex',
  flexWrap: 'wrap',
  [`@media screen and (max-width: ${$theme.breakpoints.medium})`]: {
    marginTop: '64px'
  }
}));

export const ExampleCard = styled('div', ({$theme, ...props}) => ({
  border: $theme.borders.border300,
  cursor: 'pointer',
  margin: $theme.sizing.scale400,
  padding: `${$theme.sizing.scale700} ${$theme.sizing.scale600} ${
    $theme.sizing.scale700
  } ${$theme.sizing.scale600}`,
  transition: `background ${$theme.animation.timing400} border-color ${
    $theme.animation.timing400
  }`,
  transitionTimingFunction: $theme.animation.easeInOutCurve,
  '&:hover': {
    background: $theme.colors.mono200,
    borderColor: 'transparent'
  }
}));

export const ExampleTitle = styled('div', ({$theme, ...props}) => ({
  color: $theme.colors.mono1000,
  ...$theme.typography.font200,
  marginBottom: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '150px'
}));

// search

export const SearchContainer = styled('div', ({$theme, ...props}) => ({
  position: 'relative',
  height: $theme.sizing.scale1000,
  marginBottom: '20px',
  background: $theme.colors.mono200
}));

export const IconContainer = styled('div', ({$theme, ...props}) => ({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: $theme.sizing.scale1000,
  height: $theme.sizing.scale1000
}));

export const InputSearch = styled('input', ({$theme, ...props}) => ({
  boxShadow: `rgba(0, 0, 0, 0) 0px 2px 6px`,
  border: `1px solid transparent`,
  transition: `0.3s`,
  fontSize: `14px`,
  fontWeight: 500,
  lineHeight: `20px`,
  padding: `10px 10px 10px 40px`,
  ':focus': {
    boxShadow: `rgba(39, 110, 241, 0.32) 0px 2px 6px`,
    borderColor: `rgb(39, 110, 241)`,
    outline: 'none'
  }
}));

export const MainSearch = styled('main', ({$theme, ...props}) => ({
  maxWidth: '600px',
  margin: '104px auto 0px'
}));
