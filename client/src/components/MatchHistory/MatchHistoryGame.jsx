import styled from "styled-components";

import GameRankColor from "./GameSection/GameRankColor";
import GameRankAndDate from "./GameSection/GameRankAndDate";
import GameCharacterAndWeapon from "./GameSection/GameCharacterAndWeapon";
import GameTrait from "./GameSection/GameTrait";
import GameKAH from "./GameSection/GameKAH";
import GameDamage from "./GameSection/GameDamage";
import GameEquipment from "./GameSection/GameEquipment";
import GameMMR from "./GameSection/GameMMR";
import GameRoute from "./GameSection/GameRoute";
import GameInfoDetail from "./DetailSection/GameInfoDetail";
import GameDetailBtn from "./GameSection/GameDetailBtn";

const Container = styled.div`
  margin: 2rem 0;
`;

const DetailContainer = styled.div``;

const Wrapper = styled.div`
  height: 12rem;
  min-height: 12rem;
  display: grid;
  grid-template-columns: 1rem 1fr 4rem;
  margin: 1rem 0 0 0;

  border: 0.1rem solid #e0e1dd;

  @media screen and (max-width: 1080px) {
    height: 18rem;
  }
`;

const GameStatsContainer = styled.div`
  display: grid;
  grid-template-columns: 10rem 1fr 20rem;
  @media screen and (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const StatSection1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1080px) {
    margin-left: 2rem;
  }
  @media screen and (max-width: 480px) {
    margin-left: 1rem;
  }
`;
const StatSection2 = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: 1fr 1.2fr 1.2fr 1.2fr 1.2fr 1.2fr;
  @media screen and (max-width: 1080px) {
    grid-template-columns: 1fr 1.2fr 1.2fr 1.2fr 1.2fr 1.2fr;
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr 1fr 1.4fr 1fr 1fr 1fr;
  }
`;
const StatSection3 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1080px) {
    margin-left: 2rem;
    justify-content: flex-start;
  }
  @media screen and (max-width: 480px) {
    margin-left: 1rem;
  }
`;
const MatchHistoryGame = ({ matchHistory, isOpenDetail, setIsOpenDetail, isClickSpecificCharacter }) => {
  // 특정 캐릭터를 눌렀을 때와 안눌렀을 때 구분

  return (
    <Container>
      {isClickSpecificCharacter.isClick ? (
        matchHistory
          .filter((data) => data.characterNum === isClickSpecificCharacter.characterNum)
          .map((data) => {
            return (
              <DetailContainer key={data.gameId}>
                <Wrapper>
                  <GameRankColor
                    gameRank={data.gameRank}
                    escapeState={data.escapeState}
                    matchingMode={data.matchingMode}
                  />
                  <GameStatsContainer>
                    <StatSection1>
                      <GameRankAndDate
                        gameRank={data.gameRank}
                        matchingMode={data.matchingMode}
                        matchingTeamMode={data.matchingTeamMode}
                        playingDate={data.playingDate}
                        escapeState={data.escapeState}
                        playTime={data.playTime}
                      />
                    </StatSection1>
                    <StatSection2>
                      <GameCharacterAndWeapon
                        bestWeapon={data.bestWeapon}
                        characterLevel={data.characterLevel}
                        characterNum={data.characterNum}
                      />
                      <GameTrait
                        traitFirstCore={data.traitFirstCore}
                        traitFirstSub={data.traitFirstSub}
                        traitSecondSub={data.traitSecondSub}
                        matchingMode={data.matchingMode}
                      />
                      <GameKAH
                        matchingMode={data.matchingMode}
                        playerKill={data.playerKill}
                        playerAssistant={data.playerAssistant}
                        playerDeaths={data.playerDeaths}
                        monsterKill={data.monsterKill}
                      />
                      <GameDamage damageToPlayer={data.damageToPlayer} />
                      <GameMMR mmrAfter={data.mmrAfter} mmrGain={data.mmrGain} />
                      <GameRoute routeIdOfStart={data.routeIdOfStart} />
                    </StatSection2>
                    <StatSection3>
                      <GameEquipment equipment={data.equipment} />
                    </StatSection3>
                  </GameStatsContainer>
                  <GameDetailBtn
                    isOpenDetail={isOpenDetail[data.gameId]}
                    setIsOpenDetail={setIsOpenDetail}
                    gameId={data.gameId}
                  />
                </Wrapper>
                {isOpenDetail[data.gameId].isOpen && (
                  <GameInfoDetail
                    record={isOpenDetail[data.gameId].record}
                    maxDamage={isOpenDetail[data.gameId].maxDamage}
                    matchingMode={data.matchingMode}
                    matchingTeamMode={data.matchingTeamMode}
                  />
                )}
              </DetailContainer>
            );
          })
      ) : (
        <>
          {matchHistory.map((data) => {
            return (
              <DetailContainer key={data.gameId}>
                <Wrapper>
                  <GameRankColor
                    gameRank={data.gameRank}
                    escapeState={data.escapeState}
                    matchingMode={data.matchingMode}
                  />
                  <GameStatsContainer>
                    <StatSection1>
                      <GameRankAndDate
                        gameRank={data.gameRank}
                        matchingMode={data.matchingMode}
                        matchingTeamMode={data.matchingTeamMode}
                        playingDate={data.playingDate}
                        escapeState={data.escapeState}
                        playTime={data.playTime}
                      />
                    </StatSection1>
                    <StatSection2>
                      <GameCharacterAndWeapon
                        bestWeapon={data.bestWeapon}
                        characterLevel={data.characterLevel}
                        characterNum={data.characterNum}
                      />
                      <GameTrait
                        traitFirstCore={data.traitFirstCore}
                        traitFirstSub={data.traitFirstSub}
                        traitSecondSub={data.traitSecondSub}
                        matchingMode={data.matchingMode}
                      />
                      <GameKAH
                        matchingMode={data.matchingMode}
                        playerKill={data.playerKill}
                        playerAssistant={data.playerAssistant}
                        playerDeaths={data.playerDeaths}
                        monsterKill={data.monsterKill}
                      />
                      <GameDamage damageToPlayer={data.damageToPlayer} />
                      <GameMMR mmrAfter={data.mmrAfter} mmrGain={data.mmrGain} />
                      <GameRoute routeIdOfStart={data.routeIdOfStart} />
                    </StatSection2>
                    <StatSection3>
                      <GameEquipment equipment={data.equipment} />
                    </StatSection3>
                  </GameStatsContainer>
                  <GameDetailBtn
                    isOpenDetail={isOpenDetail[data.gameId]}
                    setIsOpenDetail={setIsOpenDetail}
                    gameId={data.gameId}
                  />
                </Wrapper>
                {isOpenDetail[data.gameId].isOpen && (
                  <GameInfoDetail
                    record={isOpenDetail[data.gameId].record}
                    maxDamage={isOpenDetail[data.gameId].maxDamage}
                    matchingMode={data.matchingMode}
                    matchingTeamMode={data.matchingTeamMode}
                  />
                )}
              </DetailContainer>
            );
          })}
        </>
      )}
    </Container>
  );
};

export default MatchHistoryGame;
