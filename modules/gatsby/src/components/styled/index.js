/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
import React from 'react';
import ChevronDown from 'baseui/icon/chevron-down';
import {styled} from 'baseui';

// Typography

export {
  A,
  CodeBlock,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  List,
  ListItem,
  BlockQuote,
  Table,
  TableHeaderCell,
  TableBodyCell,
  InlineCode,
  MarkdownBody,
  P,
  Pre
} from './typography';

// Header

export {
  HamburgerMenu,
  Header,
  HeaderA,
  HeaderContainer,
  HeaderLink,
  HeaderLinkContainer,
  HeaderLinksBlock,
  HeaderLogo,
  HeaderMenu,
  HeaderMenuBlock,
  HeaderMenuLink
} from './header';

// toc

export {
  TocChevron,
  TocContainer,
  TocEntry,
  TocHeader,
  TocLink,
  TocSubpages,
  TocToggle
} from './toc';

// top-level layoout

export const BodyContainerFull = styled('div', ({$theme, ...props}) => ({
  margin: '0 auto'
}));

export const BodyContainerToC = styled(
  'div',
  ({$theme, $isMenuOpen, $isTocOpen, ...props}) => ({
    height: '100%',
    width: '100%',
    [`@media screen and (min-width: ${$theme.breakpoints.medium}px)`]: {
      padding: `${$theme.sizing.scale500} ${$theme.sizing.scale500} ${
        $theme.sizing.scale500
      } calc(300px + ${$theme.sizing.scale500})`,
      marginTop: '64px', // height of header
      transform: 'scaleY(1)',
      opacity: 1
    },
    [`@media screen and (max-width: ${$theme.breakpoints.medium}px)`]: {
      padding: $theme.sizing.scale500,
      marginTop: 0,
      order: 2,
      transition: 'opacity 0.3s',
      ...($isTocOpen || $isMenuOpen
        ? {
            transform: 'scaleY(0)',
            opacity: 0
          }
        : {
            transform: 'scaleY(1)',
            opacity: 1
          })
    }
    // the problem the following is solving is what happens if the document is very long
    // on a responsive device. If the user toggles the table of content, because the
    // document is long, the TOC will be not visible (above the viewport).
    // to address that, when the TOC is open, we are removing the document from the flow, so
    // that the TOC will be visible. Now, there are several ways to do that, some of which
    // introduce another problem - when closing the table of contents, we want the user to be
    // back exactly where they were before they opened it, as opposed to back on the top.
    // that's one way to approach this -
  })
);

export const Body = styled('div', ({$theme, ...props}) => ({
  height: '100vh'
}));

// example

export const MainExample = styled('main', ({$theme, ...props}) => ({
  height: 'calc(100vh - 96px)',
  [`@media screen and (max-width: ${$theme.breakpoints.medium})`]: {
    marginTop: '64px'
  }
}));

// examples

export const MainExamples = styled('main', ({$theme, ...props}) => ({
  background: $theme.colors.mono100,
  display: 'flex',
  flexWrap: 'wrap',
  [`@media screen and (max-width: ${$theme.breakpoints.medium})`]: {
    marginTop: '64px'
  }
}));

export const ExampleCard = styled('div', ({$theme, ...props}) => ({
  border: $theme.borders.border300,
  cursor: 'pointer',
  margin: $theme.sizing.scale400,
  padding: `${$theme.sizing.scale700} ${$theme.sizing.scale600} ${
    $theme.sizing.scale700
  } ${$theme.sizing.scale600}`,
  transition: `background ${$theme.animation.timing400} border-color ${
    $theme.animation.timing400
  }`,
  transitionTimingFunction: $theme.animation.easeInOutCurve,
  '&:hover': {
    background: $theme.colors.mono200,
    borderColor: 'transparent'
  }
}));

export const ExampleTitle = styled('div', ({$theme, ...props}) => ({
  color: $theme.colors.mono1000,
  ...$theme.typography.font200,
  marginBottom: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '150px'
}));

// search

export const SearchContainer = styled('div', ({$theme, ...props}) => ({
  position: 'relative',
  height: $theme.sizing.scale1000,
  marginBottom: '20px',
  background: $theme.colors.mono200
}));

export const IconContainer = styled('div', ({$theme, ...props}) => ({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: $theme.sizing.scale1000,
  height: $theme.sizing.scale1000
}));

export const InputSearch = styled('input', ({$theme, ...props}) => ({
  boxShadow: `rgba(0, 0, 0, 0) 0px 2px 6px`,
  border: `1px solid transparent`,
  transition: `0.3s`,
  fontSize: `14px`,
  fontWeight: 500,
  lineHeight: `20px`,
  padding: `10px 10px 10px 40px`,
  ':focus': {
    boxShadow: `rgba(39, 110, 241, 0.32) 0px 2px 6px`,
    borderColor: `rgb(39, 110, 241)`,
    outline: 'none'
  }
}));

export const MainSearch = styled('main', ({$theme, ...props}) => ({
  maxWidth: '600px',
  margin: '104px auto 0px'
}));
