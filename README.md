# 무역 AI 프롬프트 가이드

무역 실무에 최적화된 AI 프롬프트 작성법을 학습하고, OpenAI GPT를 활용해 프롬프트를 직접 생성할 수 있는 인터랙티브 가이드 웹앱입니다.

---

## 주요 기능

### 콘텐츠
- **Intro** — 좋은 프롬프트를 만드는 5가지 핵심 원칙 (황금열쇠 클릭 시 카드 펼침)
- **1장** 무역 AI 프롬프트의 기초
- **2장** 고급 프롬프트 패턴
- **3장** 프롬프트 프레임워크
- **4장** 프롬프트 마스터

### UI / 인터랙션
| 기능 | 설명 |
|------|------|
| **사이드바 네비게이션** | 챕터 클릭 → 해당 위치로 스크롤. 현재 챕터의 소제목만 펼침 |
| **스크롤 스파이** | 스크롤 위치에 따라 사이드바 활성 항목 자동 업데이트 |
| **AI 프롬프트 생성** | 원하는 업무를 입력하면 GPT-4o-mini가 최적화된 프롬프트를 생성 (Ctrl+Enter) |
| **생성 기록** | 최근 생성한 프롬프트 최대 10개를 localStorage에 저장. 사이드바 하단 버튼으로 팝업 조회 |
| **포춘 쿠키** | 페이지 곳곳에 떠 있는 쿠키 클릭 시 오늘의 운세·행운의 숫자·아이템·색상 팝업. 팝업 우하단에 로또 QR 코드와 "당신의 행운을 시험해보세요" 문구 포함 |
| **모바일 지원** | 햄버거 버튼으로 사이드바 토글 |

---

## 프로젝트 구조

```
Prompt/
├── index.html                  # 메인 HTML (전체 콘텐츠 포함)
├── css/
│   └── styles.css              # 전체 스타일
├── js/
│   ├── config.js               # OpenAI API 키 (Git 제외, 로컬 전용)
│   ├── config.example.js       # API 키 설정 예시 파일
│   ├── fortune-data.js         # 포춘 쿠키 데이터 (운세·숫자·아이템·색상 각 30개)
│   └── script.js               # 전체 동작 로직
├── netlify/
│   └── functions/
│       └── ai-search.js        # Netlify 서버리스 함수 (API 키 서버 측 보호)
├── fortune_cookie.png          # 포춘 쿠키 이미지
├── qrcode_313168229_*.png      # 로또 사이트 QR 코드 이미지
├── prompt_favicon.jpeg         # 파비콘
├── netlify.toml                # Netlify 배포 설정
└── .gitignore
```

---

## 시작하기

### 로컬 실행

1. 저장소 클론
   ```bash
   git clone <repo-url>
   cd Prompt
   ```

2. API 키 설정
   ```bash
   cp js/config.example.js js/config.js
   ```
   `js/config.js`를 열고 `your-api-key-here` 자리에 OpenAI API 키를 입력합니다.
   ```js
   const OPENAI_API_KEY = 'sk-...';
   ```

3. 로컬 서버로 실행 (파일을 직접 열면 CORS 오류가 발생할 수 있습니다)
   ```bash
   # Python 3
   python -m http.server 8080

   # 또는 VS Code Live Server 확장 사용
   ```

4. 브라우저에서 `http://localhost:8080` 접속

> `js/config.js`는 `.gitignore`에 등록되어 있어 Git에 커밋되지 않습니다.

---

## Netlify 배포

이 프로젝트는 Netlify에 최적화되어 있습니다. 배포 시 API 키는 환경변수로 관리되므로 클라이언트에 노출되지 않습니다.

### 배포 절차

1. [Netlify](https://netlify.com)에서 저장소 연결
2. **Site settings → Environment variables**에서 `OPENAI_API_KEY` 추가
3. 빌드 설정은 `netlify.toml`에 이미 포함되어 있습니다

```toml
[build]
  publish = "."
  functions = "netlify/functions"
```

배포 후에는 AI 생성 요청이 `netlify/functions/ai-search.js` 서버리스 함수를 통해 처리됩니다.

---

## 기술 스택

- **Frontend** — Vanilla HTML / CSS / JavaScript (프레임워크 없음)
- **AI** — OpenAI GPT-4o-mini (`/v1/chat/completions`)
- **폰트** — Noto Sans KR, IBM Plex Mono (Google Fonts)
- **배포** — Netlify (정적 호스팅 + 서버리스 함수)

---

## 포춘 쿠키 데이터

`js/fortune-data.js`에 4개 카테고리 × 30개 항목 = **총 120개** 데이터가 정의되어 있습니다.

| 카테고리 | 항목 수 |
|----------|---------|
| 오늘의 운세 | 30 |
| 행운의 숫자 | 30 |
| 행운의 아이템 | 30 |
| 행운의 색상 | 30 |

데이터를 수정하거나 추가하려면 `js/fortune-data.js`의 `FORTUNE_DATA` 객체를 편집하세요.

---

## 주의사항

- `js/config.js`는 절대 Git에 커밋하지 마세요. `.gitignore`에 이미 포함되어 있습니다.
- Netlify 배포 환경에서는 `js/config.js`가 없어도 서버리스 함수가 환경변수의 키를 사용합니다.
- 로컬 개발 환경에서는 반드시 `js/config.js`가 있어야 AI 생성 기능이 동작합니다.
