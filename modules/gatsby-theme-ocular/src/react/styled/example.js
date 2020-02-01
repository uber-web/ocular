import styled from 'styled-components';
import {Link} from 'gatsby';

// example

export const MainExample = styled.main`
  height: calc(100vh - 96px);
  @media screen and (max-width: ${props => props.theme.breakpoints.medium}) {
    padding-top: 96px;
  }
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
