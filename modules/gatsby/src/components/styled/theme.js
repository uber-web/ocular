import {lightThemePrimitives, createTheme} from 'baseui';

const primaryFontFamily =
  'UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif';

export const primitives = {
  ...lightThemePrimitives,
  primaryFontFamily
};

const theme = createTheme(primitives);

export default theme;
