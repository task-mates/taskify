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
    border: none;
  }

  button {
    background: none;
    cursor: pointer;
  }

  form {
    width: 100%;
  }

  ul, ol{
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  img, picture, video{
    display: block;
    max-width: 100%;
  }
`;

export default GlobalStyle;
