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
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  userSelect: 'none',
}));

export const HeaderContainer = styled('div', ({$theme, ...props}) => ({
  gridColumn: '1 / 3',
  gridRow: '1 / 2',
  zIndex: 2,
  [`@media screen and (max-width: ${$theme.breakpoints.medium})`]: {
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
  fontFamily: 'Uber Move',
  fontWeight: 500,
  fontSize: '28px',
  ':visited': {color: $theme.colors.mono100},
  ':active': {color: $theme.colors.mono100},
  ':hover': {color: $theme.colors.mono100}
}));

export const HeaderMenu = styled('div', ({$theme, $collapsed, $nbItems}) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  background: $theme.colors.mono1000,
  minWidth: '180px',
  maxHeight: $collapsed ? 0 : `${$nbItems * 48}px`,
  top: '64px',
  left: '16px',
  overflow: 'hidden',
  transition: 'max-height 0.3s'
}));

export const HeaderMenuLink = styled('a', ({$theme}) => ({
  display: 'block',
  lineHeight: '48px',
  padding: '0 16px',
  ':visited': {color: $theme.colors.mono100},
  ':active': {color: $theme.colors.mono100},
  ':hover': {color: $theme.colors.mono100}
}))

export const HeaderLinksBlock = styled('div', ({$theme, ...props}) => ({
  display: 'flex',
  alignItems: 'center'
}));

const StyledHamburgerMenu  = styled('div', ({$theme}) => ({
  justifyContent: 'space-between',
  display: 'flex',
  flexDirection: 'column',
  padding: '3px 1px 4px',
  marginRight: $theme.sizing.scale600,
  height: $theme.sizing.scale800,
  width: $theme.sizing.scale800,
}));

const HamburgerBar = styled('div', ({$theme}) => ({
  backgroundColor: $theme.colors.mono100,
  height: '3px',
  width: '100%',
}));

export const HamburgerMenu = ({onClick}) => <StyledHamburgerMenu onClick={onClick}>
  <HamburgerBar />
  <HamburgerBar />
  <HamburgerBar />
</StyledHamburgerMenu>

export const HeaderA = styled('a', ({$theme}) => ({
  color: $theme.colors.mono100,
  ':visited': {color: $theme.colors.mono100},
  ':active': {color: $theme.colors.mono600},
  ':hover': {color: $theme.colors.mono600}
}));

export const HeaderLink = styled(Link, ({$theme}) => ({
  color: $theme.colors.mono100,
  ':visited': {color: $theme.colors.mono100},
  ':active': {color: $theme.colors.mono600},
  ':hover': {color: $theme.colors.mono600}
}));

export const HeaderLinkContainer = styled('div', ({$theme}) => ({
  ...$theme.typography.font300,
  flex: '1 1 0',
  marginLeft: $theme.sizing.scale700
}));
