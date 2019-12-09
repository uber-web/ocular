import {styled} from 'baseui';

export {H4, H5, H6} from 'baseui/typography';

export const A = styled('a', ({$theme}) => ({
  textDecoration: 'none',
  color: $theme.colors.primary400,
  ':visited': {color: $theme.colors.primary400},
  ':active': {color: $theme.colors.primary400}, 
  ':hover': {color: $theme.colors.primary700}, 
}))

export const H1 = styled('h1', ({$theme}) => ({
  ...$theme.typography.font700,
  fontFamily: 'Uber Move',
  fontWeight: 500,
  letterSpacing: '0.02em',
  margin: '4px 0 24px'
}));

export const H2 = styled('h2', ({$theme}) => ({
  ...$theme.typography.font500,
  fontFamily: 'Uber Move',
  fontWeight: 500,
  margin: '24px 0 16px'
}));

export const H3 = styled('h3', ({$theme}) => ({
  fontFamily: 'Uber Move',
  ...$theme.typography.font350,
}));

export const P = styled('p', ({$theme}) => ({
  fontFamily: 'Uber Move',
  ...$theme.typography.font300,
  lineHeight: 1.5,
  margin: '0 0 16px'
}));

export const List = styled('ul', ({$theme}) => ({
  fontFamily: 'Uber Move',
  ...$theme.typography.font300,
  lineHeight: 1.5,
  margin: '0 0 16px'
}));

export const ListItem = styled('li', ({$theme}) => ({
  marginBottom: '4px'
}));

export const MarkdownBody = styled('div', ({$theme}) => ({
  ...$theme.typography.font300,
  boxSizing: 'border-box',
  padding: '36px',
  maxWidth: '692px'
}))

export const InlineCode = styled('code', ({$theme}) => ({
  backgroundColor: $theme.colors.mono200,  
  borderRadius: $theme.sizing.scale100,
  padding: '0 5px',
  fontFamily: `Consolas, Menlo, Monaco, 'Andale Mono WT', 'Andale Mono', 'Lucida Console', 'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Liberation Mono', 'Nimbus Mono L', 'Courier New', Courier, monospace`,  
  fontSize: '0.9em',
  margin: '1px 0',
  lineHeight: 'calc(1.5em / 0.9 - 2px)',
  display: 'inline-block',
  verticalAlign: 'top',
}));

export const CodeBlock = styled('code', ({$theme}) => ({
  fontFamily: `Consolas, Menlo, Monaco, 'Andale Mono WT', 'Andale Mono', 'Lucida Console', 'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Liberation Mono', 'Nimbus Mono L', 'Courier New', Courier, monospace`,
  fontSize: '0.9em',
  direction: 'ltr',
  textAlign: 'left',
  whiteSpace: 'pre',
  wordSpacing: 'normal',
  wordBreak: 'normal',
  tabSize: 4,
  hyphens: 'none',
  backgroundColor: $theme.colors.mono200,
}));

export const Pre = styled('pre', ({$theme}) => ({
  backgroundColor: $theme.colors.mono200
}));

export const BlockQuote = styled('blockquote', ({$theme}) => ({
  backgroundColor: $theme.colors.warning100,
  marginInlineStart: 0,
  marginInlineEnd: 0,
  padding: $theme.sizing.scale600,
  paddingBottom: '1px'
}));

export const Table = styled('table', ({$theme}) => ({
  borderCollapse: 'collapse',
  borderSpacing: '1px',
  width: '100%'
}));

export const TableHeaderCell = styled('th', ({$theme}) => ({
  padding: '4px',
  textAlign: 'left',
  background: $theme.colors.mono200,
  fontWeight: 'bold',
  border: `1px solid ${$theme.colors.mono400}`
}));

export const TableBodyCell = styled('td', ({$theme}) => ({
  padding: '4px',
  textAlign: 'left',
  border: `1px solid ${$theme.colors.mono400}`
}));
