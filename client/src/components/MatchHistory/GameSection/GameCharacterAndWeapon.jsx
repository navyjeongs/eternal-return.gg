import { selector, useRecoilValue } from "recoil";
import styled from "styled-components";
import { characterState, weaponState } from "../../../recoil/atoms";

const Container = styled.div`
  width: 100%;
  height: 9.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CharacterWrapper = styled.div`
  position: relative;
`;

const CharacterImg = styled.img.attrs((prop) => {})`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;

  @media screen and (max-width: 768px) {
    height: 5rem;
    width: 5rem;
  }
`;

const WeaponImg = styled.img`
  width: 2rem;
  height: 2rem;
  position: absolute;
  right: 0;
  bottom: 2rem;
  background-color: var(--color__weapon__bg);
  border-radius: 50%;

  @media screen and (max-width: 768px) {
    height: 1.5rem;
    width: 1.5rem;
  }
`;

const CharacterLevel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 2rem;
  height: 2rem;
  left: 0;
  bottom: 2rem;

  border-radius: 50%;
  font-size: 1.3rem;

  @media screen and (max-width: 768px) {
    height: 1.5rem;
    width: 1.5rem;
    font-size: 1.1rem;
  }
`;

const CharacterName = styled.div`
  font-size: 1.4rem;
  text-align: center;
`;

const GameCharacterAndWeapon = ({ bestWeapon, characterLevel, characterNum }) => {
  const characterValue = useRecoilValue(characterState);
  const weaponValue = useRecoilValue(weaponState);

  return (
    <Container>
      <CharacterWrapper>
        <CharacterImg src={`/img/profile/${characterNum}.png`} />
        <WeaponImg src={`/img/weapon/${bestWeapon}.png`} />
        <CharacterLevel>{characterLevel}</CharacterLevel>
        <CharacterName>{characterValue[characterNum]}</CharacterName>
      </CharacterWrapper>
    </Container>
  );
};

export default GameCharacterAndWeapon;
