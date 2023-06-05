import styled from "styled-components";

import { Error } from "../FetchState";

interface Props {
  id: string;
}

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 2rem;
`;

const NotFoundImg = styled.img.attrs(() => ({
  src: "/img/notfound/1.png",
  alt: "NotFound",
}))`
  width: 15rem;
  height: 15rem;
  display: inline;
`;
const NotFoundRoute = ({ id }: Props) => {
  return (
    <Error>
      <ErrorContainer>
        <NotFoundImg />
        <div>{id}에 해당하는 루트가 존재하지않거나 비공개입니다.</div>
      </ErrorContainer>
    </Error>
  );
};

export default NotFoundRoute;
