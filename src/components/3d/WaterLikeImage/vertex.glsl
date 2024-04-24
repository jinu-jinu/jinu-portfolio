varying vec2 vUv;

uniform float uTime;
uniform float uScroll;

float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
	vec2 ip = floor(p);
	vec2 u = fract(p);
	u = u*u*(3.0-2.0*u);
	
	float res = mix(
		mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
		mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
	return res*res;
}

float so(float x) {
  // uv의 값은 변하지 않음. 0 ~ 1
  // uv.x에 uscroll을 더한 값을 clamp로 써서 1이상으로 넘어가지 않도록함
  // 오른쪽에서 왼쪽으로 순차적으로 크기가 2배씩 증가하는것
  float scrollOffset = clamp(x + uScroll, .0, 1.);
  return mix(1., 3., uScroll * scrollOffset);
}


void main() {
  vUv = uv;

  vec3 newPos = position;

  float noiseAmp = mix(.4, .1, uScroll);
  float posOffset = mix(3., .0, uScroll);

  float n1 = noise(vec2(newPos.x, newPos.y + uTime * .5)); 
  float n2 = noise(vec2(newPos.x * 2., newPos.y + uTime * 2.)); 

  newPos.x += n1 * noiseAmp;
  newPos.z += n2 * noiseAmp;

  newPos.x -= posOffset;
  newPos.y *= so(uv.x);
  newPos.x *= so(uv.x * uv.x * uv.x);  

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}