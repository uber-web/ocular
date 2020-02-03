import styled from 'styled-components';
import {Link} from 'gatsby';

// example

export const MainExample = styled.main`
  width: 100%;
  height: 100%;
  position: relative;
`;

// examples

export const MainExamples = styled.main`
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: ${props => props.theme.breakpoints.medium}) {
    padding-top: 96px;
  }
`;

export const ExampleCard = styled(Link)`
  border: ${props => props.theme.borders.border300};
  cursor: pointer;
  text-decoration: none;
  outline: none;
  margin: ${props => props.theme.sizing.scale400};
  padding: ${props => props.theme.sizing.scale700} ${props => props.theme.sizing.scale600} ${props => props.theme.sizing.scale700} ${props => props.theme.sizing.scale600};
  transition: background ${props => props.theme.animation.timing400} border-color ${props => props.theme.animation.timing400};
  transition-timing-function: ${props => props.theme.animation.easeInOutCurve};
  &:hover {
    background: ${props => props.theme.colors.mono200};
    border-color: transparent;
  }
`;

export const ExampleTitle = styled.div`
  color: ${props => props.theme.colors.mono1000};
  font: ${props => props.theme.typography.font300};
  margin-bottom: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 150px;
`;

export const PanelContainer = styled.div`
  font: ${props => props.theme.typography.font300};
  position: absolute;
  top: 0;
  right: 0;
  width: 344px;
  background: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.lighting.shadow400};
  margin: ${props => props.theme.sizing.scale800};
  padding: ${props => props.theme.sizing.scale400} ${props => props.theme.sizing.scale800};
  max-height: 96%;
  overflow-x: hidden;
  overflow-y: auto;
  overflow-y: overlay;
  outline: none;
  z-index: 1;
`;

export const PanelTitle = styled.h3`
  font: ${props => props.theme.typography.font450};
  margin: ${props => props.theme.sizing.scale300} 0;
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
    background: ${props => props.theme.colors.white};
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
      background: ${props => props.theme.colors.white};
    }
    &[type="checkbox"] {
      height: auto;
    }
  }
  p {
    margin-bottom: ${props => props.theme.sizing.scale600};
    white-space: initial;
  }
`;

export const SourceLink = styled.a`
  display: block;
  text-align: right;
  margin-top: ${props => props.theme.sizing.scale300};
  font: ${props => props.theme.typography.font250};
  color: ${props => props.theme.colors.mono800};
`;
