import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// 유저 개인 기록 가져오기
export const getGames = async (req, res) => {
  const { user, game } = req.query;
  let gameInfo = await getUserGameRecordFromApi(user, game);

  // 최근 90일 내에 플레이한 게임이 있을 때
  if (gameInfo.code === 200) {
    res.send(gameInfo);
  }
  // nextGame에 해당하는 플레이한 게임이 없을 때
  else if (gameInfo.code === 404) {
    res.status(404).send(gameInfo);
  }
};

const getUserGameRecordFromApi = async (userNum, nextGame) => {
  // 처음 가져오는 기록인지 확인하고 url 다르게 설정
  let url = nextGame === "0" ? `/user/games/${userNum}` : `/user/games/${userNum}?next=${nextGame}`;

  try {
    const res = await axios({
      rejectUnauthorized: false,
      method: "GET",
      url: encodeURI(`https://open-api.bser.io/v1${url}`),
      headers: {
        accept: "application/json",
        "x-api-key": process.env.Eternal_Return_API_KEY,
      },
    });

    const { code, message, userGames } = res.data;

    let next = 0;

    let records = [];

    for (let i = 0; i < userGames.length; i++) {
      let {
        gameId,
        matchingMode,
        matchingTeamMode,
        seasonId,
        characterNum,
        skinCode,
        characterLevel,
        gameRank,
        playerKill,
        playerAssistant,
        monsterKill,
        bestWeapon,
        equipment,
        mmrGain,
        mmrAfter,
        playTime,
        startDtm,
        escapeState,
        routeIdOfStart,
        traitFirstCore,
        traitFirstSub,
        traitSecondSub,
        playerDeaths,
        damageToPlayer,
      } = res.data.userGames[i];

      playTime =
        Math.floor(playTime / 60)
          .toString()
          .padStart(2, "0") +
        ":" +
        (playTime % 60).toString().padStart(2, "0");

      let playingDate = new Date(startDtm);
      const year = playingDate.getFullYear().toString().substring(2, 4);
      playingDate = year + "년" + (playingDate.getMonth() + 1 + "").padStart(2, "0") + "월" + (playingDate.getDate() + "").padStart(2, "0") + "일";

      records.push({
        gameId,
        matchingMode,
        matchingTeamMode,
        seasonId,
        characterNum,
        skinCode,
        characterLevel,
        gameRank,
        playerKill,
        playerAssistant,
        monsterKill,
        bestWeapon,
        equipment,
        mmrGain,
        mmrAfter,
        playTime,
        playingDate,
        escapeState,
        routeIdOfStart,
        traitFirstCore,
        traitFirstSub,
        traitSecondSub,
        playerDeaths,
        damageToPlayer,
      });
    }

    if (res.data.next === undefined) {
      next = -1;
    } else {
      next = res.data.next;
    }
    return { code, message, records, next };
  } catch (error) {
    return { code, message, next };
  }
};
