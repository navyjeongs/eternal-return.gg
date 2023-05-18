import styled from "styled-components";
import NoticeList from "../../components/Main/NoticeList";
import { Helmet } from "react-helmet-async";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const Notices = () => {
  return (
    <>
      <Helmet>
        <title>이터널 리턴 공지사항</title>
        <meta
          name="description"
          content="이터널리턴 공지사항, 패치노트, 이벤트, 캐릭터 소식, 핫픽스, 이리, 캐릭터, 도감, 특성, 아이템, 재료, 특성"
        />
      </Helmet>
      <Container>
        <NoticeList />
      </Container>
    </>
  );
};

export default Notices;
