# 🗂️ TASKIFY
<img width="1920" height="1080" alt="dashboard" src="https://github.com/user-attachments/assets/c033eda1-c901-42e8-8556-d35abab780be" />

<br>

## 프로젝트 기간 및 배포 주소
- 📅 프로젝트 기간 : 2026.04.20 ~ 2026.05.08
- 🔗 배포 주소 :
  

## 프로젝트 설명
Taskify는 팀 단위 협업을 위한 일정 관리 웹 서비스입니다.<br>
칸반 보드 기반으로 할 일을 생성·수정·삭제할 수 있으며<br>
컬럼 이동, 담당자 지정, 댓글 작성 등을 통해<br>
효율적인 팀 협업이 가능합니다.

<br>

## 🚀 주요 기능

📋 대시보드 관리: 대시보드 생성, 수정 및 초대 기능 제공<br>
🗂️ 컬럼 관리: 컬럼 생성 / 수정 / 삭제 및 Drag & Drop 이동 지원<br>
✅ 할 일 카드 관리: 카드 생성, 수정, 삭제 및 상세 조회 모달 제공<br>
👤 담당자 지정 기능: 카드별 담당자 지정 및 프로필 표시 기능 제공<br>
🏷️ 태그 기능: 태그 생성 및 색상 자동 적용 기능 지원<br>
📅 마감일 관리: DatePicker 기반 마감일 및 시간 설정 기능 제공<br>
💬 댓글 기능: 댓글 작성, 수정, 삭제 및 실시간 UI 반영<br>
🔔 Toast 알림: 작업 성공 / 실패 상태를 사용자에게 실시간 안내<br>
🖼️ 이미지 업로드: 카드 및 프로필 이미지 업로드 및 썸네일 표시 기능 지원<br>
📱 반응형 UI: Desktop / Tablet / Mobile 환경 최적화 지원<br>
🔐 인증 기능: 회원가입, 로그인 및 Access Token 기반 인증 처리<br>
⚡ 모달 기반 인터랙션: 생성 / 수정 / 조회 기능을 모달 중심 UX로 구현<br>
🎨 공통 디자인 시스템: styled-components 기반 공통 UI 컴포넌트 관리


<br>

## 🛠️ 기술 스택
### Frontend
- Next.js
- React 
- TypeScript
- styled-components

### Library
- Axios
- react-hot-toast
- @hello-pangea/dnd
- react-datepicker
- dayjs
- date-fns
  
### Development
- ESLint
- npm
- Webpack

### Collaboration
- GitHub
- Discord
- Figma
- Notion

### Deployment
- Vercel

<br>

## 프로젝트 구조
## 📁 프로젝트 구조

```bash
src/
 ├── 📁 apis/                # Axios 인스턴스 및 API 요청 함수
 │    ├── auth/              # 인증 관련 API
 │    ├── dashboards/        # 대시보드 API
 │    ├── cards/             # 카드(할 일) API
 │    ├── comments/          # 댓글 API
 │    └── instance.ts        # 공통 Axios 설정 및 인터셉터
 │
 ├── 📁 app/                 # Next.js App Router
 │    ├── (app)/             # 로그인 이후 페이지
 │    ├── (public)/          # 공개 페이지
 │    ├── layout.tsx         # 루트 레이아웃
 │    └── registry.tsx       # styled-components SSR 설정
 │
 ├── 📁 components/          # 공통 재사용 UI 컴포넌트
 │    ├── common/            # Button, Input, Toast 등 공통 요소
 │    ├── layout/            # Header, Sidebar, Footer 레이아웃
 │    ├── Modal/             # 공통 모달 컴포넌트
 │    ├── modals/            # 기능별 모달 컴포넌트
 │    └── icons/             # SVG 아이콘
 │
 ├── 📁 hooks/               # 커스텀 훅
 │
 ├── 📁 lib/                 # 상수 및 공통 라이브러리 설정
 │
 ├── 📁 styles/              # 전역 스타일 및 디자인 토큰
 │
 ├── 📁 types/               # 공통 타입 정의
 │
 ├── 📁 utils/               # 공통 유틸 함수
 │
 └── 📁 public/images/       # 정적 이미지 파일
```

<br>

# 👥 팀원 소개

| 권다은 | 김유민 | 박현우 | 양채원 | 이차현 |
| --- | --- | --- | --- | --- |
| <img src="https://avatars.githubusercontent.com/u/148428665?v=4" width="160" /> | <img src="https://avatars.githubusercontent.com/u/225640245?v=4" width="160" /> | <img src="https://avatars.githubusercontent.com/u/83463918?v=4" width="160" /> | <img src="https://avatars.githubusercontent.com/u/218423054?v=4" width="160" /> | <img src="https://avatars.githubusercontent.com/u/163325051?v=4" width="160" /> |
| <div align="center">github: [ekdmskwon](https://github.com/ekdmskwon)</div> | <div align="center">github: [Kimyum0307](https://github.com/Kimyum0307)</div> | <div align="center">github: [pho9902](https://github.com/pho9902)</div> | <div align="center">github: [devchae10](https://github.com/devchae10)</div> | <div align="center">github: [chahyunlee](https://github.com/chahyunlee)</div> |
