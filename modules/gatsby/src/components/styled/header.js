import React from 'react';
import {Link} from 'gatsby';

import {styled} from 'baseui';

export const Header = styled('header', ({$theme}) => ({
  alignItems: 'center',
  backgroundColor: $theme.colors.mono1000,
  color: $theme.colors.mono100,
  display: 'flex',
  height: $theme.sizing.scale1600,
  justifyContent: 'space-between',
  padding: `0 36px`,
  top: 0,
  left: 0,
  width: '100%',
  userSelect: 'none',
  [`@media screen and (min-width: ${$theme.breakpoints.medium}px)`]: {
    position: 'fixed'
  },
  [`@media screen and (max-width: ${$theme.breakpoints.medium}px)`]: {
    position: 'static'
  }
}));

export const HeaderContainer = styled('div', ({$theme, ...props}) => ({
  gridColumn: '1 / 3',
  gridRow: '1 / 2',
  zIndex: 2,
  [`@media screen and (max-width: ${$theme.breakpoints.medium}px)`]: {
    order: 1
  }
}));

export const HeaderMenuBlock = styled('div', ({$theme, ...props}) => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row'
}));

export const HeaderLogo = styled('a', ({$theme}) => ({
  ...$theme.typography.font600,
  textDecoration: 'none',
  fontFamily: 'Uber Move',
  fontWeight: 500,
  fontSize: '28px',
  ':visited': {color: $theme.colors.mono100},
  ':active': {color: $theme.colors.mono100},
  ':hover': {color: $theme.colors.mono100}
}));

export const HeaderMenu = styled('div', ({$theme, $collapsed, $nbItems}) => ({
  background: $theme.colors.mono1000,
  display: 'flex',
  flexDirection: 'column',
  [`@media screen and (max-width: ${$theme.breakpoints.medium}px)`]: {
    height: `calc(100% - ${$theme.sizing.scale1600})`,
    left: '-36px',
    marginLeft: '36px',
    padding: `${$theme.sizing.scale2400} ${$theme.sizing.scale800} ${$theme.sizing.scale1600} ${$theme.sizing.scale500}`,
    position: 'fixed',
    top: $theme.sizing.scale1600,
    transform: $collapsed ? 'translate(-100%)' : 'translate(0)',
    overflow: 'hidden',
    transition: 'transform 0.3s',
    width: '100%',
    zIndex: 100,
  },
  [`@media screen and (min-width: ${$theme.breakpoints.medium}px)`]: {
    position: 'fixed',
    minWidth: '180px',
    maxHeight: $collapsed ? 0 : `${$nbItems * 48}px`,
    top: $theme.sizing.scale1600,
    left: $theme.sizing.scale600,
    overflow: 'hidden',
    transition: 'max-height 0.3s'
  }
}));

export const HeaderMenuLink = styled('a', ({$theme, ...props}) => {
  return {
  display: 'block',
  padding: `0 ${$theme.sizing.scale1600}`,
  textDecoration: 'none',
  [`@media screen and (min-width: ${$theme.breakpoints.medium}px)`]: {
    ...$theme.typography.font300,
    lineHeight: $theme.sizing.scale1200,
  },
  [`@media screen and (max-width: ${$theme.breakpoints.medium}px)`]: {
    fontSize: '36px',
    lineHeight: $theme.sizing.scale1600
  },
  ':visited': {color: $theme.colors.mono100},
  ':active': {color: $theme.colors.mono100},
  ':hover': {color: $theme.colors.mono100}
}});

export const HeaderLinksBlock = styled('div', ({$theme, ...props}) => ({
  display: 'flex',
  alignItems: 'center'
}));

const StyledHamburgerMenu = styled('div', ({$theme}) => ({
  cursor: 'pointer',
  justifyContent: 'space-between',
  display: 'flex',
  flexDirection: 'column',
  padding: '3px 1px 4px',
  marginRight: $theme.sizing.scale600,
  height: $theme.sizing.scale800,
  width: $theme.sizing.scale800
}));

const HamburgerBar = styled('div', ({$theme}) => ({
  backgroundColor: $theme.colors.mono100,
  height: '3px',
  width: '100%'
}));

export const HamburgerMenu = ({onClick}) => (
  <StyledHamburgerMenu onClick={onClick}>
    <HamburgerBar />
    <HamburgerBar />
    <HamburgerBar />
  </StyledHamburgerMenu>
);

export const HeaderA = styled('a', ({$theme}) => ({
  color: $theme.colors.mono100,
  textDecoration: 'none',
  ':visited': {color: $theme.colors.mono100},
  ':active': {color: $theme.colors.mono600},
  ':hover': {color: $theme.colors.mono600}
}));

export const HeaderLink = styled(Link, ({$theme}) => ({
  color: $theme.colors.mono100,
  textDecoration: 'none',
  ':visited': {color: $theme.colors.mono100},
  ':active': {color: $theme.colors.mono600},
  ':hover': {color: $theme.colors.mono600}
}));

export const HeaderLinkContainer = styled('div', ({$theme}) => ({
  ...$theme.typography.font300,
  flex: '1 1 0',
  marginLeft: $theme.sizing.scale700
}));
