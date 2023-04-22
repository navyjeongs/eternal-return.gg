import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import { NavigateFunction, useNavigate } from "react-router-dom";

type bgColor = "#000c30" | "#000a20" | "#000b25" | "#000d35";

interface ItemContainerProps {
  bgColor: bgColor;
}

export type url = "notice" | "patchnote" | "event" | "character";

interface ImgProps {
  url: url;
  bgColor: bgColor;
}

interface MovePage {
  page: "notice" | "patchnote" | "event" | "character";
}

const Container = styled.div`
  // 나중에 다크모드 처리
  .slick-dots li button::before {
    /* color: white; */
  }
  width: 100%;

  > div {
    overflow: hidden;
  }
`;

const ItemContainer = styled.div<ItemContainerProps>`
  width: 100%;
  background-color: ${(prop) => prop.bgColor};
`;
const Item = styled.div`
  max-width: 108rem;
  width: 100%;
  margin: 0 auto;
  display: flex;

  cursor: pointer;
  background-color: inherit;
  color: #ffffff;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Text = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: inherit;
  font-size: 3rem;
  font-weight: 900;
  color: #ffffff;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-top: 2rem;
  }
`;

const ImgContainer = styled.div`
  width: 50%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const Img = styled.img.attrs<ImgProps>(({ url }) => ({
  src: "/src/assets/notice/" + url + ".png",
}))<ImgProps>`
  background-color: ${(prop) => prop.bgColor};
  display: block;
  border: 0;
  width: 100%;
  height: 30rem;
`;

const NoticeSlick = () => {
  const navigate: NavigateFunction = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2400,
  };

  const movePage = (e: React.MouseEvent, type: url): void => {
    navigate("/notice", { state: type });
  };

  return (
    <Container>
      <Slider {...settings}>
        <ItemContainer bgColor="#000c30">
          <Item onClick={(e) => movePage(e, "notice")}>
            <Text>공지사항 바로가기</Text>
            <ImgContainer>
              <Img url="notice" bgColor="#000c30" />
            </ImgContainer>
          </Item>
        </ItemContainer>
        <ItemContainer bgColor="#000a20">
          <Item onClick={(e) => movePage(e, "patchnote")}>
            <Text>패치노트 바로가기</Text>
            <ImgContainer>
              <Img url="patchnote" bgColor="#000a20" />
            </ImgContainer>
          </Item>
        </ItemContainer>
        <ItemContainer bgColor="#000b25">
          <Item onClick={(e) => movePage(e, "event")}>
            <Text>이벤트 바로가기</Text>
            <ImgContainer>
              <Img url="event" bgColor="#000a20" />
            </ImgContainer>
          </Item>
        </ItemContainer>
        <ItemContainer bgColor="#000d35">
          <Item onClick={(e) => movePage(e, "character")}>
            <Text>캐릭터 소식 바로가기</Text>
            <ImgContainer>
              <Img url="character" bgColor="#000d35" />
            </ImgContainer>
          </Item>
        </ItemContainer>
      </Slider>
    </Container>
  );
};

export default NoticeSlick;
