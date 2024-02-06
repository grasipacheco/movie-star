import { createGlobalStyle } from "styled-components";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default createGlobalStyle`
:root {
    --color-primary: #507DBC;
    --color-primary-light: #96b1d7;
    --color-background-100: #343a40;
    --color-background-200: #1D3557;
    --color-background-300: #457B9D;
    --color-background-400: #023047;
    --color-background-500: #2b3035;
    --color-background-600: #e76f51;
    --color-background-900: #212529;
    --color-text: #f0f0f0;

    --color-error-background: #ffe6e6;
}
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;
  }

  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
    background-color: #001f3f;
    color: var(--color-text);
    padding: 0 0 8rem 0;
  }
`;
