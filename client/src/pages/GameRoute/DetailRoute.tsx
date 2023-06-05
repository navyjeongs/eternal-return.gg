import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Loading } from "@src/components/FetchState";
import { useFetchRouteDetail } from "@src/hooks/useFetchRouteDetail";

import NotFoundRoute from "@src/components/GameRoute/NotFoundRoute";
import RouteHeader from "@src/components/GameRoute/RouteHeader";

const Container = styled.div`
  width: 100%;
  max-width: 108rem;
  margin: 2rem auto;
`;

const Wrapper = styled.div`
  @media screen and (max-width: 1080px) {
    width: 90%;
  }
`;

const DetailRoute = () => {
  const { id } = useParams();

  const { isError, isLoading, data, error } = useFetchRouteDetail(id as string);

  if (isError) {
    return <NotFoundRoute id={id as string} />;
  }

  if (isLoading) {
    return <Loading>로딩중...</Loading>;
  }

  return (
    <Container>
      <Wrapper></Wrapper>
    </Container>
  );
};

export default DetailRoute;
