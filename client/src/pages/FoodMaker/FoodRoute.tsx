import styled from "styled-components";
import FoodRouteMain from "../../components/Food/FoodRouteMain";

const Container = styled.div`
  width: 100%;
  margin: auto;
`;
const FoodRoute = () => {
  return (
    <Container>
      <FoodRouteMain />
    </Container>
  );
};

export default FoodRoute;
