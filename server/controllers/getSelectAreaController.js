import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// 음식 생성기에서 routeId로 검색하면 routePath만 알려주는 함수
export const getSelectArea = async (req, res) => {
  const routeId = req.params.route;

  try {
    const res1 = await axios({
      rejectUnauthorized: false,
      method: "GET",
      url: encodeURI(`https://open-api.bser.io/v1/weaponRoutes/recommend/${routeId}`),
      headers: {
        accept: "application/json",
        "x-api-key": process.env.Eternal_Return_API_KEY,
      },
    });

    // api 호출 성공
    if (res1.data.code === 200) {
      const { code, result } = res1.data;
      let path = result.recommendWeaponRoute.paths.split(", ").map(Number);
      const resData = {
        code: code,
        title: result.recommendWeaponRoute.title,
        path,
      };
      res.send(resData);
    }
    // 없는 route
  } catch (error) {
    res.status(404).send({ message: "해당 루트가 존재하지 않습니다." });
  }
};
