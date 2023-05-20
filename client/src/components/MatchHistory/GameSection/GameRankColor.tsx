import styled, { css } from "styled-components";

interface Props {
  gameRank: number;
  escapeState: number;
  matchingMode: number;
}

interface RankProp extends Pick<Props, "gameRank" | "escapeState"> {}
interface CobaltProp extends Pick<Props, "gameRank"> {}

const RankColor = styled.div<RankProp>`
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

const CobaltRankColor = styled.div<CobaltProp>`
  width: 1rem;
  background-color: ${(prop) => (prop.gameRank === 1 ? "#4a9f4d" : "#e63946")};
`;

const GameRankColor = ({ gameRank, escapeState, matchingMode }: Props) => {
  if (matchingMode === 6) {
    return <CobaltRankColor gameRank={gameRank} />;
  } else {
    return <RankColor gameRank={gameRank} escapeState={escapeState} />;
  }
};

export default GameRankColor;
