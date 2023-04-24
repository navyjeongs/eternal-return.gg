import styled, { css } from "styled-components";

const RankColor = styled.div`
  width: 1rem;

  ${(prop) =>
    (prop.gameRank === 1 || prop.escapeState === 3) &&
    css`
      background-color: var(--color__1st);
    `};

  ${(prop) =>
    prop.gameRank === 2 &&
    prop.escapeState !== 3 &&
    css`
      background-color: var(--color__2nd);
    `};

  ${(prop) =>
    prop.gameRank >= 3 &&
    prop.escapeState !== 3 &&
    css`
      background-color: var(--color__3rd);
    `};
`;

const CobaltRankColor = styled.div`
  width: 1rem;
  background-color: ${(prop) => (prop.gameRank === 1 ? "#4a9f4d" : "#e63946")};
`;

const GameRankColor = ({ gameRank, escapeState, matchingMode }) => {
  if (matchingMode === 6) {
    return <CobaltRankColor gameRank={gameRank} />;
  } else {
    return <RankColor gameRank={gameRank} escapeState={escapeState} />;
  }
};

export default GameRankColor;
