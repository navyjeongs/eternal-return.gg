import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// 유저 개인 number 가져오기
export const userStats = async (req, res) => {
  const { user, season } = req.query;

  const stat = await getUserStats(user, season);

  if (stat.code === 200) {
    res.send(stat.stats);
  } else {
    res.status(404).send("error");
  }
};

const getUserStats = async (userNum, seasonId) => {
  try {
    const res = await axios({
      method: "get",
      url: encodeURI(`https://open-api.bser.io/v1/user/stats/${userNum}/${seasonId}`),
      headers: {
        accept: "application/json",
        "x-api-key": process.env.Eternal_Return_API_KEY,
      },
    });

    let stats = new Array(4);

    for (let i = 0; i < 4; i++) {
      stats[i] = { matchingTeamMode: i + 1 };
    }

    const { userStats, code } = res.data;

    console.log(userStats);

    if (code === 200) {
      for (let i = 0; i < userStats.length; i++) {
        const { matchingTeamMode, averageRank, averageKills, averageAssistants, averageHunts, top1, top2, top3, totalGames, totalWins } = userStats[i];
        stats[matchingTeamMode - 1] = { matchingTeamMode, averageRank, averageKills, averageAssistants, averageHunts, top1, top2, top3, totalGames, totalWins };
      }
      return { code, stats };
    } else {
      return { code };
    }
  } catch (error) {}
};
