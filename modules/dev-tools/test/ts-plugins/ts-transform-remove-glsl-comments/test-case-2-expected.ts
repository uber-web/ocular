const glsl = (x) => `${x}`;
export default {
  name: 'shader-module',
  getUniforms: () => ({
    useFloatColors: false
  }),
  inject: {
    'vs:DECKGL_FILTER_COLOR': glsl `
  picking_setPickingColor(geometry.pickingColor);
  `,
    'fs:DECKGL_FILTER_COLOR': {
      order: 99,
      injection: glsl `
  color = picking_filterHighlightColor(color);
  color = picking_filterPickingColor(color);
    `
    }
  }
};
