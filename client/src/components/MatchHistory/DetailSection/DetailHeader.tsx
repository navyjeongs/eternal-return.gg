import styled from "styled-components";

interface Props {
  matchingTeamMode: number;
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 5rem 10rem 15rem 25rem 15rem 1fr;
  border-left: 0.2rem solid #e0e1dd;
  border-right: 0.2rem solid #e0e1dd;
  border-bottom: 0.2rem solid #e0e1dd;

  @media screen and (max-width: 1080px) {
    grid-template-columns: 5rem 2fr 3fr 2fr 2fr 6fr;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 3rem 2fr 3fr 2fr 2fr 4fr;
  }
`;

const List = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`;

const DetailHeader = ({ matchingTeamMode }: Props) => {
  return (
    <Container>
      <List>순위</List>
      <List>캐릭터</List>
      <List>이름</List>
      <List>딜량</List>
      {matchingTeamMode === 4 ? <List>K / D / A</List> : <List>K / A / H</List>}
      <List>장착 장비</List>
    </Container>
  );
};

export default DetailHeader;
