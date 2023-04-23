import axios from "axios";
import * as cheerio from "cheerio";

const baseUrl = "https://bbs.er.game.daum.net/gaia/do/er/notice/gaia/do/er/notice/list?bbsId=ERN001&objCate1=";

let crawlData = {
  notice: [],
  patchnote: [],
  event: [],
  character: [],
};

let crawlNum = {
  notice: 285,
  patchnote: 286,
  event: 288,
  character: 297,
};

export const getNotice = async (req, res) => {
  if (crawlData.notice.length === 0) {
    try {
      await parsing();
    } catch (error) {
      res.send(404);
    }
  }
  res.send({ list: crawlData, code: 200 });
};

const parsing = async () => {
  for (let key in crawlData) {
    const html = await getHTML(crawlNum[key]);
    const $ = cheerio.load(html.data);
    const $courseList = $(".board-index__item");
    $courseList.each((idx, node) => {
      // const content = $(node).find(".board-index__subject-link").text().trim().replaceAll("\n", "");

      // 자식 요소 제거하고 가져오기
      let content = $(node)
        .find(".board-index__subject-link")
        .first()
        .contents()
        .filter(function () {
          return this.type === "text";
        })
        .text();

      const date = $(node).find(".board-index__date").text().trim();
      let link = "https://bbs.er.game.daum.net/gaia/do/er/notice/";
      link = link + $(node).find(".board-index__subject-link").attr("href");
      crawlData[key].push({ content, link, date });
    });
  }
};

const getHTML = async (keyword) => {
  try {
    return await axios.get(baseUrl + keyword);
  } catch (error) {
    console.log(error);
  }
};
