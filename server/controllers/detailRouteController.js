import externalAPI from "../apis/externalAPI.js";

export const detailRoute = async (req, res) => {
  const route = req.params.route;

  try {
    const res1 = await getRoute(route);
    res.send(res1);
  } catch (error) {
    res.status(404).send(error);
  }
};

const getRoute = async (route) => {
  const res = await externalAPI({
    method: "get",
    url: `/weaponRoutes/recommend/${route}`,
  });

  const { result, code } = res.data;

  // 없는 루트거나 해당 루트가 비공개라면
  if (code === 404 || !result.recommendWeaponRoute.share) {
    throw { message: "존재하지 않는 루트거나 비공개 루트입니다.", code: 404 };
  }

  const { recommendWeaponRoute, recommendWeaponRouteDesc } = result;

  // 만드는 장비를 가져옴, 0은 제외
  const equipment = recommendWeaponRoute.weaponCodes
    .split(", ")
    .filter((val) => val !== "0")
    .map(Number);

  // 선택 지역 가져옴
  const paths = recommendWeaponRoute.paths.split(", ").map(Number);

  let skillPaths;
  let descs;

  if (recommendWeaponRouteDesc !== undefined) {
    const { skillPath, desc } = recommendWeaponRouteDesc;

    if (skillPath) {
      skillPaths = skillPath.split(",");
    }
    if (desc) {
      descs = desc;
    }
  }

  const returnData = {
    id: recommendWeaponRoute.id,
    title: recommendWeaponRoute.title,
    userNickname: recommendWeaponRoute.userNickname,
    weaponType: recommendWeaponRoute.weaponType,
    equipment,
    paths,
    skillPaths,
    descs,
  };

  return { code: 200, routeDetail: returnData };
};
