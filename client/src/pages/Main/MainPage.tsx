import styled from "styled-components";
import NoticeSlick from "../../components/Main/NoticeSlick";
import FreeCharacters from "../../components/Main/FreeCharacters";

const Container = styled.div`
  width: 100%;
  margin: auto;
`;

const MainPage = () => {
  return (
    <Container>
      <NoticeSlick />
      <FreeCharacters />
    </Container>
  );
};

export default MainPage;
