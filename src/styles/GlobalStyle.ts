"use client";

import { createGlobalStyle } from "styled-components";

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

  img, picture, video, svg{
    display: block;
    max-width: 100%;
  }

  button {
    background:none;
    border:0;
    cursor:pointer;
    }
  a {
    text-decoration:none;
    }
`;

export default GlobalStyle;
