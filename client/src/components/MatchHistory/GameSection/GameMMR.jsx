import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div``;

const MMR = styled.div`
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const GainMMR = styled.div`
  font-size: 1.4rem;
  color: ${(prop) => (prop.mmrGain >= 0 ? "#5fa8d3" : "#ef476f")};
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Explain = styled(GainMMR)`
  font-size: 1.4rem;
  color: #778da9;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

const GameMMR = ({ mmrAfter, mmrGain }) => {
  return (
    <Container>
      <Wrapper>
        {mmrAfter !== undefined ? (
          <MMR>
            {mmrAfter}
            <GainMMR mmrGain={mmrGain}>{mmrGain >= 0 ? <>(+{mmrGain})</> : <>({mmrGain})</>}</GainMMR>
          </MMR>
        ) : (
          <MMR>-</MMR>
        )}
        <Explain>MMR</Explain>
      </Wrapper>
    </Container>
  );
};

export default GameMMR;
