import {styled} from 'baseui';

// h4, h5, and h6 haven't been spec'ed yet, so we'll just reuse baseweb defaults
export {H4, H5, H6} from 'baseui/typography';

// we are moving the styling of the code block from scss into styletron styled components.
const monospaceFontStack = `'SF Mono', Consolas, Menlo, Monaco, 'Andale Mono WT', 'Andale Mono', 'Lucida Console', 'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Liberation Mono', 'Nimbus Mono L', 'Courier New', Courier, monospace`;

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
  margin: '16px 0 24px'
}));

export const H3 = styled('h3', ({$theme}) => ({
  fontFamily: 'Uber Move',
  ...$theme.typography.font350,
}));

export const P = styled('p', ({$theme}) => ({
  fontFamily: 'Uber Move',
  ...$theme.typography.font300,
  margin: '20px 0'
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
  fontFamily: monospaceFontStack,  
  fontSize: '0.9em',
  margin: '1px 0',
  lineHeight: 'calc(1.5em / 0.9 - 2px)',
  display: 'inline-block',
  verticalAlign: 'top',
}));

export const CodeBlock = styled('code', ({$theme}) => ({
  fontFamily: monospaceFontStack,
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