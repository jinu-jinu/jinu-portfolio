uniform sampler2D uTexture;

void main() {
  vec3 pos = texture2D(uTexture, position.xy).xyz;

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  gl_PointSize = 10.0;
    gl_PointSize *= (1. / -viewPosition.z);
}
