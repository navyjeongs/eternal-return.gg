import styled, { keyframes } from "styled-components";
import { UserStats } from "../../pages/MatchHistory/MatchHistory";

interface StatProps {
  stat: Array<UserStats>;
}

interface ModeColor {
  [key: number]: { name: string; color: string; minRank: number };
}

interface GraphStyle {
  w: string;
  bgColor: string;
}

const GraphAnimation = (width: string) => keyframes`
  0% {
    width: 0%;
    color: var(--color__txt);
  }

  100% {
    width: ${width};
    color: var(--color__txt)
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 5rem;
  margin: 2rem 0;
  row-gap: 2rem;

  @media screen and (max-width: 1080px) {
    grid-template-columns: repeat(1, 1fr);
    column-gap: 0;
  }
`;

const StatContainer = styled.div`
  border: 0.2rem solid #e0e1dd;
`;

const MatchingModeTitle = styled.h2<{ bgColor: string }>`
  padding: 1rem 0;
  margin: 0;
  font-size: 1.8rem;
  text-align: center;
  background-color: var(${(prop) => prop.bgColor});
  color: #fcfafa;
`;

const DetailStatContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const StatList = styled.div`
  text-align: left;
  width: 75%;
  margin: 0.5rem auto;
`;

const StatTitle = styled.div`
  font-size: 1.4rem;
`;

const StandardGraph = styled.div`
  background-color: #e0e1dd;
  height: 1.5rem;
  margin: 0 auto;
`;

const InnerGraph = styled.div<GraphStyle>`
  height: 1.5rem;
  width: ${(prop) => prop.w};
  background-color: var(${(props) => props.bgColor});
  color: var(--color__txt);
  animation: 0.5s ease-in-out ${(prop) => GraphAnimation(prop.w)};
`;

const StatContent = styled.div`
  font-size: 1.2rem;
`;

const NotExistGame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 4.6rem);
  font-size: 2rem;
`;

const MatchHistoryStat = ({ stat }: StatProps) => {
  const mode: ModeColor = {
    1: { name: "솔로", color: "--color__solo", minRank: 15 },
    2: { name: "듀오", color: "--color__duo", minRank: 7 },
    3: { name: "스쿼드", color: "--color__squad", minRank: 6 },
    4: { name: "코발트", color: "--color__cobalt", minRank: 2 },
  };

  return (
    <Container>
      {stat.map((data, idx) => {
        let minRank = mode[data.matchingTeamMode].minRank;
        const bgColor = mode[data?.matchingTeamMode]?.color || mode[idx + 1].color;

        if (data.averageRank === undefined) {
          return (
            <StatContainer key={idx + 100}>
              <MatchingModeTitle bgColor={bgColor}>{mode[idx + 1].name}</MatchingModeTitle>
              <NotExistGame>플레이 내역이 존재하지 않습니다...</NotExistGame>
            </StatContainer>
          );
        }

        return (
          <StatContainer key={data.matchingTeamMode}>
            <MatchingModeTitle bgColor={bgColor}>{mode[data.matchingTeamMode].name}</MatchingModeTitle>
            <DetailStatContainer>
              <StatList>
                <StatTitle>플레이 게임</StatTitle>
                <StandardGraph>
                  <InnerGraph w="100%" bgColor={bgColor}></InnerGraph>
                </StandardGraph>
                <StatContent>{data.totalGames}</StatContent>
              </StatList>
              <StatList>
                <StatTitle>승리 게임</StatTitle>
                <StandardGraph>
                  <InnerGraph w="100%" bgColor={bgColor}></InnerGraph>
                </StandardGraph>
                <StatContent>{data.totalWins}</StatContent>
              </StatList>
              <StatList>
                <StatTitle>평균 순위</StatTitle>
                <StandardGraph>
                  <InnerGraph w={(data.averageRank / minRank) * 100 + "%"} bgColor={bgColor}></InnerGraph>
                </StandardGraph>
                <StatContent>{data.averageRank}</StatContent>
              </StatList>
              <StatList>
                <StatTitle>Top 1</StatTitle>
                <StandardGraph>
                  <InnerGraph w={data.top1 * 100 + "%"} bgColor={bgColor}></InnerGraph>
                </StandardGraph>
                <StatContent>{data.top1}</StatContent>
              </StatList>
              <StatList>
                <StatTitle>Top 2</StatTitle>
                <StandardGraph>
                  <InnerGraph w={data.top2 * 100 + "%"} bgColor={bgColor}></InnerGraph>
                </StandardGraph>
                <StatContent>{data.top2}</StatContent>
              </StatList>
              <StatList>
                <StatTitle>Top 3</StatTitle>
                <StandardGraph>
                  <InnerGraph w={data.top3 * 100 + "%"} bgColor={bgColor}></InnerGraph>
                </StandardGraph>
                <StatContent>{data.top3}</StatContent>
              </StatList>
              <StatList>
                <StatTitle>평균 킬</StatTitle>
                <StandardGraph>
                  <InnerGraph w="100%" bgColor={bgColor}></InnerGraph>
                </StandardGraph>
                <StatContent>{data.averageKills}</StatContent>
              </StatList>
              <StatList>
                <StatTitle>평균 어시</StatTitle>
                <StandardGraph>
                  <InnerGraph w="100%" bgColor={bgColor}></InnerGraph>
                </StandardGraph>
                <StatContent>{data.averageAssistants}</StatContent>
              </StatList>
              <StatList>
                <StatTitle>평균 동물 킬</StatTitle>
                <StandardGraph>
                  <InnerGraph w="100%" bgColor={bgColor}></InnerGraph>
                </StandardGraph>
                <StatContent>{data.averageHunts}</StatContent>
              </StatList>
            </DetailStatContainer>
          </StatContainer>
        );
      })}
    </Container>
  );
};

export default MatchHistoryStat;
