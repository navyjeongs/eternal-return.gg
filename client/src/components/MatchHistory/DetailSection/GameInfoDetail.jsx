import styled, { keyframes } from "styled-components";
import DetailHeader from "./DetailHeader";
import DetailUserInfo from "./DetailUserInfo";

const Container = styled.div`
  height: auto;
`;

const Wrapper = styled.div`
  display: flex;
  border-left: 0.2rem solid #e0e1dd;
  border-right: 0.2rem solid #e0e1dd;
  border-bottom: 0.2rem solid #e0e1dd;
`;

const RankContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  font-size: 1.6rem;

  @media screen and (max-width: 768px) {
    width: 3rem;
    font-size: 1.2rem;
  }
`;

const GameInfoDetail = ({ record, matchingMode, matchingTeamMode, maxDamage }) => {
  return (
    <Container>
      <DetailHeader matchingTeamMode={matchingTeamMode} />
      {record.map((data, idx) => {
        console.log(data);
        if (data.length) {
          return (
            <Wrapper key={idx}>
              <RankContainer>#{data[0].gameRank}</RankContainer>
              <DetailUserInfo data={data} maxDamage={maxDamage} matchingTeamMode={matchingTeamMode} />
            </Wrapper>
          );
        }
      })}
    </Container>
  );
};

export default GameInfoDetail;
