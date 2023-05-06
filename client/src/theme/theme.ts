import { DefaultTheme } from "styled-components";

export interface MyTheme extends DefaultTheme {
  bgColor: string;
  txtColor: string;
  hoverColor: string;
}

export const light: MyTheme = {
  bgColor: "#fcfafa",
  txtColor: "#121212",
  hoverColor: "#d9d9d9",
};

export const dark: MyTheme = {
  bgColor: "#121212",
  txtColor: "#ececec",
  hoverColor: "#2e313d",
};
