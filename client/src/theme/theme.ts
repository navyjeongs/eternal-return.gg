interface Theme {
  bgColor: string;
  txtColor: string;
  hoverColor: string;
}

interface ThemeGroup {
  light: Theme;
  dark: Theme;
}

export const light: Theme = {
  bgColor: "#fcfafa",
  txtColor: "#121212",
  hoverColor: "#d9d9d9",
};

export const dark: Theme = {
  bgColor: "#121212",
  txtColor: "#ececec",
  hoverColor: "#2e313d",
};

const theme: ThemeGroup = {
  light,
  dark,
};

export default theme;
