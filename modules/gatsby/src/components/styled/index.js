/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
import React from 'react';
import styledComponents from 'styled-components';
import theme from './theme';
/* eslint-disable import/prefer-default-export */

// baseweb shim
// this function replicates the baseweb API, but uses styledComponents under the hood.
// when we'll be ready to use baseweb, we can simply import {styled} from 'baseui'
// and remove this function as well as the styled-components import

function styleHyphenFormat(propertyName) {
  function upperToHyphenLower(match, offset, string) {
    return (offset > 0 ? '-' : '') + match.toLowerCase();
  }
  return propertyName.replace(/[A-Z]/g, upperToHyphenLower);
}

const styleObjectToString = (obj, depth = 0) => {
  return Object.entries(obj).reduce((result, [key, value], index) => {
    const recursiveValue =
      typeof value === 'object'
        ? `{\n${styleObjectToString(value, depth + 1)}\n}`
        : `${value};`;
    const optionalNewLine = index ? '\n' : '';
    const indentation = ' '.repeat(depth * 2);
    const hyphenatedKey = styleHyphenFormat(key);
    const formattedKey = hyphenatedKey.includes(' ') ? `"${hyphenatedKey}"` : hyphenatedKey;
    const optionalColon = typeof value === 'object' ? ' ' : ': '
    return `${result}${optionalNewLine}${indentation}${hyphenatedKey}${optionalColon}${recursiveValue}`;
  }, '');
};

function styled(element, stylingFunction) {
  const styledComponentLiteral = styleObjectToString(stylingFunction({$theme: theme}));
  return styledComponents(element)`${styledComponentLiteral}`;
}

// top-level layoout

export const BodyContainerFull = styled('div', ({$theme, ...props}) => ({
  margin: '0 auto',

  '.contributors': {
    maxWidth: '400px',
    margin: '100px auto 0'
  }
}));

export const BodyContainerToC = styled('div', ({$theme, ...props}) => ({
  gridColumn: '2 / 3',
  gridRow: '2 / 3',
  width: '100%',
  padding: $theme.sizing.scale500,
  [`@media screen and (max-width: ${$theme.breakpoints.medium}px)`]: {
    order: 2
  },

  '& > div': {
    maxWidth: $theme.breakpoints.large,
    margin: 'auto'
  },
  '& p': {
    marginBottom: $theme.sizing.scale500
  },

  '& > h1': {
    color: $theme.colors.mono1000
  }
}));

export const BodyGrid = styled('div', ({$theme, ...props}) => ({
  height: '100vh',
  display: 'grid',
  gridTemplateRows: '64px 1fr',
  gridTemplateColumns: '300px 1fr',
  maxWidth: `${$theme.breakpoints.large}px`,
  [`@media screen and (max-width: ${$theme.breakpoints.medium}px)`]: {
    display: 'flex',
    flexDirection: 'column',
    height: 'inherit'
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

export const ToCContainer = styled('div', ({$theme, ...props}) => ({
  gridColumn: '1 / 2',
  gridRow: '2 / 3',
  background: $theme.colors.mono200,
  overflow: 'scroll',
  [`@media screen and (max-width: ${$theme.breakpoints.medium}px)`]: {
    order: 3,
    overflow: 'inherit'
  }
}));

// example

export const MainExample = styled('main', ({$theme, ...props}) => ({
  height: 'calc(100vh - 96px)',
  [`@media screen and (max-width: ${$theme.breakpoints.medium}px)`]: {
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
  padding: `${theme.sizing.scale700} ${theme.sizing.scale600} ${
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

// table of contents

const tocWidth = '300px';
const topbarHeight = '4rem';
const topbarMaxheight ='8rem';

export const Toc = styled('div', ({$theme, ...props}) => ({
    position: 'fixed',
    width: tocWidth,
    height: `calc(100% - ${topbarHeight})`,
    fontWeight: 500,
    padding: `1rem 0`,

    flexShrink: 0,

    zIndex: 1,
    overflowY: 'auto',
    '-webkit-overflow-scrolling': 'touch',

    backgroundColor: $theme.colors.white,
    borderRight: `1px solid ${$theme.colors.mono400}`,
    transition: `all ${theme.animation.timing400}`,
    whiteSpace: 'nowrap',
    [`@media screen and (max-width: ${$theme.breakpoints.medium}px)`]: {
      position: 'absolute',
      width: '100vw',
      height: 0,
      padding: 0
    }
}));

export const TocInnerDiv = styled('div', ({$theme, props}) => ({
  paddingBottom: '80px',
   [`@media screen and (max-width: ${$theme.breakpoints.medium}px)`]: {
      paddingTop: topbarMaxheight,
      paddingBottom: '1rem'
   }
}));

export const ToggleExpanded = styled('div', ({$theme, props}) => ({
    display: 'flex',
    alignContent: 'center',
    justifyItems: 'center',
    borderBottom: `1px solid ${$theme.colors.mono400}`
}))

export const ToggleExpandedButton = styled('button', ({$theme, props}) => ({
  cursor: 'pointer',
  fontSize: '12px',
  outline: 'none',
  ':hover': {
    textDecoration: 'underline'
  }
}))

export const TocLinkWrapper = styled('div', ({$theme, props}) => ({
  background: 'transparent',
  borderStyle: 'solid',
  borderWidth: '0 0 0 1px',
  borderColor: 'transparent',
  color: $theme.colors.mono900,
  fontSize: '14px',
  overflowX: 'hidden',
  paddingLeft: `28px`,
  position: 'relative',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  ':hover': {
     color: $theme.colors.mono700
  }
}));

export const TocExpandedEntryBackground = styled('div', ({$theme, props}) => ({
  background: $theme.colors.mono200,
  position: 'absolute',
  height: '100%',
  width: '100%',
  left: 0,
  zIndex: -1
}));

export const TocActiveEntryBackground = styled('div', ({$theme, props}) => ({
  background: $theme.colors.mono200,
  borderLeft: `2px solid ${$theme.colors.primary500}`,
  position: 'absolute',
  height: '100%',
  width: '100%',
  left: 0,
  zIndex: -1
}));


export const ListHeaderLinkWrapper = styled('div', ({$theme, props}) => ({
  background: 'transparent',
  borderColor: 'transparent',
  borderBottomColor: $theme.colors.mono400,
  borderStyle: 'solid',
  borderWidth: '0 0 1px 1px',
  fontSize: '14px',
  lineHeight: '56px',
  overflowX: 'hidden',
  paddingLeft: `40px`,
  position: 'relative',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const SubPages = styled('div', ({$theme, props}) => ({
  overflow: 'hidden',
  transition: `max-height ${theme.animation.timing400}`
}));

export const SubPagesList = styled('ul', ({$theme, props}) => ({
  marginBottom: 0,
  marginTop: 0,
  paddingLeft: 0
}));

export const TocListItem = styled('li',  ({$theme, props}) => ({
  listStyle: 'none'
}));

export const TocFirstEntryInSection = styled('div', ({$theme, props}) => ({
  lineHeight: '55px',
}));

export const TocEntryInSection = styled('div', ({$theme, props}) => ({
  borderTop: `1px solid ${$theme.colors.mono400}`,
  lineHeight: '55px',
}));

export const TocSoleEntryInSection = styled('div', ({$theme, props}) => ({
  borderBottom: `1px solid ${$theme.colors.mono400}`,
  lineHeight: '55px',
}));

export const TocLastEntryInSection = styled('div', ({$theme, props}) => ({
  borderBottom: `1px solid ${$theme.colors.mono400}`,
  borderTop: `1px solid ${$theme.colors.mono400}`,
  lineHeight: '55px',
}));

export const StyledChevron = styled('img', ({$theme, ...props}) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translate(-30px, -50%)'
}));