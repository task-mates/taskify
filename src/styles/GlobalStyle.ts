'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Thin.woff2') format('woff2');
    font-weight: 100;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-ExtraLight.woff2') format('woff2');
    font-weight: 200;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Light.woff2') format('woff2');
    font-weight: 300;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Regular.woff2') format('woff2');
    font-weight: 400;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Medium.woff2') format('woff2');
    font-weight: 500;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-SemiBold.woff2') format('woff2');
    font-weight: 600;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Bold.woff2') format('woff2');
    font-weight: 700;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-ExtraBold.woff2') format('woff2');
    font-weight: 800;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Black.woff2') format('woff2');
    font-weight: 900;
    font-display: swap;
}

:root {
    /* --- Color Palette --- */
    --color-white: #FFFFFF;
    --color-gray-100: #F8F7FA;
    --color-gray-200: #ECECEE;
    --color-gray-300: #D6D5D9;
    --color-gray-400: #A39FB2;
    --color-gray-500: #787486;
    --color-gray-600: #5B5963;
    --color-gray-700: #524F5B;
    --color-gray-800: #49474F;
    --color-gray-900: #3C3C41;

    --color-bg: #676975;
    --color-modal: #242424;
    --color-stroke: #1B1A1F;

    --color-black: #000000;
    --color-black-100: #4B4B4B;
    --color-black-200: #333236;
    --color-black-300: #262629;
    --color-black-400: #201F23;
    --color-black-500: #131215;

    --color-brand-100: #D9EFFF;  /*브랜드 부분은 피그마 적혀져있는 색상과 실제 코드는 달라서 일단 실제 코드로 작성했습니다. */
    --color-brand-200: rgba(169, 202, 225, 0.77);
    --color-brand-300: #80B4DA;
    --color-brand-400: #669DC4;
    --color-brand-500: #5085AA;
    --color-brand-600: #36739E;
    --color-brand-700: #1E5E8C;
    --color-brand-800: #0F456B;
    --color-brand-900: #002B49;
    --color-brand-1000: #001B33;

    --color-red: #CA372B;

    --color-blue-100: #76A5EA;

    --color-profile-green:#206E4E;
    --color-profile-violet: #593EA5;
    --color-profile-cyan: #1F6A83;
    --color-profile-rose: #AE2E24;
    --color-profile-yellow: #BD8C00;
    --color-profile-orange: #9F4B00;
    --color-profile-cobaltblue: #1458BC;

    /* --- Font --- */
    --font-main: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;

    --xs-12px-medium: 500 12px/normal Pretendard;
    --xs-12px-semibold: 600 12px/normal Pretendard;
    --sm-13px-medium: 500 13px/normal Pretendard;
    --sm-13px-semibold: 600 13px/normal Pretendard;
    --md-14px-medium: 500 14px/normal Pretendard;
    --md-14px-medium-150: 500 14px/1.5rem Pretendard;
    --lg-14px-semibold: 600 14px/normal Pretendard;
    --lg-14px-bold: 700 14px/normal Pretendard;
    --lg-16px-medium: 500 16px/normal Pretendard;
    --lg-16px-semibold: 600 16px/normal Pretendard;
    --lg-16px-medium-150: 500 16px/1.5rem Pretendard;
    --lg-16px-bold: 700 16px/normal Pretendard;
    --2lg-18px-medium: 500 18px/normal Pretendard;
    --2lg-18px-semibold: 600 18px/normal Pretendard;
    --2lg-18px-bold: 700 18px/normal Pretendard;
    --xl-20px-medium: 500 20px/normal Pretendard;
    --xl-20px-semibold: 600 20px/normal Pretendard;
    --xl-20px-bold: 700 20px/normal Pretendard;
    --2xl-24px-medium: 500 24px/normal Pretendard;
    --2xl-24px-semibold: 600 24px/normal Pretendard;
    --2xl-24px-bold: 700 24px/normal Pretendard;
    --3xl-32px-semibold: 600 32px/normal Pretendard;
    --3xl-32px-bold: 700 32px/normal Pretendard;

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font:inherit;
    color:inherit;
  }

  html, body {
    height: 100%;
  }

  body {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  input, button, textarea {
    border-radius: 0;
    border: none;
  }

  button {
    background: none;
    cursor: pointer;
  }

  ul, li{
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  img, picture, video, svg {
    display: block;
    max-width: 100%;
  }

  form {
    width: 100%;
  }
`;

export default GlobalStyle;
