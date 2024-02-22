const glsl = (x: TemplateStringsArray) => `${x}`;
export default {
  name: 'shader-module',
  getUniforms: () => ({
    useFloatColors: false
  }),
  inject: {
    'vs:DECKGL_FILTER_COLOR': glsl`
  // pickingColor is expected to be populated by this point
  picking_setPickingColor(geometry.pickingColor);
  `,
    'fs:DECKGL_FILTER_COLOR': {
      order: 99,
      injection: glsl`
  // use highlight color if this fragment belongs to the selected object.
  color = picking_filterHighlightColor(color);

  // use picking color if rendering to picking FBO.
  color = picking_filterPickingColor(color);
    `
    }
  }
};
