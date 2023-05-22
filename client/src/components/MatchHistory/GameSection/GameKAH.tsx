import styled from "styled-components";

interface Props {
  matchingMode: number;
  playerKill: number;
  playerAssistant: number;
  playerDeaths: number;
  monsterKill: number;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div``;

const Result = styled.div`
  font-size: 1.8rem;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
`;
const Explain = styled(Result)`
  font-size: 1.4rem;
  color: #778da9;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

const GameKAH = ({ matchingMode, playerKill, playerAssistant, playerDeaths, monsterKill }: Props) => {
  return (
    <Container>
      <Wrapper>
        {matchingMode === 6 ? (
          <>
            <Result>
              {playerKill} / {playerDeaths} / {playerAssistant}
            </Result>
            <Explain>K / D / A</Explain>
          </>
        ) : (
          <>
            <Result>
              {playerKill} / {playerAssistant} / {monsterKill}
            </Result>
            <Explain>K / A / H</Explain>
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default GameKAH;
