// Constants
const COORDINATE_SYSTEM = {
  CARTESIAN: 0,
  LNGLAT: 1
};
const constantDefinitions = Object.keys(COORDINATE_SYSTEM)
  .map((key) => `const int COORDINATE_SYSTEM_${key} = ${COORDINATE_SYSTEM[key]};`)
  .join('\n');
// Vertex shader
export const vs = `\
#version 300 es
${constantDefinitions}

in vec4 position;
in vec4 color;

uniform mat4 pMatrix; // Projection matrix
uniform mat4 mMatrix; // Model matrix
uniform float opacity;

out vec4 vColor;

main() {
  gl_Position = pMatrix * mMatrix * position;
  vColor = vec4(color, /* inline comment */ color.a * opacity);
}
`;
// Fragment shader
export const fs = `\
#version 300 es

in vec4 vColor;

main() {
  if (vColor.a == 0.0) {
    /*
      Remove transparent fragment
    */
    discard;
  }
  gl_FragColor = vColor;
}
`;
