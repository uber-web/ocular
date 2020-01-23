import React from 'react';
import styled from 'styled-components';

import ChevronDown from '../components/chevron-down';

export const TocChevron = styled(ChevronDown)`
  height: 16px;
  width: 16px;
  position: absolute;
  left: ${props => props.$depth * 24 + 36}px;
  top: 20px;
  transform: ${props => props.$isTocOpen ? 'none' : 'rotate(-90deg)'};
  transition: transform 0.3s;
`;

export const TocEntry = styled.div`
  font: ${props => props.theme.typography.font350};
  border-top: 1px solid ${props => props.$depth ? 'tranparent' : props.theme.colors.mono500};
  border-bottom: 1px solid ${props => props.$depth ? 'tranparent' : props.theme.colors.mono500};
  color: ${props => props.$depth ? props.theme.colors.mono800 : props.theme.colors.mono1000};
  cursor: pointer;
  margin: -0.5px 0;
  position: relative;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const TocHeader = styled.span`
  display: block;
  padding: 16px 16px 16px ${props => props.$depth * 24 + 60}px;
  &:hover {
    background: ${props => props.theme.colors.mono200}
  }
`;

export const TocLink = styled.div`
  a {
    display: block;
    padding: 16px 16px 16px ${props => props.$depth * 24 + 60}px;
    color: ${props => props.$active ? props.theme.colors.primary400 : (props.$depth ? props.theme.colors.mono800 : props.theme.colors.mono1000)} !important;
    text-decoration: none;
  }
  &:hover {
    background: ${props => props.theme.colors.mono200};
  }
`;

export const TocSubpages = styled.ul`
  list-style: none;
  margin: 0;
  max-height: ${props => props.$height * 56}px;
  overflow: hidden;
  padding: 0;
  transition: max-height 0.3s;
`;

export const TocContainer = styled.div`
  @media screen and (min-width: ${props => props.theme.breakpoints.medium}px) {
    position: fixed;
    top: ${props => props.theme.sizing.scale1600};
    max-width: 300px;
    height: 100%;
    z-index: 2;
    border-right: 1px solid ${props => props.theme.colors.mono500};
    overflow-y: scroll;
    overflow-x: hidden;
    width: 100%;
  },
  @media screen and (max-width: ${props => props.theme.breakpoints.medium}px) {
    border-right: none;
    position: sticky;
    top: 56px; /* height of toc toggle, ie 20 + 18 * 2 */
    transition: opacity 0.3s, transform 0.3s;
    opacity: ${props => props.$isTocOpen ? 1 : 0};
    max-height: ${props => props.$isTocOpen ? 'unset' : 0};
    overflow: ${props => props.$isTocOpen ? 'visible' : 'hidden'};
    transform: ${props => props.$isTocOpen ? 'translateY(0)' : 'translateY(30px)'};
  }
`;

const StyledTocToggle = styled.div`
  font: ${props => props.theme.typography.font350};
  background: ${props => props.theme.colors.mono1000};
  color: ${props => props.theme.colors.mono100};
  align-ttems: center;
  padding: 18px 24px;
  position: sticky;
  top: 0,
  user-select: none;
  z-index: 10;
  @media screen and (max-width: ${props => props.theme.breakpoints.medium}px) {
    display: flex;
  },
  @media screen and (min-width: ${props => props.theme.breakpoints.medium}px) {
    display: none;
  }
`;

const TocToggleChevron = styled.div`
  display: inline;
  height: ${props => props.theme.sizing.scale600};
  margin-right: ${props => props.theme.sizing.scale600};
  transform: ${props => props.$isTocOpen ? 'none' : 'rotate(-90deg)'};
  transition: transform 0.3s;
  width: ${props => props.theme.sizing.scale600};
`;

export const TocToggle = ({toggleToc, isTocOpen, isMenuOpen}) => {
  return isMenuOpen ? null : (
    <StyledTocToggle onClick={toggleToc}>
      <TocToggleChevron $isTocOpen={isTocOpen}>
        <TocChevron />
      </TocToggleChevron>
      Table of Contents
    </StyledTocToggle>
  );
};
