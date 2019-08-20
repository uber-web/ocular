import React from 'react';
import {Link} from 'gatsby';
import ChevronDown from 'baseui/icon/chevron-down';

import {styled} from 'baseui';

export const TocChevron = styled(ChevronDown, ({$depth}) => ({
  height: '16px',
  width: '16px',
  position: 'absolute',
  left: `${$depth * 24 + 36}px`,
  top: '20px'
}));

export const TocEntry = styled('div', ({$theme, $depth, ...props}) => ({
  ...$theme.typography.font350,
  borderTop: `1px solid ${$depth ? 'tranparent' : $theme.colors.mono500}`,
  borderBottom: `1px solid ${$depth ? 'tranparent' : $theme.colors.mono500}`,
  padding: `16px 16px 16px ${$depth * 24 + 60}px`,
  color: $depth ? $theme.colors.mono800 : $theme.colors.mono1000,
  cursor: 'pointer',
  margin: `-0.5px 0`,
  position: 'relative',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  ':hover': {
    background: $theme.colors.mono200
  }
}));

export const TocLink = styled(Link, ({$depth, $theme}) => {
  const color = $depth ? $theme.colors.mono800 : $theme.colors.mono1000;
  return {
    color: 'color',
    textDecoration: 'none',
    ':visited': color,
    ':active': color,
    ':hover': color
  };
});

export const TocSubpages = styled('ul', ({$height, ...props}) => ({
  listStyle: 'none',
  margin: 0,
  maxHeight: `${$height * 56}px`,
  overflow: $height ? 'scroll' : 'hidden',
  padding: 0,
  transition: 'max-height 0.3s'
}));

export const TocContainer = styled('div', ({$theme, $isTocOpen, ...props}) => ({
  [`@media screen and (min-width: ${$theme.breakpoints.medium}px)`]: {
    borderRight: `1px solid ${$theme.colors.mono500}`,
    gridColumn: '1 / 2',
    gridRow: '2 / 3',
    maxHeight: 'unset',
    opacity: 1,
    overflow: 'scroll',
    transform: 'translateY(0)'
  },
  [`@media screen and (max-width: ${$theme.breakpoints.medium}px)`]: {
    // order: 3,
    borderRight: 'none',
    overflow: 'inherit',
    transition: 'opacity 0.3s, transform 0.3s',
    ...($isTocOpen ? {
      opacity: 1,
      maxHeight: 'unset',
      transform: 'translateY(0)'
    } : {
      opacity: 0,
      maxHeight: 0,
      overflow: 'hidden',
      transform: 'translateY(30px)'
    })
  }
}));

const StyledTocToggle = styled('div', ({$theme}) => ({
  ...$theme.typography.font300,
  fontFamily: 'Uber Move',
  background: $theme.colors.mono1000,
  color: $theme.colors.mono100,
  alignItems: 'center',
  padding: '18px 24px',
  position: 'sticky',
  top: 0,
  userSelect: 'none',
  zIndex: 10,
  [`@media screen and (min-width: ${$theme.breakpoints.medium}px)`]: {
    display: 'none'
  },
  [`@media screen and (max-width: ${$theme.breakpoints.medium}px)`]: {
    display: 'flex',
  }
}));

const TocToggleChevron = styled('div', ({$theme, $isTocOpen}) => ({
  display: 'inline',
  height: $theme.sizing.scale600,
  marginRight: $theme.sizing.scale600,
  transform: $isTocOpen ? 'none' : 'rotate(-90deg)',
  transition: 'transform 0.3s',
  width: $theme.sizing.scale600
}));

export const TocToggle = ({toggleToc, isTocOpen}) => (
  <StyledTocToggle onClick={toggleToc}>
    <TocToggleChevron $isTocOpen={isTocOpen}>
      <ChevronDown />
    </TocToggleChevron>
    Table of Contents
  </StyledTocToggle>
);
