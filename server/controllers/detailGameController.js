import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const detailGame = async (req, res) => {
  const gameId = req.params.game - id;

  const res1 = await axios({
    rejectUnauthorized: false,
    method: "GET",
    url: encodeURI(`https://open-api.bser.io/v1/games/${gameId}`),
    headers: {
      accept: "application/json",
      "x-api-key": process.env.Eternal_Return_API_KEY,
    },
  });

  // api 호출 성공
  if (res1.data.code === 200) {
    res.send(res1.data);
  } else {
    res.send(res1.data);
  }
};
