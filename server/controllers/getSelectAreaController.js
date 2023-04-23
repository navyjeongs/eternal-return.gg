import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// 음식 생성기에서 routeId로 검색하면 routePath만 알려주는 함수
export const getSelectArea = async (req, res) => {
  const routeId = req.params.route - id;

  const res1 = await axios({
    rejectUnauthorized: false,
    method: "GET",
    url: encodeURI(`https://open-api.bser.io/v1/weaponRoutes/recommend/${routeId}`),
    headers: {
      accept: "application/json",
      "x-api-key": process.env.Eternal_Return_API_KEY,
    },
  });

  console.log(res1.data);

  // api 호출 성공
  if (res1.data.code === 200) {
    const resData = {
      code: res1.data.code,
      title: res1.data.result.recommendWeaponRoute.title,
      path: res1.data.result.recommendWeaponRoute.paths,
    };
    res.send(resData);
  }
  // 없는 route
  else if (res1.data.code === 404) {
    const resData = {
      code: "error",
    };
    res.send(resData);
  }
};
