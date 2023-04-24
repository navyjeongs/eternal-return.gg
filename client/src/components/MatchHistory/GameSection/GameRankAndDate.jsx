import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media screen and (max-width: 1080px) {
    flex-direction: row;
    justify-content: flex-start;
    column-gap: 1rem;
  }
`;

const NormalRank = styled.div`
  font-size: 1.6rem;

  ${(prop) =>
    (prop.gameRank === 1 || prop.escapeState === 3) &&
    css`
      color: var(--color__1st);
    `};

  ${(prop) =>
    prop.gameRank === 2 &&
    prop.escapeState !== 3 &&
    css`
      color: var(--color__2nd);
    `};

  ${(prop) =>
    prop.gameRank >= 3 &&
    prop.escapeState !== 3 &&
    css`
      color: var(--color__3rd);
    `};
`;
const CobaltRank = styled.div`
  font-size: 1.8rem;
  color: var(${(prop) => (prop.gameRank === 1 ? "--color__1st" : "--color__cobalt__2nd")});
`;

const Mode = styled.div`
  font-size: 1.4rem;
`;
const Match = styled.span`
  font-size: 1.2rem;
`;

const Bar = styled.div`
  margin: 1rem 0;
  height: 0.1rem;
  width: 5rem;
  background-color: #e5e5e5;

  @media screen and (max-width: 1080px) {
    display: none;
  }
`;

const PlayTime = styled.div`
  font-size: 1.2rem;
`;
const PlayDate = styled.div`
  height: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
`;

const GameRankAndDate = (prop) => {
  const { escapeState, gameRank, matchingMode, matchingTeamMode, playingDate, playTime } = prop;

  const modeName = { 2: "일반", 3: "랭크", 6: "코발트" };
  const matchName = { 1: "솔로", 2: "듀오", 3: "스쿼드", 4: "" };

  const [rankState, setRankState] = useState("");

  const [playDate, setPlayDate] = useState("");

  useEffect(() => {
    if (escapeState === 3) {
      setRankState("탈출 성공");
    } else if (escapeState === 1 || escapeState === 2) {
      setRankState("탈출 실패");
    } else {
      setRankState("#" + gameRank);
    }
  }, []);

  return (
    <Container>
      {matchingMode === 6 ? (
        <CobaltRank gameRank={gameRank}>{rankState}</CobaltRank>
      ) : (
        <NormalRank gameRank={gameRank} escapeState={escapeState}>
          {rankState}
        </NormalRank>
      )}

      <Mode>
        {modeName[matchingMode]}
        {matchingMode !== 6 && <Match>({matchName[matchingTeamMode]})</Match>}
      </Mode>
      <Bar />
      <PlayTime>{playTime}</PlayTime>
      <PlayDate>{playingDate}</PlayDate>
    </Container>
  );
};

export default GameRankAndDate;
