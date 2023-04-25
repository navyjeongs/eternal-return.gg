import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { characterState } from "../../recoil/atoms";
import { useEffect } from "react";

const Container = styled.div``;

const Title = styled.div`
  font-size: 2rem;
  margin: 1rem 0;
`;

const Character = styled.div`
  column-gap: 1rem;

  white-space: normal;
`;

const BtnContainer = styled.div`
  display: inline;
  margin-right: 1rem;
`;

const ChracterBtn = styled.button`
  border: 0.2rem solid var(--color__txt);
  padding: 0.5rem;

  cursor: pointer;
`;

const MatchHistorySelectCharacter = ({ isPlayCharacter, isClickSpecificCharacter, setIsClickSpecificCharacter }) => {
  const characterVal = useRecoilValue(characterState);

  const handleSelectCharacter = (e, num) => {
    // 같은 캐릭터를 누르면 전체 보기로 바꿈
    if (isClickSpecificCharacter.characterNum === num) {
      setIsClickSpecificCharacter({ ...isClickSpecificCharacter, isClick: false, characterNum: 0 });
    }
    // 다른 캐릭터를 누르면 해당 캐릭터
    else {
      setIsClickSpecificCharacter({ ...isClickSpecificCharacter, isClick: true, characterNum: num });
    }
  };

  return (
    <Container>
      <Title>플레이한 캐릭터</Title>
      <Character>
        {Array.from(isPlayCharacter).map((val, idx) => {
          return (
            <BtnContainer key={idx}>
              <ChracterBtn onClick={(e) => handleSelectCharacter(e, val)}>{characterVal[val]}</ChracterBtn>
            </BtnContainer>
          );
        })}
      </Character>
    </Container>
  );
};

export default MatchHistorySelectCharacter;
