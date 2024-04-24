uniform float uOpacity;
uniform float uDark;

varying vec2 vUv;


void main() {
  float center = length(gl_PointCoord - .5);

  if (center > .5) discard;

  float alpha = uOpacity;

  vec3 col = (uDark == 1.) ? vec3(1.) : vec3(vUv, 1.);

  gl_FragColor = vec4(col, alpha);
}