'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
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
