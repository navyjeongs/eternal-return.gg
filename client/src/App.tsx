import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import styled, { ThemeProvider, keyframes } from "styled-components";

import { dark, light } from "./theme/theme";
import GlobalStyle from "./GlobalStyle";

import RouterSetting from "./RouterSetting";

import Header from "./pages/Header/Header";
import Footer from "./pages/Footer/Footer";
import { Loading } from "./components/FetchState";
const BtnKeyFrame = keyframes`
  0%{
    transform: rotate(0);
  }
  100%{
    transform:rotate(-180deg);
  }
`;

const BtnKeyFrame2 = keyframes`
  0%{
    transform: rotate(180deg);
  }
  100%{
    transform:rotate(0);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  min-height: 100vh;
  position: relative;
`;

const DarkModeBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 3.4rem;
  height: 3.4rem;
  border: 0;
  padding: 0;
  right: 1rem;
  bottom: 6.5rem;
  border: 0.2rem solid var(--color__txt);
  border-radius: 50%;
  cursor: pointer;
  background-color: inherit;

  &:hover {
    background-color: inherit;
  }

  &.light {
    animation: ${BtnKeyFrame} 0.5s ease-in-out forwards;
  }

  &.dark {
    animation: ${BtnKeyFrame2} 0.5s ease-in-out forwards;
  }
`;

interface Theme {
  isLoading: boolean;
  color: string;
}

function App() {
  const darkBtnRef = useRef<HTMLButtonElement>(null);

  const [themes, setThemes] = useState<Theme>({
    isLoading: true,
    color: "",
  });

  useEffect(() => {
    let setting = localStorage.getItem("theme");
    // 첫 방문이라면
    if (typeof setting === null) {
      localStorage.setItem("theme", "light");
      setting = "light";
    }
    setThemes({ isLoading: false, color: setting as string });
  }, []);

  const handleDarkModeChange = () => {
    if (darkBtnRef.current) {
      if (themes.color === "light") {
        darkBtnRef.current.classList.remove("light");
        darkBtnRef.current.classList.add("dark");
      } else {
        darkBtnRef.current.classList.remove("dark");
        darkBtnRef.current.classList.add("light");
      }
    }

    if (themes.color === "light") {
      localStorage.setItem("theme", "dark");
      setThemes({ isLoading: false, color: "dark" });
    } else {
      localStorage.setItem("theme", "light");
      setThemes({ isLoading: false, color: "light" });
    }
  };

  if (!themes.isLoading) {
    return (
      <>
        <ThemeProvider theme={themes.color === "light" ? light : dark}>
          <Wrapper>
            <Helmet>
              <title>현우GG 전적검색</title>
            </Helmet>
            <GlobalStyle />
            <Header />
            <RouterSetting />
            <Footer />
            <DarkModeBtn ref={darkBtnRef} onClick={handleDarkModeChange}>
              {themes.color === "light" ? (
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ borderRadius: "50%" }}
                >
                  <ellipse cx="13.4999" cy="13.5" rx="5.55555" ry="5.55556" fill="#222222" />
                  <path d="M13.5 3.77778V1" stroke="#222222" strokeWidth="2" strokeLinecap="round" />
                  <path d="M13.5 26V23.2222" stroke="#222222" strokeWidth="2" strokeLinecap="round" />
                  <path d="M20.3747 6.62495L22.3389 4.66077" stroke="#222222" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4.66118 22.3395L6.62537 20.3753" stroke="#222222" strokeWidth="2" strokeLinecap="round" />
                  <path d="M23.2222 13.5L26 13.5" stroke="#222222" strokeWidth="2" strokeLinecap="round" />
                  <path d="M0.999935 13.5L3.77771 13.5" stroke="#222222" strokeWidth="2" strokeLinecap="round" />
                  <path d="M20.3747 20.375L22.3389 22.3392" stroke="#222222" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4.66118 4.66054L6.62537 6.62473" stroke="#222222" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg
                  fill="#fcfafa"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="27px"
                  height="27px"
                  viewBox="0 0 292.299 292.299"
                  xmlSpace="preserve"
                  stroke="#fcfafa"
                  transform="rotate(45)"
                  style={{ borderRadius: "50%" }}
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <g>
                        <path d="M153.699,292.138C68.95,292.138,0,223.185,0,138.439C0,79.742,32.675,27.002,85.28,0.807 c2.369-1.174,5.215-0.718,7.077,1.144c1.864,1.864,2.345,4.711,1.183,7.074C83.941,28.527,79.077,49.496,79.077,71.33 c0,77.972,63.432,141.407,141.395,141.407c22.08,0,43.247-4.978,62.942-14.777c2.366-1.177,5.213-0.721,7.074,1.141 c1.873,1.867,2.342,4.714,1.177,7.073C265.61,259.195,212.738,292.138,153.699,292.138z"></path>{" "}
                      </g>
                    </g>
                  </g>
                </svg>
              )}
            </DarkModeBtn>
          </Wrapper>
        </ThemeProvider>
      </>
    );
  } else {
    return <Loading>로딩 중</Loading>;
  }
}

export default App;
