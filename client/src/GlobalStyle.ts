import { createGlobalStyle } from "styled-components";
import { Theme } from "./theme/theme";

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`

    *, *::before, *::after {
        box-sizing: border-box;
        color: ${(prop) => prop.theme.txtColor};
        background-color: ${(prop) => prop.theme.bgColor};
        font-family: kim;
    }

    button:hover {
        background-color: ${(prop) => prop.theme.hoverColor};
    }


    :root{
        box-sizing: border-box;
        --color__txt : ${(prop) => prop.theme.txtColor};
        --color__bg : ${(prop) => prop.theme.bgColor};

        --color__solo : #264653;
        --color__duo: #4a4e69;
        --color__squad : #9a8c98;
        --color__cobalt: #c9ada7;

        --color__1st:#4a9f4d;
        --color__2nd:#0a7cbc;
        --color__3rd:#515151;
        --color__cobalt__2nd:#e63946;

        --color__weapon__bg: #1b263b;
    }


    @font-face {
        font-family: 'kim';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/KimjungchulGothic-Bold.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }   

`;

export default GlobalStyle;
