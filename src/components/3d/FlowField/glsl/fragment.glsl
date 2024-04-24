uniform float uDark;

varying vec2 vUv;

void main() {
  float center = 1. - length(gl_PointCoord - .5);

  float d = smoothstep(.8, .9, center);

  vec3 col = (uDark == 1.) ? vec3(1., 0.53, 0.96) : vec3(0.12,0.43,0.9);
  
  gl_FragColor = vec4(col, d);
}
