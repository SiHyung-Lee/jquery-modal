# jQuery Modal Plugin

심플하고 접근성이 뛰어난 jQuery 모달 플러그인입니다. 오버레이, 애니메이션, 키보드 네비게이션을 지원합니다.

## 🌐 라이브 데모

**[https://jquery-modal.vercel.app/](https://jquery-modal.vercel.app/)**

## ✨ 주요 기능

- 📦 **경량화**: 최소한의 코드로 구현
- ♿ **접근성**: ARIA 속성과 키보드 네비게이션 완벽 지원
- 🎨 **애니메이션**: 부드러운 페이드 인/아웃 효과
- ⌨️ **키보드 지원**: ESC 키로 닫기, Tab 키로 포커스 트랩
- 🎯 **다양한 닫기 옵션**: X 버튼, 오버레이 클릭, ESC 키
- 📱 **반응형**: 다양한 화면 크기에 대응
- 🔧 **커스터마이징**: 크기, 동작 등 설정 가능

## 🚀 빠른 시작

### 1. HTML 구조

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="jquery-modal.css"/>
</head>
<body>
    <!-- 모달 오버레이 -->
    <div class="modal-overlay" id="modalOverlay" aria-hidden="true"></div>

    <!-- 모달 -->
    <div class="modal-outer">
        <div data-modal-target="myModal" class="modal" role="dialog" aria-labelledby="modal-title" aria-modal="true">
            <button class="modal-close" aria-label="모달 닫기">&times;</button>
            <h2 id="modal-title">모달 제목</h2>
            <p>모달 내용</p>
        </div>
    </div>

    <!-- 트리거 버튼 -->
    <button class="modal-trigger" data-modal-trigger="myModal">모달 열기</button>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="jquery-modal.js"></script>
</body>
</html>
```

### 2. 기본 사용법

트리거 버튼에 `modal-trigger` 클래스와 `data-modal-trigger` 속성만 추가하면 자동으로 작동합니다:

```html
<button class="modal-trigger" data-modal-trigger="myModal">클릭하세요</button>
```

### 3. 크기 지정

`data-modal-width`와 `data-modal-height` 속성으로 모달 크기를 지정할 수 있습니다:

```html
<button class="modal-trigger"
        data-modal-trigger="myModal"
        data-modal-width="500"
        data-modal-height="400">
    큰 모달 열기
</button>
```

## 📖 사용 방법

### HTML 속성으로 제어 (권장)

가장 간단한 방법입니다. 버튼에 클래스와 데이터 속성만 추가하세요:

```html
<!-- 기본 크기 (300x200) -->
<button class="modal-trigger" data-modal-trigger="modal1">
    모달 열기
</button>

<!-- 커스텀 크기 -->
<button class="modal-trigger"
        data-modal-trigger="modal2"
        data-modal-width="600"
        data-modal-height="500">
    큰 모달 열기
</button>
```

### JavaScript로 제어

프로그래밍 방식으로 모달을 제어할 수도 있습니다:

```javascript
// 기본 사용
$('#myButton').modal();

// 옵션 전달
$('#myButton').modal({
    width: 500,
    height: 400,
    closeOnOverlay: true,
    closeOnEsc: true,
    animationDuration: 300
});
```

### 생성자로 직접 제어

더 세밀한 제어가 필요한 경우:

```javascript
var modal = new Modal(document.getElementById('myButton'), {
    width: 600,
    height: 500,
    closeOnOverlay: false
});

modal.init();

// 나중에 닫기
modal.close();
```

## ⚙️ 설정 옵션

| 옵션 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `width` | Number | 300 | 모달 너비 (픽셀) |
| `height` | Number | 200 | 모달 높이 (픽셀) |
| `closeOnOverlay` | Boolean | true | 오버레이 클릭 시 닫기 |
| `closeOnEsc` | Boolean | true | ESC 키로 닫기 |
| `animationDuration` | Number | 300 | 애니메이션 지속 시간 (밀리초) |

### 우선순위

설정값은 다음 순서로 적용됩니다 (뒤쪽이 우선순위가 높음):

1. 기본값 (defaults)
2. JavaScript 옵션
3. HTML data 속성 (`data-modal-width`, `data-modal-height`)

## ♿ 접근성 기능

이 플러그인은 웹 접근성 표준을 준수합니다:

### ARIA 속성
- `role="dialog"`: 모달이 대화상자임을 알림
- `aria-modal="true"`: 모달 모드임을 나타냄
- `aria-labelledby`: 모달 제목 연결
- `aria-hidden`: 모달 표시 상태 관리

### 키보드 네비게이션
- **Tab**: 모달 내부 요소 간 이동
- **Shift + Tab**: 역순으로 이동
- **ESC**: 모달 닫기
- **포커스 트랩**: Tab 키로 모달 외부로 이동 불가

### 포커스 관리
- 모달 열릴 때: 닫기 버튼에 자동 포커스
- 모달 닫힐 때: 트리거 버튼으로 포커스 복귀

## 🎨 스타일 커스터마이징

CSS 변수를 활용하여 쉽게 커스터마이징할 수 있습니다:

```css
/* 오버레이 색상 변경 */
.modal-overlay {
    background-color: rgba(0, 0, 0, 0.7);
}

/* 모달 스타일 변경 */
.modal {
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

/* 버튼 색상 변경 */
.modal-trigger {
    background-color: #2196F3;
}

.modal-trigger:hover {
    background-color: #1976D2;
}
```

## 📝 API 문서

### 메서드

#### `init()`
모달을 초기화하고 엽니다.

```javascript
var modal = new Modal(element);
modal.init();
```

#### `open()`
모달을 엽니다.

```javascript
modal.open();
```

#### `close()`
모달을 닫습니다.

```javascript
modal.close();
```

#### `closeAll()`
모든 모달을 닫습니다.

```javascript
modal.closeAll();
```

### jQuery 플러그인

```javascript
// 모달 열기
$('.my-button').modal();

// 옵션과 함께 열기
$('.my-button').modal({
    width: 500,
    height: 400
});
```

## 🌐 브라우저 호환성

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)
- IE 11+ (제한적 지원)

## 📋 요구사항

- jQuery 3.x 이상

## 📂 파일 구조

```
jquery-modal/
├── index.html          # 데모 페이지
├── jquery-modal.js     # JavaScript 플러그인
├── jquery-modal.css    # 스타일시트
├── vercel.json         # Vercel 배포 설정
└── README.md           # 문서
```

## 🔧 개발

### 로컬에서 실행

1. 저장소 클론
```bash
git clone https://github.com/SiHyung-Lee/jquery-modal.git
cd jquery-modal
```

2. HTML 파일을 브라우저에서 열기
```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

또는 라이브 서버 사용:
```bash
# Python 3
python -m http.server 8000

# Node.js (npx 사용)
npx serve
```

그런 다음 브라우저에서 `http://localhost:8000` 접속

## 🐛 버그 리포트

버그를 발견하셨나요? [Issue](https://github.com/SiHyung-Lee/jquery-modal/issues)를 등록해주세요.

## 🤝 기여

Pull Request는 언제나 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 변경 이력

### v2.0.0 (2025-11-12)
- jQuery 3.7.1로 업데이트
- 오버레이와 닫기 버튼 추가
- 애니메이션 효과 추가
- 접근성 개선 (ARIA 속성, 키보드 네비게이션)
- 이벤트 위임 방식 개선
- 포커스 관리 기능 추가
- JSDoc 주석 추가

### v1.0.0
- 초기 릴리스

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 👤 작성자

**SiHyung Lee**

---

⭐ 이 프로젝트가 도움이 되셨다면 Star를 눌러주세요!
