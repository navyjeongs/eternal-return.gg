// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  // Handles a GET /user request
  rest.get("/api/routepath/detail/1", (req, res, ctx) => {
    return res(ctx.status(404), ctx.json({ message: "Not Found" }));
  }),
  rest.get("/api/routepath/detail/123456", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 200,
        routeDetail: {
          id: 711523,
          title: "벽보는 매그 루틴",
          userNickname: "zebraDRAFIX",
          weaponType: 3,
          characterCode: 4,
          equipment: [108403, 202408, 201417, 203412, 204402, 205309],
          paths: [4, 1, 14, 11],
          skillPaths: [
            "q",
            "e",
            "w",
            "e",
            "e",
            "r",
            "e",
            "q",
            "e",
            "q",
            "r",
            "q",
            "q",
            "t",
            "t",
            "r",
            "w",
            "w",
            "w",
            "w",
          ],
          descs:
            "항구에서 가죽 1개이상 먹고 바로 성당간다음 성당 묘지가는 길 닭 있는대로 잡으면서 묘지로 묘지가운대 멧잡으면서 병원가는길 멧도 잡음 그럼딱 1분되서 늑대잡으면서 들개 멧 섭취 후 위 들개 잡으면서 닭3마리까지 섭취하면 밤되기전 항구가서 곰먹기",
        },
      })
    );
  }),
];
