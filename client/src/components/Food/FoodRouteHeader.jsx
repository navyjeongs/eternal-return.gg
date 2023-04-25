import axios from "axios";
import { produce } from "immer";
import { useState } from "react";
import styled from "styled-components";

const Title = styled.div`
  text-align: center;
  margin: 5px auto;
  font-size: 35px;
`;

const StartFood = styled(Title)`
  font-size: 20px;
`;
const Search = styled.div`
  text-align: center;
  margin: 5px auto;
  font-size: 20px;
`;
const SearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.input.attrs((prop) => ({
  type: "number",
}))`
  font-family: jua;
  height: 30px;
  margin: 0px;
  padding: 0px 5px;
  box-sizing: border-box;
`;
const ResetBtn = styled.button.attrs(() => ({
  type: "button",
}))`
  border: none;
  padding: 0px 5px;
  border-radius: 15px;
  font-family: Jua;
  font-size: 17px;
  height: 25px;
  background-color: #94b49f;
  color: #277bc0;
  &:hover {
    background-color: #c4dfaa;
    cursor: pointer;
  }
`;
const SearchSubmitBtn = styled(ResetBtn).attrs(() => ({
  type: "submit",
}))``;

const FoodRouteHeader = (prop) => {
  const { area, setArea, setRouteTitle } = prop;

  const [routeId, setRouteId] = useState("");

  // 시작아이템 포함 여부
  const isClickStartItem = () => {
    const isClick = area[0].isClick;
    setArea(
      produce((draft) => {
        draft[0].isClick = !isClick;
      })
    );
  };

  const getRoutePath = async (e) => {
    e.preventDefault();

    let area;
    const url = process.env.REACT_APP_BACKEND_API + `/api/routepath/${routeId}`;
    const res = await axios({
      rejectUnauthorized: false,
      method: "GET",
      url: `${url}`,
    });

    if (res.data.code === "error") {
      window.alert("존재하지 않는 루트ID 입니다.");
    } else {
      area = res.data.path.toString().split(", ");
      for (let i = 0; i < area.length; i++) {
        area[i] = Number(area[i]);
      }
      // 선택 지역 초기화 하기
      resetClickArea();

      // 루트에서 가져온 지역의 isClick을 true로 변경
      for (let i = 0; i < area.length; i++) {
        setArea(
          produce((draft) => {
            draft[area[i]].isClick = true;
          })
        );
      }
      setRouteTitle(res.data.title);
    }
  };

  const resetClickArea = () => {
    for (let i = 1; i < area.length; i++) {
      setArea(
        produce((draft) => {
          draft[i].isClick = false;
        })
      );
    }
    setRouteTitle("");
  };

  const changeRouteId = (e) => {
    const { value } = e.target;
    setRouteId(value);
  };

  return (
    <>
      <Title>음식 생성기</Title>
      <StartFood>
        시작 아이템(빵, 물) 포함 여부
        <button onClick={isClickStartItem} />
      </StartFood>
      <Search>
        루트 ID로 루트 가져오기
        <SearchForm onSubmit={getRoutePath}>
          <SearchInput onChange={changeRouteId} value={routeId} />
          <SearchSubmitBtn onClick={getRoutePath}>검색</SearchSubmitBtn>
          <ResetBtn onClick={resetClickArea}>선택지역 초기화</ResetBtn>
        </SearchForm>
      </Search>

      <div style={{ margin: "0 auto", width: "1200px" }}></div>
      <div style={{ display: "flex", margin: "0 auto", width: "1200px" }}></div>
    </>
  );
};

export default FoodRouteHeader;
