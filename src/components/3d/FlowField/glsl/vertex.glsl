uniform sampler2D uTexture;

void main() {
  vec3 pos = texture2D(uTexture, position.xy).xyz;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

  gl_Position = projectionMatrix * mvPosition;

    gl_PointSize = 50. * (1. / -mvPosition.z);


}
