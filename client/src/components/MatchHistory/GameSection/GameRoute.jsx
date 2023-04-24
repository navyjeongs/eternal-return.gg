import styled from "styled-components";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div``;

const RouteId = styled.div`
  font-size: 1.8rem;
  text-align: center;
  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
`;
const Explain = styled(RouteId)`
  font-size: 1.4rem;
  color: #778da9;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

const GameRoute = ({ routeIdOfStart }) => {
  return (
    <Container>
      <Wrapper>
        <RouteId>{routeIdOfStart === 0 ? "-" : routeIdOfStart}</RouteId>
        <Explain>루트 ID</Explain>
      </Wrapper>
    </Container>
  );
};

export default GameRoute;
