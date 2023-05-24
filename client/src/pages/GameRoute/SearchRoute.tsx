import styled from "styled-components";
import { useState } from "react";

import useInput from "@src/hooks/useInput";
import CommonInput from "@src/components/common/CommonInput";

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  max-width: 108rem;
  margin: 0 auto;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35rem;
`;

const InputContainer = styled.div`
  text-align: center;
  font-size: 1.6rem;
`;

const Img = styled.img.attrs<{ url: number }>((prop) => ({
  src: `/img/search/${prop.url}.png`,
}))<{ url: number }>`
  width: 15rem;
  height: 15rem;
`;

const RouteSearchContent = styled.div`
  margin: 2rem 0;
`;

const SearchForm = styled.form`
  border: 0.2rem solid var(--color__txt);
  display: flex;
  align-items: center;
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

const SearchRoute = () => {
  const [randImgNum, setRandImgNum] = useState(Math.floor(Math.random() * 22)); // 0 ~ 사진 크기만큼의 랜덤 숫자 생성

  const [routeId, setRouteId] = useInput("");

  const handleSearchRoute = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <Container>
      <Wrapper>
        <Content>
          <InputContainer>
            <Img url={randImgNum} />
            <RouteSearchContent>루트 아이디를 입력하여 검색하세요.</RouteSearchContent>
            <SearchForm onSubmit={handleSearchRoute}>
              <CommonInput
                value={routeId}
                onChange={setRouteId}
                width="25rem"
                height="4rem"
                type="number"
                placeholder="루트 ID"
              />
              <SearchSubmitBtn onClick={handleSearchRoute}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.6665 3.33337C9.45642 3.33337 7.33683 4.21136 5.77405 5.77419C4.21126 7.33702 3.3333 9.45667 3.3333 11.6668C3.3333 13.877 4.21126 15.9967 5.77405 17.5595C7.33683 19.1223 9.45642 20.0003 11.6665 20.0003C13.8766 20.0003 15.9962 19.1223 17.559 17.5595C19.1218 15.9967 19.9998 13.877 19.9998 11.6668C19.9998 9.45667 19.1218 7.33702 17.559 5.77419C15.9962 4.21136 13.8766 3.33337 11.6665 3.33337ZM3.67632e-07 11.6668C3.51629e-06 9.81892 0.438954 7.99742 1.28071 6.35234C2.12246 4.70727 3.34293 3.28568 4.84162 2.20464C6.34031 1.12361 8.07435 0.41404 9.90095 0.134379C11.7275 -0.145283 13.5944 0.0129597 15.3479 0.596075C17.1014 1.17919 18.6913 2.1705 19.9866 3.48837C21.282 4.80624 22.2458 6.41297 22.7987 8.17625C23.3515 9.93953 23.4777 11.8089 23.1666 13.6305C22.8556 15.4521 22.1164 17.1737 21.0098 18.6536L29.5113 27.1538C29.8241 27.4663 29.9998 27.8903 30 28.3324C30.0002 28.7745 29.8247 29.1986 29.5122 29.5113C29.1997 29.8241 28.7757 29.9998 28.3336 30C27.8915 30.0002 27.4674 29.8247 27.1547 29.5122L18.6548 21.012C16.9207 22.3093 14.8597 23.0982 12.7026 23.2905C10.5456 23.4829 8.37754 23.071 6.44128 22.101C4.50501 21.131 2.87693 19.6413 1.73932 17.7984C0.601704 15.9556 -0.000543203 13.8325 3.67632e-07 11.6668V11.6668Z"
                    fill="var(--color__txt)"
                  />
                </svg>
              </SearchSubmitBtn>
            </SearchForm>
          </InputContainer>
        </Content>
      </Wrapper>
    </Container>
  );
};

export default SearchRoute;
