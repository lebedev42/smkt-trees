import { createGlobalStyle, keyframes } from 'styled-components';
import { theme } from './theme';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    font-size: 16px;
    overflow: hidden;
    font-family: Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
  }

  body {
    height: 100%;
    min-height: 100%;
    overflow: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;
    margin: 0;
    padding: 0;
    background: #ff335f;
  }
`;

export { GlobalStyle };
