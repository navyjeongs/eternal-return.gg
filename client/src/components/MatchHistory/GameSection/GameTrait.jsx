import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const FirstTrait = styled.div``;
const SecondTrait = styled.div``;

const MainTrait = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  @media screen and (max-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const SubTrait = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  @media screen and (max-width: 768px) {
    width: 2rem;
    height: 2rem;
  }
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const GameTrait = ({ traitFirstCore, traitFirstSub, traitSecondSub, matchingMode }) => {
  return (
    <Container>
      <FirstTrait>
        <MainTrait src={`/img/trait/${traitFirstCore}.png`} />
        {matchingMode !== 6 && (
          <>
            <SubTrait src={`/img/trait/${traitFirstSub[0]}.png`} />
            <SubTrait src={`/img/trait/${traitFirstSub[1]}.png`} />
          </>
        )}
      </FirstTrait>
      {matchingMode !== 6 && (
        <SecondTrait>
          <SubTrait src={`/img/trait/${traitSecondSub[0]}.png`} />
          <SubTrait src={`/img/trait/${traitSecondSub[1]}.png`} />
        </SecondTrait>
      )}
    </Container>
  );
};

export default GameTrait;
