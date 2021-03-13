import styled from 'styled-components';
import {Link} from 'gatsby';
import {isMobile} from './body';

// example

export const MainExample = styled.main`
  width: 100%;
  height: 100%;
  position: relative;
`;

// examples

export const ExampleHeader = styled.div`
  font: ${props => props.theme.typography.font500};
  color: ${props => props.theme.colors.mono800};
  margin: 0 ${props => props.theme.sizing.scale700};
  border-bottom: 1px solid ${props => props.theme.colors.mono500};
  display: inline-block;
  padding: ${props => props.theme.sizing.scale700} ${props => props.theme.sizing.scale700} ${props => props.theme.sizing.scale100} 0;
`;

export const MainExamples = styled.main`
  padding: ${props => props.theme.sizing.scale600} 0;
`;

export const ExamplesGroup = styled.main`
  display: flex;
  flex-wrap: wrap;
  padding: ${props => props.theme.sizing.scale600};
`;

export const ExampleCard = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  width: 50%;
  max-width: 240px;
  line-height: 0;
  outline: none;
  padding: ${props => props.theme.sizing.scale100};
  position: relative;
  img {
    transition-property: filter;
    transition-duration: ${props => props.theme.animation.timing400};
    transition-timing-function: ${props => props.theme.animation.easeInOutCurve};
  }
  &:hover {
    box-shadow: ${props => props.theme.lighting.shadow600};
  }
  &:hover img {
    filter: contrast(0.2);
  }
  ${isMobile} {
    width: 33%;
    min-width: 200px;
  }
  @media screen and (max-width: 632px) {
    width: 50%;
  }
`;

export const ExampleTitle = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: ${props => props.theme.colors.mono100};
  font: ${props => props.theme.typography.font300};
  font-size: 1.5em;
  text-align: center;
  width: 90%;
  height: 90%;
  top: 5%;
  left: 5%;
  border: solid 1px ${props => props.theme.colors.mono100};
  opacity: 0;
  transition-property: opacity;
  transition-duration: ${props => props.theme.animation.timing400};
  transition-timing-function: ${props => props.theme.animation.easeInOutCurve};
  &:hover {
    opacity: 1
  }
`;

export const PanelContainer = styled.div`
  font: ${props => props.theme.typography.font300};
  position: absolute;
  top: 0;
  right: 0;
  width: 344px;
  background: ${props => props.theme.colors.mono100};
  box-shadow: ${props => props.theme.lighting.shadow400};
  margin: ${props => props.theme.sizing.scale800};
  padding: ${props => props.theme.sizing.scale400} ${props => props.theme.sizing.scale800};
  max-height: 96%;
  overflow-x: hidden;
  overflow-y: auto;
  overflow-y: overlay;
  outline: none;
  z-index: 1;

  ${isMobile} {
    width: auto;
    left: 0;
  }
`;

export const PanelExpander = styled.div`
  display: none;
  width: ${props => props.theme.sizing.scale600};
  height: ${props => props.theme.sizing.scale600};
  font-family: serif;
  font-size: 0.8em;
  text-align: center;
  line-height: ${props => props.theme.sizing.scale600};
  border-radius: 50%;
  background: ${props => props.$expanded ? 'none' : props.theme.colors.mono900};
  color: ${props => props.$expanded ? props.theme.colors.mono1000 : props.theme.colors.mono100};
  ${isMobile} {
    display: block;
  }
`;

export const PanelTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font: ${props => props.theme.typography.font450};
  margin: ${props => props.theme.sizing.scale300} 0;
  ${isMobile} {
    cursor: pointer;
  }
`;

export const PanelContent = styled.div`
  div >* {
    vertical-align: middle;
    white-space: nowrap;
  }
  div >label {
    display: inline-block;
    width: 40%;
    margin-right: 10%;
    color: ${props => props.theme.colors.momo800};
    margin-top: 2px;
    margin-bottom: 2px;
  }
  div >input, div >a, div >button, div >select {
    background: ${props => props.theme.colors.mono100};
    font: ${props => props.theme.typography.font100};
    line-height: ${props => props.theme.sizing.scale700};
    text-transform: none;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
    padding: 0 ${props => props.theme.sizing.scale100};
    width: 50%;
    height: ${props => props.theme.sizing.scale700};
    text-align: left;
  }
  div >button {
    color: initial;
  }
  div >button:disabled {
    color: ${props => props.theme.colors.mono300};
    cursor: default;
    background: ${props => props.theme.colors.mono300};
  }
  div >input {
    border: ${props => props.theme.borders.border300};
    &:disabled {
      background: ${props => props.theme.colors.mono100};
    }
    &[type="checkbox"] {
      height: auto;
    }
  }
  p {
    margin-bottom: ${props => props.theme.sizing.scale600};
    white-space: initial;
  }
  ${isMobile} {
    display: ${props => props.$expanded ? 'block' : 'none'};
  }
`;

export const SourceLink = styled.a`
  display: block;
  text-align: right;
  margin-top: ${props => props.theme.sizing.scale300};
  font: ${props => props.theme.typography.font250};
  color: ${props => props.theme.colors.mono800};
  ${isMobile} {
    display: ${props => props.$expanded ? 'block' : 'none'};
  }
`;
