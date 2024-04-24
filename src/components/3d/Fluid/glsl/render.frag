uniform sampler2D uTexture;

void mainImage(const in vec4 ic, const in vec2 uv, out vec4 oc) {
    vec4 col = texture2D(uTexture, uv) * .1;
    vec2 distortedUv = uv - col.rg * .1;
    // effect를 제외한 나머지 mesh들이 있는 텍스쳐
    vec4 texture = texture2D(inputBuffer, distortedUv);

    vec3 fluidCol = col.rgb;
    // three.js의 메쉬들
    vec3 BgCol = texture.rgb;
    float fluidA = length(fluidCol);
    float BgA = length(BgCol);

    vec3 finalCol = fluidCol + BgCol;
    float finalA = fluidA + BgA;

    oc = vec4(finalCol, finalA);
}