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
  width: 100vw;
  user-select: none;
  white-space: nowrap;
  position: fixed;
  @media screen and (max-width: ${props => props.theme.breakpoints.medium}px) {
    position: static;
  }
`;

export const HeaderContainer = styled.div`
  grid-column: 1/3;
  grid-row: 1/2;
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
  }
  &:active {
    color: ${props => props.theme.colors.mono200};
  }
  &:hover {
    color: ${props => props.theme.colors.mono200};
  }
`;

export const HeaderMenu = styled.div`
  background: ${props => props.theme.colors.mono1000};
  display: flex;
  flex-direction: column;
  position: fixed;
  overflow: hidden;
  min-width: 180px;
  max-height: ${props => props.$collapsed ? 0 : props.$nbItems * 48}px;
  top: ${props => props.theme.sizing.scale1600};
  left: ${props => props.theme.sizing.scale600};
  transition: max-height 0.3s;

  @media screen and (max-width: ${props => props.theme.breakpoints.medium}px) {
    min-height: initial;
    max-height: initial;
    height: calc(100% - ${props => props.theme.sizing.scale1600});
    left: 0;
    marginLeft: 36px;
    padding: ${props => props.theme.sizing.scale2400} ${props => props.theme.sizing.scale800} ${props => props.theme.sizing.scale1600} ${props => props.theme.sizing.scale500};
    top: ${props => props.theme.sizing.scale1600};
    transform: ${props => props.$collapsed ? 'translate(-100%)' : 'translate(0)'};
    transition: transform 0.3s;
    width: 90%;
    z-index: 100;
  }
`;

export const HeaderMenuLink = styled.a`
  display: block;
  padding: ${props => props.theme.sizing.scale400} ${props => props.theme.sizing.scale1600};
  text-decoration: none;
  font: ${props => props.theme.typography.font300};

  @media screen and (max-width: ${props => props.theme.breakpoints.medium}px) {
    font: ${props => props.theme.typography.font500};
  }
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

export const HeaderMenuDivider = styled.hr`
  margin: ${props => props.theme.sizing.scale800} 0;
  width: 100%;
  border-color: ${props => props.theme.colors.mono500};
`;

export const HeaderLinksBlock = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;

  @media screen and (max-width: ${props => props.theme.breakpoints.medium}px) {
    display: block;
  }
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
  padding-left: ${props => props.theme.sizing.scale700};

  @media screen and (max-width: ${props => props.theme.breakpoints.medium}px) {
    font: ${props => props.theme.typography.font500};
    padding: ${props => props.theme.sizing.scale400} ${props => props.theme.sizing.scale1600};
  }
`;
