import { createGlobalStyle, css } from "styled-components";

export const myTheme = {
  moderateBlue: "hsl(238, 40%, 52%)",
  softRed: "hsl(358, 79%, 66%)",
  lightGrayishBlue: "hsl(239, 57%, 85%)",
  paleRed: "hsl(357, 100%, 86%)",
  darkBlue: "hsl(212, 24%, 26%)",
  grayishBlue: "hsl(211, 10%, 45%)",
  lightGray: "hsl(223, 19%, 93%)",
  veryLightGray: "hsl(228, 33%, 97%)",
} as const;

type MyTheme = typeof myTheme;
declare module "styled-components" {
  export interface DefaultTheme extends MyTheme {}
}

export const GlobalStyle = createGlobalStyle(
  ({ theme }) => css`
    @import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap");

    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      min-height: 100vh;
      font-family: "Rubik", sans-serif;
      background-color: ${theme.lightGray};
    }

    button {
      font-family: "Rubik", sans-serif;
    }

    p {
      font-size: 1rem;
    }

    .description {
      font-size: 1rem;
      line-height: 1.1rem;
      color: ${theme.grayishBlue};

      &.error {
        color: ${theme.softRed};
      }
    }

    > .title {
      font-size: 1.3rem;
      color: ${theme.darkBlue};
    }
  `
);
