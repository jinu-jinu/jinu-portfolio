attribute vec2 aUV;

varying vec2 vUv;

uniform sampler2D uTexture;

void main() {
  vec4 pos = texture2D(uTexture, aUV);
  vec4 mvPosition = modelViewMatrix * vec4( pos.xyz, 1.0 );

  gl_Position = projectionMatrix * mvPosition;

  vUv = aUV;

  gl_PointSize = 3. * (1. / -mvPosition.z);
}
