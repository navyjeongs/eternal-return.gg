import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/Main/MainPage";
import Notices from "./pages/Notices/Notices";
import MatchHistory from "./pages/MatchHistory/MatchHistory";
import FoodRoute from "./pages/FoodMaker/FoodRoute";
import SearchRoute from "./pages/GameRoute/SearchRoute";
import DetailRoute from "./pages/GameRoute/DetailRoute";

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
        <Route path="/food/route" element={<FoodRoute />} />
        <Route path="/game/routes" element={<SearchRoute />} />
        <Route path="/game/route/:id" element={<DetailRoute />} />
      </Routes>
    </Main>
  );
};

export default RouterSetting;
