precision mediump float;

varying highp vec2 vUv;
uniform sampler2D uPressure;
uniform float uValue;

    void main () {
        gl_FragColor = uValue * texture2D(uPressure, vUv);
    }