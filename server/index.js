import express from "express";
import cors from "cors";
import detailGameRoutes from "./routes/detailGame.js";
import noticeRoutes from "./routes/notice.js";
import userNumRoutes from "./routes/userNum.js";
import gameRouteRoutes from "./routes/gameRoute.js";
import addGamesRoutes from "./routes/addGamesRoutes.js";
import statsRoutes from "./routes/statsRoute.js";
import freeCharacterRoutes from "./routes/freeCharacter.js";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
const app = express();

const PORT = process.env.PRODUCT_PORT || 3001;

const __dirname = path.resolve();

app.use(cors());

/* 배포시 주석 해제
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

*/

const server = app.listen(PORT, () => {
  console.log(`Back-End Port is: ${PORT}`);
});

server.applyMiddleware;

// 공지사항 크롤링
app.get("/api/notice", noticeRoutes);

// userNum 가져오기
app.get("/api/user/number/:name", userNumRoutes);

// 사용자의 10개의 전적 가져오기
app.get("/api/games", addGamesRoutes);

// 사용자의 특정 시즌 스탯 가져오기
app.get("/api/user/stats", statsRoutes);

// 한 게임의 자세한 정보 가져오기
app.get("/api/detailgame/:gameid", detailGameRoutes);

// 선택된 지역만 가져오기
app.get("/api/routepath/:route", gameRouteRoutes);

app.get("/api/freecharacter", freeCharacterRoutes);

/*
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});
 */
