import { DefaultTheme } from "styled-components";

export interface MyTheme extends DefaultTheme {
  bgColor: string;
  txtColor: string;
  hoverColor: string;
  borderColor: string;
}

export const light: MyTheme = {
  bgColor: "#fcfafa",
  txtColor: "#110D15",
  hoverColor: "#d9d9d9",
  borderColor: "#e5e5e5",
};

export const dark: MyTheme = {
  bgColor: "#110D15",
  txtColor: "#ececec",
  hoverColor: "#2e313d",
  borderColor: "#1F1B23",
};
