# 🗂️ TASKIFY
<img width="1699" height="1034" alt="landing-intro" src="https://github.com/user-attachments/assets/784815f4-3514-4f6d-aa9c-aab1936c2884" />


<br>

## 프로젝트 기간 및 배포 주소
- 📅 프로젝트 기간 : 2026.04.20 ~ 2026.05.08
- 🔗 배포 주소 : https://taskify-one-lemon.vercel.app/

<br>

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
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">&nbsp;<img src="https://camo.githubusercontent.com/052ab4f2ab3eab9bf3c9d7dafb0012176462520dd251a209b390d5ef8ee6a064/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f7374796c65642d2d636f6d706f6e656e74732d2532334442373039332e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d7374796c65642d636f6d706f6e656e7473266c6f676f436f6c6f723d7768697465">

### Library
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/datefns-770C56?style=for-the-badge&logo=datefns&logoColor=white"><br>
`react-hot-toast` `@hello-pangea/dnd` `react-datepicker` `react-loading-skeleton`

  
### Development
<img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=white">

### Collaboration
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">&nbsp;<img src="https://camo.githubusercontent.com/5b181ba23f182ab380f76b27db116e0770ebb95a03bc8d1bc6320cdd92c839eb/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f676f6f676c652532307368656574732d2532333334413835332e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d676f6f676c65253230736865657473266c6f676f436f6c6f723d7768697465">

### Deployment
<img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">

<br>

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

## 👥 팀원 소개

| 권다은 | 김유민 | 박현우 | 양채원 | 이차현 |
| --- | --- | --- | --- | --- |
| <img src="https://avatars.githubusercontent.com/u/148428665?v=4" width="160" /> | <img src="https://avatars.githubusercontent.com/u/225640245?v=4" width="160" /> | <img src="https://avatars.githubusercontent.com/u/83463918?v=4" width="160" /> | <img src="https://avatars.githubusercontent.com/u/218423054?v=4" width="160" /> | <img src="https://avatars.githubusercontent.com/u/163325051?v=4" width="160" /> |
| <div align="center">github: [ekdmskwon](https://github.com/ekdmskwon)</div> | <div align="center">github: [Kimyum0307](https://github.com/Kimyum0307)</div> | <div align="center">github: [pho9902](https://github.com/pho9902)</div> | <div align="center">github: [devchae10](https://github.com/devchae10)</div> | <div align="center">github: [chahyunlee](https://github.com/chahyunlee)</div> |
