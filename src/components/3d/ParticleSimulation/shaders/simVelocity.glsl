uniform sampler2D uOriginalPosition;
uniform vec3 uMouse;

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 vUv = gl_FragCoord.xy / resolution.xy;
    vec4 position = texture2D( uCurrentPosition, vUv ); 
    vec4 original = texture2D( uOriginalPosition, vUv );   
    vec4 velocity = texture2D( uCurrentVelocity, vUv );

    float particleOffset = ((length(vUv) * 2.) + (length(gl_FragCoord.xy) * .003));

    velocity.xyz *= .9;

    vec3 posDirection = normalize( original.xyz - position.xyz );
    float dist = length( original.xyz - position.xyz );
    
    float randOffset = random(vUv);
    // .01이 커지면 형태가 원래대로 복구가 안됌
    if( dist > .01 ) {
        // .0001 다시 원래대로 돌아오는 속도
        velocity.xyz += posDirection * .003 * dist * particleOffset * randOffset;
    }


    float mouseDistance = distance( position.xyz, uMouse );
    float m1 = .2;
    if( mouseDistance < m1 ) {
        vec3 mouseDirection = normalize( position.xyz - uMouse );  
        float mouseVal = ( 1.0 - mouseDistance / m1 );

        // .01 멀리 퍼지는 범위
        velocity.xyz += mouseDirection * mouseVal * .03 * particleOffset;
    }
    
    gl_FragColor = vec4(velocity.xyz, 1.);
}