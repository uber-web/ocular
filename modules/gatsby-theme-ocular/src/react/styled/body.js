import styled from 'styled-components';

// top-level layoout
export const BodyContainerFull = styled.div`
  margin: 0 auto;
`;


// the problem the following is solving is what happens if the document is very long
// on a responsive device. If the user toggles the table of content, because the
// document is long, the TOC will be not visible (above the viewport).
// to address that, when the TOC is open, we are removing the document from the flow, so
// that the TOC will be visible. Now, there are several ways to do that, some of which
// introduce another problem - when closing the table of contents, we want the user to be
// back exactly where they were before they opened it, as opposed to back on the top.
// that's one way to approach this -
export const BodyContainerToC = styled.div`
  height: 100%;
  width: 100%;
  @media screen and (min-width: ${props => props.theme.breakpoints.medium}px) {
    padding: ${props => props.theme.sizing.scale500} ${props => props.theme.sizing.scale500} ${props => props.theme.sizing.scale500} calc(300px + ${props => props.theme.sizing.scale500});
    transform: scaleY(1);
    opacity: 1
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.medium}px) {
    padding: ${props => props.theme.sizing.scale500};
    order: 2;
    transition: opacity 0.3s;
    transform: ${props => props.$isTocOpen || props.$isMenuOpen ? 'scaleY(0)' : 'scaleY(1)'};
    opacity: ${props => props.$isTocOpen || props.$isMenuOpen ? 0 : 1};
  }
`;

export const Body = styled.div`
  height: 100vh;
`;
