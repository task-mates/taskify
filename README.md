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

**🔐 인증**
- 회원가입, 로그인 및 Access Token 기반 인증 처리

**📋 대시보드 & 협업**
- 대시보드 생성, 수정 및 멤버 초대
- 카드별 담당자 지정 및 프로필 표시

**🗂️ 칸반 보드**
- 컬럼 생성 / 수정 / 삭제 및 Drag & Drop 이동
- 할 일 카드 생성, 수정, 삭제 및 상세 조회 모달
- 태그 생성 및 색상 자동 적용
- DatePicker 기반 마감일 및 시간 설정
- 댓글 작성, 수정, 삭제
- 카드 및 프로필 이미지 업로드

**📱 UI / UX**
- 생성 / 수정 / 조회 기능을 모달 중심 UX로 구현
- Desktop / Tablet / Mobile 반응형 지원


<br>

## 🛠️ 기술 스택
### Frontend
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">&nbsp;<img src="https://camo.githubusercontent.com/052ab4f2ab3eab9bf3c9d7dafb0012176462520dd251a209b390d5ef8ee6a064/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f7374796c65642d2d636f6d706f6e656e74732d2532334442373039332e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d7374796c65642d636f6d706f6e656e7473266c6f676f436f6c6f723d7768697465">

### Library
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/datefns-770C56?style=for-the-badge&logo=datefns&logoColor=white"><br>
`react-hot-toast` `@hello-pangea/dnd` `react-datepicker` `react-loading-skeleton`

  
### Development
<img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">

### Collaboration
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">&nbsp;<img src="https://camo.githubusercontent.com/5b181ba23f182ab380f76b27db116e0770ebb95a03bc8d1bc6320cdd92c839eb/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f676f6f676c652532307368656574732d2532333334413835332e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d676f6f676c65253230736865657473266c6f676f436f6c6f723d7768697465">

### Deployment
<img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">

<br>

## 🚀 시작하기

이 프로젝트를 로컬 환경에서 설정하고 실행하는 방법입니다.

### 0. 필수 요구사항 

프로젝트를 실행하기 위해 다음 항목들이 설치되어 있어야 합니다.
* **Node.js**: 18.0.0 버전 이상
* **npm** 또는 **yarn** (패키지 매니저)


### 1. Installation
- 프로젝트를 로컬에 복제한 후 의존성 패키지를 설치합니다.
```bash
git clone https://github.com/task-mates/taskify.git

# 해당 디렉토리로 cd 후
npm install
```

### 2. Development
- 로컬 개발 서버는 기본적으로 http://localhost:3000 에서 실행됩니다. (환경에 따라 5173 등으로 변경될 수 있습니다.)
```bash
npm run dev
```

### 3. Build
- 프로덕션 환경을 위한 빌드 파일을 생성합니다. 결과물은 /dist 폴더에 저장됩니다.
```bash
npm run build
```

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

### [역할 분담]
<table>
  <tr>
    <th>👤 이름</th>
    <th align="left">💻 작업</th>
  </tr>

  <tr>
    <td>권다은</td>
    <td align="left">
      - 로그인 페이지<br />
      - 회원가입 페이지<br />
      - 계정관리 페이지<br />
      - 나의 대시보드 페이지<br />
      - FAQ, 이용약관
    </td>
  </tr>

  <tr>
    <td>김유민</td>
    <td align="left">
      - 디자인 시스템<br />
      - 공통 컴포넌트<br />
      - 토스트
    </td>
  </tr>

  <tr>
    <td>박현우</td>
    <td align="left">
      - 대시보드 생성 / 관리<br />
      - 헤더 컴포넌트<br />
      - 구성원 확인 모달<br />
      - 칼럼 추가 / 수정 / 초대하기 모달
    </td>
  </tr>

  <tr>
    <td>양채원</td>
    <td align="left">
      - 할일 카드 생성 / 수정 / 조회 모달<br />
      - 랜딩 페이지
    </td>
  </tr>

  <tr>
    <td>이차현</td>
    <td align="left">
      - 사이드바<br />
      - 대시보드 페이지
    </td>
  </tr>
</table>
