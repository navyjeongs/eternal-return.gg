import styled from "styled-components";

interface Props {
  damageToPlayer: number;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div``;

const Damage = styled.div`
  font-size: 1.8rem;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
`;
const Explain = styled(Damage)`
  font-size: 1.4rem;
  color: #778da9;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

const GameDamage = ({ damageToPlayer }: Props) => {
  return (
    <Container>
      <Wrapper>
        <Damage>{damageToPlayer}</Damage>
        <Explain>딜량</Explain>
      </Wrapper>
    </Container>
  );
};

export default GameDamage;
