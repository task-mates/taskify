'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

:root {

/* --- Color Palette --- */
    --color-black-000: #000000;
    --color-black-171: #171717;
    --color-black-333: #333236;
    --color-black-4B4: #4B4B4B;
    --color-gray-787: #787486;
    --color-gray-9FA: #9FA6B2;
    --color-gray-D9D: #D9D9D9;
    --color-gray-EEE: #EEEEEE;
    --color-gray-FAF: #FAFAFA;
    --color-white: #FFFFFF;

    --color-violet: #5534DA;
    --color-violet-light: #F1EFFD;
    --color-red: #D6173A;
    --color-green: #7AC555;
    --color-purple: #760DDE;
    --color-orange: #FFA500;
    --color-blue: #76A5EA;
    --color-pink: #E876EA;

/* --- Font --- */
    --font-main: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;

    --weight-bold: 700;
    --weight-semibold: 600;
    --weight-medium: 500;
    --weight-regular: 400;
    
    --text-3xl-size: 2rem;       /* 32px */
    --text-3xl-line: 2.625rem;   /* 42px */

    --text-2xl-size: 1.5rem;     /* 24px */
    --text-2xl-line: 2rem;       /* 32px */

    --text-xl-size: 1.25rem;     /* 20px */
    --text-xl-line: 2rem;        /* 32px */

    --text-2lg-size: 1.125rem;   /* 18px */
    --text-2lg-line: 1.625rem;   /* 26px */

    --text-lg-size: 1rem;        /* 16px */
    --text-lg-line: 1.625rem;    /* 26px */

    --text-md-size: 0.875rem;    /* 14px */
    --text-md-line: 1.5rem;      /* 24px */

    --text-sm-size: 0.8125rem;   /* 13px */
    --text-sm-line: 1.375rem;    /* 22px */

    --text-xs-size: 0.75rem;     /* 12px */
    --text-xs-line: 1.25rem;     /* 피그마에선 20px과 18px 혼용되어있는데 큰 쪽으로 통일함 */
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
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

    font-size: var(--text-lg-size);
    line-height: var(--text-lg-line);
  }
`;

export default GlobalStyle;
