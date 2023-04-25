import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const GraphAnimation = (width) => keyframes`
  0% {
    width: 0%;
    color: var(--color__txt);
  }

  100% {
    width: ${width} + "%";
    color: var(--color__txt)
  }
`;

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 10rem 15rem 25rem 15rem 1fr;
  height: 6rem;

  @media screen and (max-width: 1080px) {
    grid-template-columns: 2fr 3fr 2fr 2fr 6fr;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 2fr 3fr 2fr 2fr 4fr;
  }
`;

const Character = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const CharacterImg = styled.img`
  height: 5rem;
  width: 5rem;
  border-radius: 50%;

  @media screen and (max-width: 768px) {
    height: 3rem;
    width: 3rem;
  }

  @media screen and (max-width: 480px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;
const WeaponImg = styled.img`
  height: 2rem;
  width: 2rem;
  position: absolute;
  bottom: 0;
  right: 1.5rem;

  @media screen and (max-width: 1080px) {
    right: 30%;
  }

  @media screen and (max-width: 768px) {
    height: 1.2rem;
    width: 1.2rem;
    bottom: 20%;
  }

  border-radius: 50%;
`;

const Nickname = styled(Character)`
  font-size: 1.6rem;

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }

  cursor: pointer;
  &:hover {
    background-color: var(--color__hover);
  }
`;

const Graph = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const StandardGraph = styled.div`
  width: 100%;
  background-color: #e0e1dd;
  height: 1.5rem;
`;

const InnerGraph = styled.div`
  height: 1.5rem;
  width: ${(prop) => prop.w};
  background-color: #003049;
  color: var(--color__txt);
  animation: 0.75s ease-in-out ${(prop) => GraphAnimation(prop.w)} forwards;
`;

const DamageTxt = styled.div`
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
    width: inherit;
  }
  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`;

const KDH = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Equip = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const EquipContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EquipImg = styled.img`
  width: 5rem;
  height: 2.8125rem;
  background-color: #ede9e9;

  @media screen and (max-width: 768px) {
    width: 3rem;
    height: 1.6875rem;
  }
`;

const DetailUserInfo = ({ data, maxDamage, matchingTeamMode }) => {
  const navigate = useNavigate();

  const handleMoveSearchUser = (e, name) => {
    navigate(`/user/${name}`);
  };

  return (
    <Container>
      {data.map((val, idx) => {
        let innerGraph = ((val.damageToPlayer / maxDamage) * 100).toFixed(1);

        return (
          <Wrapper key={idx}>
            <Character>
              <CharacterImg src={`/img/profile/${val.characterNum}.png`} />
              <WeaponImg src={`/img/weapon/${val.bestWeapon}.png`} />
            </Character>
            <Nickname onClick={(e) => handleMoveSearchUser(e, val.nickname)}>{val.nickname}</Nickname>
            <Graph>
              <StandardGraph>
                <InnerGraph w={innerGraph + "%"} className={innerGraph} />
              </StandardGraph>
              <DamageTxt>{val.damageToPlayer}</DamageTxt>
            </Graph>
            <KDH>
              {matchingTeamMode === 4 ? (
                <>
                  {val.playerKill} / {val.playerDeaths} / {val.playerAssistant}
                </>
              ) : (
                <>
                  {val.playerKill} / {val.playerAssistant} / {val.monsterKill}
                </>
              )}
            </KDH>
            <Equip>
              <EquipContainer>
                <EquipImg src={`/img/item/${val.equipment[0]}.png`} />
              </EquipContainer>
              <EquipContainer>
                <EquipImg src={`/img/item/${val.equipment[1]}.png`} />
              </EquipContainer>
              <EquipContainer>
                <EquipImg src={`/img/item/${val.equipment[2]}.png`} />
              </EquipContainer>
              <EquipContainer>
                <EquipImg src={`/img/item/${val.equipment[3]}.png`} />
              </EquipContainer>
              <EquipContainer>
                <EquipImg src={`/img/item/${val.equipment[4]}.png`} />
              </EquipContainer>
              <EquipContainer>
                <EquipImg src={`/img/item/${val.equipment[5]}.png`} />
              </EquipContainer>
            </Equip>
          </Wrapper>
        );
      })}
    </Container>
  );
};

export default DetailUserInfo;
