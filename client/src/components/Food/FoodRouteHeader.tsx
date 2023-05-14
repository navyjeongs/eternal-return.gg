import axios, { AxiosError } from "axios";
import { produce } from "immer";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CommonInput from "../common/CommonInput";
import { AreaMaterial } from "../../material/areaMaterialItem";
import { RoutePath } from "./FoodRouteMain";
import useInput from "../../hooks/useInput";

interface Toggle {
  isClickToggle: boolean;
}

interface Props {
  setArea: React.Dispatch<React.SetStateAction<Array<AreaMaterial>>>;
  setRouteTitle: React.Dispatch<React.SetStateAction<string>>;
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
  column-gap: 0.5rem;
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
const ResetBtn = styled.button`
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.2rem solid var(--color__txt);
  padding: 0;

  cursor: pointer;
  border-radius: 1rem;
`;
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

const FoodRouteHeader = (prop: Props) => {
  const { setArea, setRouteTitle } = prop;

  const [isClickToggle, setIsClickToggle] = useState(true);

  const [routeId, setRouteId, resetRouteId] = useInput("");

  /**
   * 루트에서 선택 지역을 가져오는 함수
   * @param e
   */
  const getRoutePath = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const res = await axios({
        method: "GET",
        url: `/api/routepath/${routeId}`,
      });

      const { code, title, path } = res.data;

      let paths: Array<RoutePath> = [];

      setArea(
        produce<Array<AreaMaterial>>((draft) => {
          for (let i = 0; i < path.length; i++) {
            draft[path[i]].isClick = true;
          }
        })
      );

      setRouteTitle(res.data.title);
    } catch (error: any) {
      alert(error.response.data.message);
    }
    resetRouteId("");
  };

  /**
   * 선택 지역 초기화 하는 함수
   */
  const resetArea = () => {
    if (window.confirm("선택지역을 초기화 하시겠습니까?")) {
      setArea(
        produce<Array<AreaMaterial>>((draft) => {
          for (let i = 1; i < 19; i++) {
            draft[i].isClick = false;
          }
        })
      );
      resetRouteId("");
      setRouteTitle("");
    }
  };

  // 토글 on / off
  const handleToggle = () => {
    setIsClickToggle((prev) => !prev);
  };

  // 토글 on / off에 따라 시작 아이템 포함 여부
  useEffect(() => {
    setArea(
      produce<Array<AreaMaterial>>((draft) => {
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
              onChange={setRouteId}
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
          <ResetBtn onClick={resetArea}>
            <svg width="23" height="26" viewBox="0 0 23 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.25 14.375L8.75 19.5417L14.25 24.7083" stroke="var(--color__txt)" strokeWidth="2" />
              <path
                d="M3.16451 15.0208C2.10511 13.2971 1.68079 11.2932 1.95734 9.31981C2.2339 7.34645 3.19589 5.51397 4.6941 4.10656C6.19231 2.69914 8.14302 1.79546 10.2437 1.53567C12.3444 1.27587 14.4776 1.67448 16.3125 2.66967C18.1474 3.66486 19.5815 5.20101 20.3923 7.03988C21.2032 8.87876 21.3454 10.9176 20.797 12.8401C20.2487 14.7627 19.0403 16.4615 17.3593 17.6732C15.6784 18.8849 13.6188 19.5416 11.5 19.5416"
                stroke="var(--color__txt)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </ResetBtn>
        </SearchContainer>
      </ContentWrapper>
    </Container>
  );
};

export default FoodRouteHeader;
