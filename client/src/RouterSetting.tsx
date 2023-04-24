import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/Main/MainPage";
import styled from "styled-components";
import Notices from "./pages/Notices/Notices";
import MatchHistory from "./pages/MatchHistory/MatchHistory";

const Main = styled.main`
  padding-top: 5.2rem;
  width: 100%;
`;

const RouterSetting = () => {
  return (
    <Main>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/notice" element={<Notices />} />
        <Route path="/user/:name" element={<MatchHistory />} />
      </Routes>
    </Main>
  );
};

export default RouterSetting;
