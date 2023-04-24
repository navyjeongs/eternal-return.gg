import styled from "styled-components";
import NoticeSlick from "../../components/Main/NoticeSlick";

const Container = styled.div`
  width: 100%;
  margin: auto;
`;

const MainPage = () => {
  return (
    <Container>
      <NoticeSlick />
    </Container>
  );
};

export default MainPage;
