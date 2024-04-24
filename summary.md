# 정리

## 루전랩스 커버

### common

- 로고 = 애니메이션이 들어간 로고, 호버시 풀네임이 나옴 (어려움) [O]
  = svg는 넣지말고 브랜드 네임을 넣고 하나만 보여주다가 호버하면 풀네임이 보이게하기
  = 마우스 방향에 따라서 박스내에서 움직이게 하기
  = 비슷하게 순차적으로 진행하도록 만들었는데 진행과정에서 문제가 발생
  = 막 호버했다가 안했다를 반복하면 애니메이션이 제대로 종료되지않고 끝나버림
  = 여기는 고스트 버튼으로 변경
  = 고스트 효과에 스크롤 33 66 쯤에 뭔가 변화를 만들기

- 네비게이션 = 호버시 밑줄이 그어짐 (찾아보기, 어렵지 않음) [O]
- 토글 스위치 버튼 = 애플 버튼 느낌 (금방함) [O]
- 다크모드 = 글자가 위아래로 (금방함) [O]
- 마우스 유체효과 (만듬) [O]
- 마우스 커서 = 백드랍필터 인버트1, 그레이스케일1 [O]
- 마우스 커서 = 호버시 스케일, lerp, 마그네틱 느낌 (보통) [O]

### 트랜지션

- 캔버스 = 종이가 말리는 느낌인데 내가 했던 거랑 비슷함 (보통)
- 프레이머 모션으로 만들어보기, 직선으로 하는게 아니라 45도 기울여서 만들기

### 로딩

- 숫자가 100으로 올라가는 모션
  = 리소스 다운로드에 따라 숫자가 올라가는게 아니다
  = 리소스가 전부 다운로드 되기 전에는 검은 화면
  = 리소스가 전부 다운되면 0에서 100까지 카운트 실행
  = 카운트가 100이 되면 height를 100에서 0으로 줄임

### home

- 헤더 = 포지션 fixed, 일정부분 스크롤하면 opacity 0 (트리거 하나 만들어서 처리)
- 이미지 = 호버시 확대, 좌우 트랜스폼, filter saturate 0 - 1 (금방함)
- 이미지 타이틀 = 호버시 글자가 위아래로 (금방함) [O]
- 배경 = 캔버스 파티클 효과 (만듬. 약간 조정하면 됌)
- 무한스크롤 (금방함)

### about

- 배경 = 캔버스 파티클 효과, 마우스 호버에 반응 (만듬. 약간 조정하면 됌)
- 텍스트 = fade in/out (금방함)

### contact

- 팝업 = 윗부분의 절반은 투명도 낮춤 (팝업도 금방함)
- 팝업 = 배경부분 클릭해도 팝업 닫힘
- svg = 애니메이션 (svg를 만드는게 어려움)
- 시계 = 시간에 따라 문구가 달라짐 (금방함)
- 애니메이션시퀸스로 팝업 애니메이션 추가하기 (만들어 놓은것들 조합하기)

## 기술 구현

### 마그네틱 버튼

- 커서가 Elem의 일정 범위에 들어가면 elem이 커서를 따라옴
- 크기가 커야 애니메이션 효과가 잘 나옴
- framer보다 gsap 모션이 훨씬 좋아서 gsap 사용

```tsx
const { clientX, clientY } = e;
const { top, left, width, height } = magnetic.current.getBoundingClientRect();
const centerX = left + width / 2;
const centerY = top + height / 2;
const x = clientX - centerX;
const y = clientY - centerY;
```

### 언더라인 텍스트

- 텍스트를 호버하면 텍스트의 밑에 밑줄이 생긴다
- framer-motion을 사용할거라 before, after대신 span을 사용
- 텍스트 컨테이너 relative, span absolute, bottom 0 left 0으로 포지션 잡기
- width를 0%에서 100%으로 만들면 밑줄이 그어지는 효과가 나타난다
- 부모에 호버하면 자식에서 효과가 나타나는거라 부모태그에 마우스 이벤트를 건다
- variants를 조건문으로 만들면 끝

```tsx
const [isHovered, setIsHovered] = useState(false);

return (
  <div
    className="relative"
    onMouseEnter={() => {
      setIsHovered(true);
    }}
    onMouseLeave={() => {
      setIsHovered(false);
    }}
  >
    {title}
    <motion.span
      variants={variants}
      animate={isHovered ? "hover" : "initial"}
      className="bg-white absolute bottom-0 left-0 w-full h-[3px]"
    />
  </div>
```

### 마우스 커서

- 마우스를 움직이면 원이 따라오는데 스프링이 들어가있다
- gsap으로 ease를 조정해서 만듬
- css 백드랍필터 속성으로 그레이스케일, 인버트효과 생성
- 마우스가 버튼, 이미지에 호버하면 스케일이 작아짐
- 마우스이벤트에 target의 class이름을 검색해서 조건으로 작아지게 만듬

```tsx
// 커서의 오리진 포인트가 top 0 left 0이라 중앙에 오게하려면
// width / 2, height / 2를 빼줘야하는데 그걸 해주는 코드
gsap.set(cursor.current, { xPercent: -50, yPercent: -50 });

const xTo = gsap.quickTo(cursor.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
const yTo = gsap.quickTo(cursor.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
const scaleX = gsap.quickTo(cursor.current, "scaleX", { duration: 0.3, ease: "power3" });
const scaleY = gsap.quickTo(cursor.current, "scaleY", { duration: 0.3, ease: "power3" });

const mousemoveHandler = (e: MouseEvent) => {
  xTo(e.clientX);
  yTo(e.clientY);

  // 클래스 이름으로 필터링
  if (e.target.className.includes("jw")) {
    scaleX(0.4);
    scaleY(0.4);
  } else {
    scaleX(1);
    scaleY(1);
  }
};
```

### 토글 스위치

- transform으로 처리
- 오버히든으로 보더 밖으로 튀어나오는거 정리

### 텍스트 업앤다운

- 부모 relative 오버히든, 자식 하나는 기본, 하나는 absolute top-[100%]
- hover시 x 0% - -100%

## 이미지 r,g,b 날리는 효과

```c++

vec2 centeredAspectRatio(vec2 uvs, vec2 factor){
    return uvs * factor - factor /2. + 0.5;
}

void main() {
  vec2 normalizedRgbPos = uRGBPosition / uResolution;
    normalizedRgbPos.y = 1. - normalizedRgbPos.y;


    vec2 vel = uRGBVelocity;
    float dist = distance(normalizedRgbPos + vel / uResolution, vUv.xy);

    float ratio = clamp(1.0 - dist * 5., 0., 1.);

    vec4 tex = vec4(1.);

    vec2 uv = vUv;

    uv.x -= sin(uv.y) * ratio / 100. * (vel.x + vel.y) / 7.;
    uv.y -= sin(uv.x) * ratio / 100. * (vel.x + vel.y) / 7.;

    tex.r = texture2D(uTex, centeredAspectRatio(uv, vec2(1.5, 1.) )).r;

    uv.x -= sin(uv.y) * ratio / 150. * (vel.x + vel.y) / 7.;
    uv.y -= sin(uv.x) * ratio / 150. * (vel.x + vel.y) / 7.;

    tex.g = texture2D(uTex, centeredAspectRatio(uv, vec2(1.) )).g;

    // uv의 값을 구하는 공식 중 ratio / A의 A에 해당하는 값을 크게하면
    // 마우스 호버시 해당 컬러가 더 잔상이 길게 남음
    uv.x -= sin(uv.y) * ratio / 300. * (vel.x + vel.y) / 7.;
    uv.y -= sin(uv.x) * ratio / 300. * (vel.x + vel.y) / 7.;

    tex.b = texture2D(uTex, centeredAspectRatio(uv, vec2(1.) )).b;

    gl_FragColor = vec4(tex.rgb, 0.);
}
```

## 작업일지

## 작업일지

### 2024-03-14

- 마그네틱 버튼 구현
- 언더라인 텍스트 구현
- 마우스 커서 구현
- 토글스위치 구현
- 텍스트 업앤다운 구현
- 로고 만들다 실패

### 2024-03-15

- 로고 클립패스 효과로 변경
- 로딩 먼저 만들기
  = 로딩이 끝날 때까지 스크롤을 막는 방법을 찾았음
  = overflow hidden을 넣으면 됌
  = 넣었는데 스크롤이 안막아짐
  = lenis를 쓰고 있어서 안됐음
  = lenis홈페이지 가보니까 로딩 중에는 lenis-stopped라는 속성이 추가됐음
  = SmoothScroll 컴포넌트에서 로딩중에는 lenis.stop()으로 설정했음
  = 스크롤 막아짐
  = 로딩 완성
- 테일윈드로 css를 쓰면 가독성이 떨어짐. css에 기본 옵션들을 적고 테일윈드에는 css에서 설정하기 귀찮은 것(미디어쿼리, 테마, 폰트) 쓰기

### 2024-03-26

- 커스텀이펙트와 scene함께 렌더링하기
  = 커스텀 이펙트의 frag 중에 inputBuffer를 texture를 사용하는 코드가 있다
  = inputBuffer가 scene에 해당하는 녀석임
  = scene과 effect를 함께 보여주려면 col를 더하면 됌
  = col를 가공해서 a값을 만드는데 이렇게 사용하는 이유는
  = 씬의 메쉬, 이펙트에 해당하는 부분에만 1의 값이 들어가야 하기 때문
  = 전부 1이 되면 나머지 부분은 검정색이 되므로 css에서 배경색을 컨트롤 하기 힘듬

- 파티클의 모양을 넓게 퍼뜨리기(0)
- 그리드의 이미지 텍스트 반응형(0)
- 리스트 호버 애니메이션(0)
- 리스트 호버시 이미지가 보이게(0)
- 그리드와 리스트 전환시 애니메이션(0)

- fluid의 이벤트 방식 변경
  = 기존방식 mesh에다가 걸어놨음
  = element가 canvas보다 후순위에 있으면 마우스 이벤트가 씹힘
  = canvas의 css에 pointer-events를 none으로 변경해봄
  = mesh에 걸어놓은 마우스이벤트가 작동하지 않음
  = useEffect의 mouseMove로 변경해서 pointer-events를 none으로 해도 마우스 좌표를 얻을 수 있도록 만듬

- 페이지 전환시 부드러운 트랜지션

### 2024-03-28

- fade text의 동작방식 변경
  = 기존 = 부모 inline-block, 자식 inline-block을 사용했음
  = 새로운버전 = inline-block이 아니어도 동작하므로 제거함
  = 여러개인 경우 variants에 enter: (i) => ({
  y: "0",
  transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1], delay: 0.075 \* i },
  }) 이런 식으로 i를 줄 수 있다

- fill text의 동작방식 변경
  = inline-block 제거(이거 왜 쓴지 모르겠네)
  = scroll방식과 트리거 방식 분리

- 리스트 이미지 개선
  = view라는 버튼을 추가해서 따라다니게 만들기(0)
  = 스케일 조정으로 자연스럽게 만들기

- follow cursor 살림
  = lists, cards 영역에 들어오면 나타나는 걸로 변경

### 2024-03-29

- contact particle mouse event를 프로젝트에 적용하다 발생한 문제
  = 전역 마우스 이벤트를 여러곳에서 사용중
  = 훅으로 만들어서 하나만 사용하고 가져다 쓰는걸로 변경
  = 문제점 훅 내부에서 useState을 사용하므로 훅을 불러오면 마우스가 변경될 때마다 리렌더링됌
  = contact particle은 내부에서 useTHREE를 사용하는데 이녀석은 resize될때마다 리렌더링을 발생시킴
  = 그것도 문제인데 useTHREE의 gl 속성을 particle을 만드는 코어에 사용하고 있음
  = 그렇기 때문에 훅을 사용해서 컴포넌트가 리렌더링되면 파티클 애니메이션이 처음부터 다시시작되는 문제가 발생함
  = 그래서 훅대신 마우스 이벤트를 하나 더 사용하기로 함
  = mesh에다가 걸려고 했는데 canvas의 zindex문제 때문에 전역으로 사용함
  = canvas에 css의 pointer-events: none을 걸어놔서 useTHREE의 pointer 속성의 값이 변경되지 않는 문제가 발생
  = 마우스 좌표를 size속성으로 매핑해서 사용하는걸로 문제를 해결

### 2024-04-01

- 라우팅시 html 쪽은 animatepresence로 트랜지션을 만들 수 있는데 three.js 쪽은 복잡함
- 조건문으로 파티클 컴포넌트를 넣었다뺐다 하면 갑툭튀라 부자연스러움
- 파티클 포인트가 몇개 안되기 때문에 조건문을 제거하고
- 파티클의 투명도로 트랜지션을 만들었다
- 경로로 인앤아웃을 감지해서 인이면 모션밸류 값을 0 ~ 1
- 아웃이면 1 ~ 0으로 변경하고 인인경우 html 트랜지션 시간 3초를 딜레이로 줬음
- 테마에 대한 값도 따로 줘서 모드가 변경되면 파티클의 색이 변경되도록 만듬

- 전역 상태관리의 변경
- 모든 상태를 하나의 스토어에서 관리하니까 상태가 변경될 때마다 스토어를 사용하는 컴포넌트에 리렌더링이 발생함
- 가장 큰 문제점은 로딩, 경로변경 할 때 로딩, 경로 변경과 상관없는 상태에도 영향을 미쳤다
- 스토어를 주제별로 쪼개서 관리하는 방식으로 변경
- 로딩, 경로 등 연관있는 상태끼리 묶었다

### 2024-04-02

- 로고 수정
  = 끝나는 시점을 inset(0% 0% 0% 0%)으로 잡으니까 겹쳐져서 외곽선에 뒤 로고의 색이 보이는 문제가 발생했음
  = 끝나는 시점을 inset(0% 0% 100% 0%)으로 잡아서 화면에 보이지 않게 만들어서 해결함
  = 로고 코드 참고

### 라우팅 방식 변경

-

### html, threejs를 하나의 스크롤로 컨트롤하는 방법

- html 기준으로 스크롤 페이지를 정한다
- three.js는 파티클을 배경으로 깔았기 때문에 카메라를 움직일 수 없다
- 스크롤할 모델들을 group안에 때려박는다
- group를 usemotionvalueevent에서 ref로 조정한다

####

css 레이아웃 정리하기
톤 맞추기, 하이라이트 컬러로 포인트 주기

홈 = 카드, 리스트 다시 짜기
