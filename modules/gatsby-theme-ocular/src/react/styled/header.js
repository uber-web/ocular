import React from 'react';
import {Link} from 'gatsby';

import styled from 'styled-components';

export const Header = styled.header`
  z-index: 1001;
  align-items: center;
  background-color: ${props => props.theme.colors.mono1000};
  color: ${props => props.theme.colors.mono100};
  display: flex;
  height: ${props => props.theme.sizing.scale1600};
  justify-content: space-between;
  padding: 0 36px;
  top: 0;
  left: 0;
  width: 100%;
  user-select: none;
  white-space: nowrap;
  @media screen and (min-width: ${props => props.theme.breakpoints.medium}px) {
    position: fixed;
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.medium}px) {
    position: static;
  }
`;

export const HeaderContainer = styled.div`
  grid-column: 1/3;
  grid-row: 1/2;
  z-index: 2;
  @media screen and (max-width: ${props => props.theme.breakpoints.medium}px) {
    order: 1;
  }
`;

export const HeaderMenuBlock = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

export const HeaderLogo = styled.a`
  font: ${props => props.theme.typography.font450};
  text-decoration: none;
  &:visited {
    color: ${props => props.theme.colors.mono100};
  },
  &:active {
    color: ${props => props.theme.colors.mono200};
  }
  &:hover {
    color: ${props => props.theme.colors.mono200};
  }
`;

export const HeaderMenu = styled.div`
  background: $theme.colors.mono1000,
  display: 'flex',
  flexDirection: 'column',
  @media screen and (max-width: ${props => props.theme.breakpoints.medium}px) {
    height: calc(100% - ${props => props.theme.sizing.scale1600});
    left: -36px;
    marginLeft: 36px;
    padding: ${props => props.theme.sizing.scale2400} ${props => props.theme.sizing.scale800} ${props => props.theme.sizing.scale1600} ${props => props.theme.sizing.scale500};
    position: fixed;
    top: ${props => props.theme.sizing.scale1600};
    transform: ${props => props.$collapsed ? 'translate(-100%)' : 'translate(0)'};
    overflow: hidden;
    transition: transform 0.3s;
    width: 100%;
    z-index: 100;
  },
  @media screen and (min-width: ${props => props.theme.breakpoints.medium}px) {
    position: fixed;
    min-width: 180px;
    max-height: ${props => props.$collapsed ? 0 : props.$nbItems * 48}px;
    top: ${props => props.theme.sizing.scale1600};
    left: ${props => props.theme.sizing.scale600};
    overflow: hidden;
    transition: max-height 0.3s;
  }
`;

export const HeaderMenuLink = styled.a`
  display: block;
  padding: 0 ${props => props.theme.sizing.scale1600};
  text-decoration: none;
  font: ${props => props.theme.typography.font300};

  @media screen and (max-width: ${props => props.theme.breakpoints.medium}px) {
    font-size: 36px;
    line-height: ${props => props.theme.sizing.scale1600};
  },
  &:visited {
    color: ${props => props.theme.colors.mono100};
  }
  &:active {
    color: ${props => props.theme.colors.mono200};
  }
  &:hover {
    color: ${props => props.theme.colors.mono200};
  }
`;

export const HeaderLinksBlock = styled.div`
  display: flex;
  align-items: center;
`;

const StyledHamburgerMenu = styled.div`
  cursor: pointer;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  padding: 3px 1px 4px;
  margin-right: ${props => props.theme.sizing.scale600};
  height: ${props => props.theme.sizing.scale800};
  width: ${props => props.theme.sizing.scale800};
`;

const HamburgerBar = styled.div`
  background-color: ${props => props.theme.colors.mono100};
  height: 3px;
  width: 100%;
`;

export const HamburgerMenu = ({onClick}) => (
  <StyledHamburgerMenu onClick={onClick}>
    <HamburgerBar />
    <HamburgerBar />
    <HamburgerBar />
  </StyledHamburgerMenu>
);

export const HeaderA = styled.a`
  color: ${props => props.theme.colors.mono100};
  text-decoration: none;
  &:visited {
    color: ${props => props.theme.colors.mono100};
  }
  &:active {
    color: ${props => props.theme.colors.mono200};
  }
  &:hover {
    color: ${props => props.theme.colors.mono200};
  }
`;

export const HeaderLink = styled(Link)`
  color: ${props => props.theme.colors.mono100};
  text-decoration: none;
  &:visited {
    color: ${props => props.theme.colors.mono100};
  }
  &:active {
    color: ${props => props.theme.colors.mono200};
  }
  &:hover {
    color: ${props => props.theme.colors.mono200};
  }
`;

export const HeaderLinkContainer = styled.div`
  font: ${props => props.theme.typography.font300};
  flex: 1 1 0;
  margin-left: ${props => props.theme.sizing.scale700}
`;
