uniform sampler2D uOriginalPosition;
uniform float uTime;


float random (in vec2 _st) {
    return fract(sin(dot(_st.xy, vec2(12.9898,78.233)))*43758.5453123);
}


void main() {
    vec2 vUv = gl_FragCoord.xy / resolution.xy;
    vec4 position = texture2D( uCurrentPosition, vUv );
    vec4 original = texture2D( uOriginalPosition, vUv );
    vec4 velocity = texture2D( uCurrentVelocity, vUv );

    float lifespan = 10.;
    float randOffset = random(vUv);
    float age = mod( uTime + lifespan * randOffset, lifespan );

    if (original.a < .4) {
        float aPow = pow(original.a, 2.);
        vec3 newDirection = normalize( position.xyz - vec3(vUv.x * aPow, vUv.y * aPow, .0) );  
        velocity.xyz += newDirection * aPow * .1;

        if (age < 0.1) position.xyz = original.xyz;
    }
    
    position.xyz += velocity.xyz;

    gl_FragColor = vec4(position.xyz, 1.);
}