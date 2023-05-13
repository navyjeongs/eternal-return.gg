import axios from "axios";
import { produce } from "immer";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CommonInput from "../common/CommonInput";

interface Toggle {
  isClickToggle: boolean;
}

const Container = styled.div`
  @media screen and (max-width: 1080px) {
    width: 90%;
    margin: 0 auto;
  }
`;

const Title = styled.div`
  text-align: center;
  font-size: 3.5rem;
  margin: 2rem 0;
`;

const ContentWrapper = styled.div`
  margin-left: 40rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 1080px) {
    margin: 0 auto;
    flex-direction: column;
    row-gap: 2rem;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const SearchForm = styled.form`
  box-sizing: content-box;
  font-size: 1.5rem;
  height: 3rem;
  border: 0.2rem solid var(--color__txt);
  display: flex;
`;

const SearchSubmitBtn = styled.button.attrs(() => ({
  type: "submit",
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  padding: 0 0.5rem 0 0;
  border: 0;
  cursor: pointer;
`;

const StartFoodContainer = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
  column-gap: 1rem;
`;
const StartFoodContent = styled.div``;
const ToggleContainer = styled.div<Toggle>`
  position: relative;
  cursor: pointer;

  width: 4rem;
  height: 2rem;
  border-radius: 3rem;
  background-color: #edede9;
  transition: 0.5s;

  ${(prop) =>
    prop.isClickToggle &&
    `
      background-color:#43aa8b;
    `}
`;
const ToggleCircle = styled.div<Toggle>`
  position: absolute;
  width: 1.6rem;
  height: 1.6rem;

  left: 0.2rem;
  top: 0.2rem;

  border-radius: 50%;
  transition: 0.5s;

  ${(prop) =>
    prop.isClickToggle &&
    `
      left:2.2rem;
    `}
`;

const FoodRouteHeader = (prop) => {
  const { area, setArea, setRouteTitle } = prop;

  const [isClickToggle, setIsClickToggle] = useState(true);

  const [routeId, setRouteId] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRouteId(e.target.value);
  };

  const getRoutePath = async (e) => {
    e.preventDefault();

    let area: any;
    const url = `/api/routepath/${routeId}`;
    const res = await axios({
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

  // 토글 on / off
  const handleToggle = () => {
    setIsClickToggle((prev) => !prev);
  };

  // 토글 on / off에 따라 시작 아이템 포함 여부
  useEffect(() => {
    setArea(
      produce((draft) => {
        draft[0].isClick = isClickToggle;
      })
    );
  }, [isClickToggle]);

  return (
    <Container>
      <Title>음식 생성기</Title>
      <ContentWrapper>
        <StartFoodContainer>
          <StartFoodContent>시작 아이템(빵, 물) 포함</StartFoodContent>
          <ToggleContainer onClick={handleToggle} isClickToggle={isClickToggle}>
            <ToggleCircle isClickToggle={isClickToggle} />
          </ToggleContainer>
        </StartFoodContainer>
        <SearchContainer>
          <SearchForm onSubmit={getRoutePath}>
            <CommonInput
              onChange={handleInput}
              value={routeId}
              placeholder="루트 ID를 입력하세요."
              width="15rem"
              height="3rem"
            />
            <SearchSubmitBtn onClick={getRoutePath}>
              <svg width="24" height="24" viewBox="0 0 26 26" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.111 2.88892C8.19557 2.88892 6.35859 3.64985 5.00417 5.0043C3.64976 6.35875 2.88886 8.19578 2.88886 10.1113C2.88886 12.0268 3.64976 13.8638 5.00417 15.2182C6.35859 16.5727 8.19557 17.3336 10.111 17.3336C12.0264 17.3336 13.8634 16.5727 15.2178 15.2182C16.5722 13.8638 17.3331 12.0268 17.3331 10.1113C17.3331 8.19578 16.5722 6.35875 15.2178 5.0043C13.8634 3.64985 12.0264 2.88892 10.111 2.88892ZM3.18615e-07 10.1113C3.04745e-06 8.50973 0.380427 6.93109 1.10994 5.50536C1.83946 4.07963 2.89721 2.84759 4.19607 1.91069C5.49494 0.973792 6.99777 0.358835 8.58082 0.116462C10.1639 -0.125912 11.7819 0.0112318 13.3015 0.516598C14.8212 1.02196 16.1991 1.8811 17.3217 3.02325C18.4444 4.1654 19.2797 5.5579 19.7588 7.08608C20.238 8.61426 20.3473 10.2344 20.0778 11.8131C19.8082 13.3918 19.1675 14.8839 18.2085 16.1665L25.5765 23.5333C25.8475 23.8041 25.9999 24.1716 26 24.5547C26.0001 24.9379 25.8481 25.3054 25.5772 25.5765C25.3064 25.8475 24.939 25.9999 24.5558 26C24.1726 26.0001 23.8051 25.8481 23.5341 25.5772L16.1675 18.2104C14.6646 19.3347 12.8784 20.0184 11.009 20.1851C9.13949 20.3518 7.26054 19.9949 5.58244 19.1542C3.90434 18.3136 2.49334 17.0224 1.50741 15.4253C0.521477 13.8282 -0.000470776 11.9882 3.18615e-07 10.1113V10.1113Z"
                  fill="var(--color__txt)"
                />
              </svg>
            </SearchSubmitBtn>
          </SearchForm>
        </SearchContainer>
      </ContentWrapper>
    </Container>
  );
};

export default FoodRouteHeader;
