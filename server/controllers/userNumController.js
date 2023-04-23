import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// 유저 개인 number 가져오기
export const getUserNum = async (req, res) => {
  const name = req.params.name;

  let userInfo = await getUserNumberFromAPI(name);

  if (userInfo.code === 200) {
    res.send(userInfo);
  } else if (userInfo.code === 404) {
    res.status(404).send(userInfo);
  }
};

const getUserNumberFromAPI = async (name) => {
  const res = await axios({
    rejectUnauthorized: false,
    method: "GET",
    url: encodeURI(`https://open-api.bser.io/v1/user/nickname?query=${name}`),
    headers: {
      accept: "application/json",
      "x-api-key": process.env.Eternal_Return_API_KEY,
    },
  });

  const { code, message, user } = res.data;

  if (code === 200) {
    // 사용자가 존재
    return {
      code,
      message,
      userNum: user.userNum,
    };
  }
  // 사용자가 존재하지 않음
  else if (code === 404) {
    return {
      code,
      message,
    };
  }
};
