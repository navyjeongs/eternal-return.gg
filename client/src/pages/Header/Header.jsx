import { useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import mobileUrl from "../../assets/header/mobile.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const dropDown = (hei) => keyframes`
  from {
    height: hei;
  }
  to {
    height: 20rem;
  }
`;

const dropUp = (hei) => keyframes`
  from {
    height: hei;
  }
  to {
    height: 5rem;
  }
`;

const Headers = styled.header`
  box-sizing: content-box;
  width: 100%;
  border-bottom: 0.2rem solid gray;
  font-size: 2rem;
  position: fixed;

  height: 5rem;
  overflow-y: hidden;
  z-index: 999;

  @media screen and (max-width: 768px) {
    ${(props) =>
      props.clickHamburger
        ? css`
            animation: ${(height) => dropDown(height)} 0.3s ease-in-out forwards;
          `
        : css`
            animation: ${(height) => dropUp(height)} 0.3s ease-in-out forwards;
          `}
  }
`;

const HeaderContainer = styled.div`
  max-width: 108rem;
  margin: auto;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 2rem;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    position: relative;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 5rem;
`;
const LogoIcon = styled.div`
  height: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: var(--color__hover);
  }
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Menu = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  column-gap: 3rem;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;
const Item = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  height: 5rem;
  list-style: none;
  cursor: pointer;
  &:hover {
    background-color: var(--color__hover);
  }
`;

const SearchInput = styled.input.attrs({
  placeholder: "유저 닉네임",
})`
  border: 0.2rem solid var(--color__txt);
  padding: 0;
  height: 3rem;
`;

const MobileContainer = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    position: absolute;
    top: 1.25rem;
    right: 0rem;
    flex-direction: column;
  }
`;

const MobileHamburger = styled.div`
  height: 2.5rem;
`;

const MobileBtn = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background-image: url(${mobileUrl});
  cursor: pointer;
`;

const SearchForm = styled.form``;

const SearchLink = styled.button`
  position: absolute;
  background-color: transparent;
  border: 0;
  padding: 0;
  width: 2.4rem;
  height: 2.4rem;
  right: 0.4rem;
  top: 1.3rem;

  cursor: pointer;
  @media screen and (max-width: 768px) {
    left: 13.5rem;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  // 모바일 토글 버튼 클릭여부
  const [clickHamburger, setClickHamburger] = useState(false);

  // 검색 닉네임
  const [searchName, setSearchName] = useState("");

  // 토큰 버튼 변경
  const changeToggleBtn = () => {
    setClickHamburger((prev) => !prev);
  };

  // 검색 닉네임 변경
  const changeSearchName = (e) => {
    setSearchName(e.target.value);
  };

  // 사용자 검색
  const handleSearchName = (e) => {
    e.preventDefault();
    navigate(`/user/${searchName}`);
    setSearchName("");
  };

  return (
    <Headers clickHamburger={clickHamburger}>
      <HeaderContainer>
        <InnerContainer>
          <LogoContainer>
            <LogoIcon onClick={() => navigate("/")}>현우.GG</LogoIcon>
          </LogoContainer>
          <MobileContainer>
            <MobileHamburger>
              <MobileBtn onClick={changeToggleBtn} />
            </MobileHamburger>
          </MobileContainer>
          <MenuContainer>
            <Menu>
              <Item onClick={() => navigate("/food/route")}> 음식 루트 생성기</Item>
              <Item onClick={() => alert("서비스 준비중입니다.")}>루트 검색</Item>
              <Item>
                <SearchForm onSubmit={handleSearchName}>
                  <SearchInput value={searchName} onChange={changeSearchName} />
                  <SearchLink onClick={handleSearchName}>
                    <svg width="24" height="24" viewBox="0 0 26 26" fill="none" backgroundcolor="transparent">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.111 2.88892C8.19557 2.88892 6.35859 3.64985 5.00417 5.0043C3.64976 6.35875 2.88886 8.19578 2.88886 10.1113C2.88886 12.0268 3.64976 13.8638 5.00417 15.2182C6.35859 16.5727 8.19557 17.3336 10.111 17.3336C12.0264 17.3336 13.8634 16.5727 15.2178 15.2182C16.5722 13.8638 17.3331 12.0268 17.3331 10.1113C17.3331 8.19578 16.5722 6.35875 15.2178 5.0043C13.8634 3.64985 12.0264 2.88892 10.111 2.88892ZM3.18615e-07 10.1113C3.04745e-06 8.50973 0.380427 6.93109 1.10994 5.50536C1.83946 4.07963 2.89721 2.84759 4.19607 1.91069C5.49494 0.973792 6.99777 0.358835 8.58082 0.116462C10.1639 -0.125912 11.7819 0.0112318 13.3015 0.516598C14.8212 1.02196 16.1991 1.8811 17.3217 3.02325C18.4444 4.1654 19.2797 5.5579 19.7588 7.08608C20.238 8.61426 20.3473 10.2344 20.0778 11.8131C19.8082 13.3918 19.1675 14.8839 18.2085 16.1665L25.5765 23.5333C25.8475 23.8041 25.9999 24.1716 26 24.5547C26.0001 24.9379 25.8481 25.3054 25.5772 25.5765C25.3064 25.8475 24.939 25.9999 24.5558 26C24.1726 26.0001 23.8051 25.8481 23.5341 25.5772L16.1675 18.2104C14.6646 19.3347 12.8784 20.0184 11.009 20.1851C9.13949 20.3518 7.26054 19.9949 5.58244 19.1542C3.90434 18.3136 2.49334 17.0224 1.50741 15.4253C0.521477 13.8282 -0.000470776 11.9882 3.18615e-07 10.1113V10.1113Z"
                        fill="var(--color__txt)"
                      />
                    </svg>
                  </SearchLink>
                </SearchForm>
              </Item>
            </Menu>
          </MenuContainer>
        </InnerContainer>
      </HeaderContainer>
    </Headers>
  );
};

export default Header;
