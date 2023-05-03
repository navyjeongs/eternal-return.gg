import axios from "axios";
import * as cheerio from "cheerio";

const baseUrl = "https://bbs.er.game.daum.net/gaia/do/er/notice/gaia/do/er/notice/list?bbsId=ERN001&objCate1=";

let crawlList = {
  notice: 285,
  patchnote: 286,
  event: 288,
  character: 297,
};

export const getNotice = async (req, res) => {
  try {
    let crawlData = await parsing();
    res.send({ list: crawlData, code: 200 });
  } catch (error) {
    res.status(404).send({ message: error.message, code: 404 });
  }
};

// 크롤링 문서 찾기
const parsing = async () => {
  let crawlData = { notice: [], patchnote: [], event: [], character: [] };

  try {
    for (const [key, value] of Object.entries(crawlList)) {
      const html = await getHTML(value);
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

    return crawlData;
  } catch (error) {
    throw { message: "공지사항을 불러오던 도중 오류가 발생했습니다." };
  }
};

const getHTML = async (keyword) => {
  try {
    return await axios.get(baseUrl + keyword);
  } catch (error) {
    throw Error;
  }
};
