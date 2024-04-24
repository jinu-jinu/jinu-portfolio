precision highp float;

varying vec2 vUv;
uniform sampler2D uSource;
uniform float uRatio;
uniform vec3 uColor;
uniform vec2 uPoint;
uniform float uRadius;

void main () {
    vec2 p = vUv - uPoint.xy;
    p.x *= uRatio;
    vec3 splat = exp(-dot(p, p) / uRadius) * uColor;
    vec3 base = texture2D(uSource, vUv).xyz;
    gl_FragColor = vec4(base + splat, 1.0);
}