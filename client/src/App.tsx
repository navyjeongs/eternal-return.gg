import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";

import theme from "./theme/theme";
import GlobalStyle from "./GlobalStyle";

import RouterSetting from "./RouterSetting";

import Header from "./pages/Header/Header";
import Footer from "./pages/Footer/Footer";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  min-height: 100vh;
`;

interface Theme {
  isLoading: boolean;
  color: string;
}

function App() {
  const [themes, setThemes] = useState<Theme>({
    isLoading: true,
    color: "",
  });

  useEffect(() => {
    let setting = localStorage.getItem("theme");
    // 첫 방문이라면
    if (setting === null) {
      localStorage.setItem("theme", "light");
      setting = "light";
    }
    setThemes({ isLoading: false, color: setting });
  }, []);

  if (!themes.isLoading) {
    return (
      <>
        <Wrapper>
          <Helmet>
            <title>현우GG 전적검색</title>
          </Helmet>
          <GlobalStyle theme={theme[themes.color]} />
          <Header />
          <RouterSetting />
          <Footer />
        </Wrapper>
      </>
    );
  } else {
    return <div>로딩 중</div>;
  }
}

export default App;
