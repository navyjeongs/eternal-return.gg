import externalAPI from "../apis/externalAPI.js";

export const detailRoute = async (req, res) => {
  const route = req.params.route;

  const res1 = await getRoute(route);

  res.send("good");
};

const getRoute = async (route) => {
  const res = await externalAPI({
    method: "get",
    url: `/weaponRoutes/recommend/${route}`,
  });

  console.log(res);
};
