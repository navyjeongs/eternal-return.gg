import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const detailGame = async (req, res) => {
  const gameId = req.params.gameid;

  const game = await getDetailGame(gameId);

  res.send(game);
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

    // 솔로, 듀오, 스쿼드, 코발트에 따라 배열 크기 나누기
    let lists = Array.from(Array(userGames.length / userGames[0].matchingTeamMode), () => Array());

    // 최고 데미지 찾기
    let maxDamage = 0;

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
      for (let i = 0; i < 6; i++) {
        if (equipment[i] === undefined) {
          equipment[i] = -1;
        }
      }

      lists[userGames[i].gameRank - 1].push({
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

    console.log(maxDamage);

    return { lists, maxDamage };
  } catch (error) {}
};
