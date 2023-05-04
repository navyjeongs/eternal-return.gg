import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const detailGame = async (req, res) => {
  const gameId = req.params.gameid;

  try {
    const game = await getDetailGame(gameId);
    res.send(game);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailGame = async (gameId) => {
  try {
    const res = await axios({
      rejectUnauthorized: false,
      method: "GET",
      url: encodeURI(`https://open-api.bser.io/v1/games/${gameId}`),
      headers: {
        accept: "application/json",
        "x-api-key": process.env.Eternal_Return_API_KEY,
      },
    });

    const { userGames } = res.data;

    // 최고 데미지 찾기
    let maxDamage = 0;

    let userList = [];

    // 정렬해서 전달
    for (let i = 0; i < userGames.length; i++) {
      const {
        nickname,
        userNum,
        characterNum,
        characterLevel,
        gameRank,
        playerKill,
        playerAssistant,
        monsterKill,
        bestWeapon,
        bestWeaponLevel,
        equipment,
        damageToPlayer,
        playerDeaths,
        traitFirstCore,
        traitFirstSub,
        traitSecondSub,
        escapeState,
      } = userGames[i];

      maxDamage = Math.max(maxDamage, damageToPlayer);

      // i가 없다면 -1 넣기
      for (let j = 0; j < 6; j++) {
        if (equipment[j] === undefined) {
          equipment[j] = -1;
        }
      }

      userList.push({
        nickname,
        userNum,
        characterNum,
        characterLevel,
        gameRank,
        playerKill,
        playerAssistant,
        monsterKill,
        bestWeapon,
        bestWeaponLevel,
        equipment,
        damageToPlayer,
        playerDeaths,
        traitFirstCore,
        traitFirstSub,
        traitSecondSub,
        escapeState,
      });
    }

    userList.sort((a, b) => {
      if (a.gameRank === b.gameRank) {
        return b.escapeState - a.escapeState;
      } else {
        return a.gameRank - b.gameRank;
      }
    });

    let userArr = Array.from(Array(userGames.length / userGames[0].matchingTeamMode), () => Array());

    for (let i = 0; i < userList.length; i++) {
      userArr[Math.floor(i / userGames[0].matchingTeamMode)].push(userList[i]);
    }

    return { maxDamage, userArr };
  } catch (error) {
    throw { message: "전적을 불러오던 도중 오류가 발생했습니다.", code: 500 };
  }
};
