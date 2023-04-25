import { useEffect, useState } from "react";
import styled from "styled-components";
import { produce } from "immer";
import styles from "./FoodRoute.module.css";
import { Helmet } from "react-helmet-async";

import FoodRouteHeader from "./FoodRouteHeader";

import food from "../../db/foodList.json";
import material from "../../db/materialList.json";
import areadb from "../../db/areaList.json";

const FoodRouteDiv = styled.div`
  font-family: jua;
  font-size: 16px;
  width: 1200px;
  margin: 0 auto;
`;

const ImgDiv = styled.div`
  width: 400px;
  height: 400px;
  position: relative;
  text-align: center;
  display: flex;
  background-image: url("/img/lumia/lumia3.png");
  background-size: 100%;
`;

const FoodDiv = styled.div``;

const SelectArea = styled.div``;

// 스태미너 div 전체를 포함하는 div
const MakeFood = styled.div`
  display: flex;
`;

const MakeItem = styled.div`
  width: 315px;
  box-sizing: border-box;
  border: 5px solid #f9f5eb;

  margin: 0px 5px 0px 0px;
`;

const MakeItemHeader = styled.div`
  display: flex;
  border-bottom: 5px solid #f9f5eb;
`;

const MakeItemHeaderName = styled.div`
  width: 85px;
`;

const MakeItemHeaderRecover = styled.div`
  width: 50px;
`;

const MakeItemHeaderNeedItem = styled.div`
  width: 170px;
`;

const MakeItemMain = styled.div`
  display: flex;
  padding: 1px 0px 0px 0px;
  box-sizing: border-box;
  border-bottom: 2px solid #90b77d;
`;

const MakeItemMain1 = styled(MakeItemHeaderName)`
  font-size: 13px;
`;

const MakeItemMainImg = styled.img.attrs((prop) => ({
  src: `/img/item/${prop.code}.png`,
  alt: "food",
}))`
  width: 45px;
  height: 30px;
`;

const MakeItemMainCount = styled.span`
  font-size: 16px;
`;

const MakeItemMainName = styled.div`
  height: 19px;
`;

const BackSvg = styled.svg`
  background-image: url("/img/lumia/lumia3.png");
  background-size: 400px 400px;
`;

const MakeItemMain2 = styled(MakeItemHeaderRecover)``;

const MakeItemMain3 = styled(MakeItemHeaderNeedItem)``;

const MakeItemMaterial = styled.img.attrs((prop) => ({
  src: `/img/item/${prop.code}.png`,
  alt: "material",
}))`
  width: 30px;
  height: 25px;
  margin: 0px 2px 0px 0px;
  background-color: #cfd2cf;
`;

const FoodRouteMain = () => {
  // 입력한 루트의 title
  const [routeTitle, setRouteTitle] = useState("");

  // 각 지역에 있는 item과 해당 지역 선택 여부
  const [area, setArea] = useState(areadb.area);

  // 전체 체력 아이템
  const [makeHpItem, setMakeHpItem] = useState(food.hp);
  // 전체 스태미너 아이템
  const [makeMpItem, setMakeMpItem] = useState(food.mp);
  // 전체 재료 아이템
  const [materialItem, setMaterialItem] = useState(material.material);

  // 선택 지역에서 만들 수 있는 체력 아이템
  const [makeableHpItem, setMakeableHpItem] = useState({ item: [] });
  // 선택 지역에서 만들 수 있는 스태미너 아이템
  const [makeableMpItem, setMakeableMpItem] = useState({ item: [] });
  // 선택 지역의 아이템으로 만들 수 있는 아이템을 구하는 함수

  // 항구 Polygon
  const poly1 = (
    <polygon
      points="143,355 179,387 190,378 214,399 234,382 238,387 279,353 257,333 240,348 195,310"
      className={area[1].isClick === true ? styles.SelectPolygon : styles.Polygon}
      id="1"
    />
  );

  // 연못 Polygon
  const poly2 = (
    <polygon
      points="289,244 329,210 323,206 364,171 319,132 311,138 298,128 269,152 263,147 246,160 249,163 220,188 227,194 228,192 240,201 236,206 254,222 269,227"
      className={area[2].isClick === true ? styles.SelectPolygon : styles.Polygon}
      id="2"
    />
  );
  // 모래사장 Polygon
  const poly3 = (
    <polygon
      points="71,292 117,252 87,225 79,232 65,219 61,222 54,216 48,220 28,202 26,203 25,205 26,207 25,210 24,210 20,211 17,219 20,227 24,228 24,232 22,236 24,236 23,238 31,253 34,256 32,259 32,264 39,268 42,267 42,271 44,276 51,276 54,272 66,283 65,287"
      className={area[3].isClick === true ? styles.SelectPolygon : styles.Polygon}
      id="3"
    />
  );
  // 고급 주택가 Polygon
  const poly4 = (
    <polygon
      points="72,292 85,303 76,311 80,313 78,315 86,321 81,325 94,336 99,331 111,341 116,337 125,345 142,354 194,310 189,304 168,296 163,292 118,252"
      className={area[4].isClick === true ? styles.SelectPolygon : styles.Polygon}
      id="4"
    />
  );
  // 골목길 Polygon
  const poly5 = (
    <polygon
      points="114,57 175,110 238,58 249,68 252,67 269,81 281,72 273,64 283,54 236,14 226,20 206,2 193,14 177,0 124,46 125,47"
      className={area[5].isClick === true ? styles.SelectPolygon : styles.Polygon}
      id="5"
    />
  );
  // 호텔 Polygon
  const poly6 = (
    <polygon
      points="52,123 68,137 71,133 131,185 79,231 64,219 61,222 54,216 48,220 24,199 27,197 3,176 6,174 1,169 30,145 28,143"
      className={area[6].isClick === true ? styles.SelectPolygon : styles.Polygon}
      id="6"
    />
  );
  // 번화가 Polygon
  const poly7 = (
    <polygon
      points="175,111 196,129 159,162 174,176 181,169 180,168 190,159 200,167 198,169 208,177 211,177 218,182 217,185 220,188 249,163 247,161 263,147 269,152 298,127 285,116 296,106 252,67 250,68 238,58"
      className={area[7].isClick === true ? styles.SelectPolygon : styles.Polygon}
      id="7"
    />
  );
  // 병원 Polygon
  const poly8 = (
    <polygon
      points="364,171 371,176 360,185 400,219 343,269 336,264 328,271 294,241 330,211 323,206 338,194"
      className={area[8].isClick === true ? styles.SelectPolygon : styles.Polygon}
      id="8"
    />
  );
  // 절 Polygon
  const poly9 = (
    <polygon
      points="356,163 392,132 374,118 380,113 332,72 325,79 312,67 300,77 289,68 283,73 282,72 270,83 296,105 285,115 311,138 319,132"
      className={area[9].isClick === true ? styles.SelectPolygon : styles.Polygon}
      id="9"
    />
  );
  // 양궁장 Polygon
  const poly10 = (
    <polygon
      points="87,146 125,113 115,105 141,82 114,58 111,60 115,63 95,81 84,71 68,84 71,86 53,102 62,110 61,114 52,123 67,136 71,133"
      className={area[10].isClick === true ? styles.SelectPolygon : styles.Polygon}
      id="10"
    />
  );
  // 묘지 Polygon
  const poly11 = (
    <polygon
      points="287,307 327,271 294,242 289,245 269,227 255,223 236,206 229,211 228,209 218,218 219,221 212,227 208,226 199,235 201,236 194,242 242,286 253,278"
      className={area[11].isClick === true ? styles.SelectPolygon : styles.Polygon}
      id="11"
    />
  );
  // 숲 Polygon
  const poly12 = (
    <polygon
      points="207,254 164,292 87,225 158,162 174,176 172,178 169,178 162,182 162,185 153,194 151,193 141,202 150,211 152,210 162,218 162,222 169,227 172,227 181,234 179,236 190,245 193,243"
      className={area[12].isClick === true ? styles.SelectPolygon : styles.Polygon}
      id="12"
    />
  );
  // 공장 Polygon
  const poly13 = (
    <polygon
      points="336,264 357,282 354,285 391,317 358,346 348,339 320,363 316,360 306,368 283,349 279,352 258,333"
      className={area[13].isClick === true ? styles.SelectPolygon : styles.Polygon}
      id="13"
    />
  );
  // 성당 Polygon
  const poly14 = (
    <polygon
      points="207,254 243,285 253,277 287,307 239,347 189,304 168,296 164,292"
      className={area[14].isClick === true ? styles.SelectPolygon : styles.Polygon}
      id="14"
    />
  );
  // 학교 Polygon
  const poly15 = (
    <polygon
      points="141,82 196,130 132,185 87,146 125,113 115,104"
      className={area[15].isClick === true ? styles.SelectPolygon : styles.Polygon}
      id="15"
    />
  );

  const canMakeHpItem = () => {
    // 가지고 있는 아이템
    let haveItem = ["돌멩이", "고기", "나뭇가지"];

    // 만들수 있는 아이템을 저장하는 배열
    let possibleMakeHpItem = [];
    let possibleMakeMpItem = [];
    for (let i = 0; i < area.length; i++) {
      if (area[i].isClick === true) {
        haveItem.push(...area[i].item);
      }
    }

    for (let i = 0; i < makeHpItem.length; i++) {
      for (let j = 0; j < makeHpItem[i].needItem.length; j++) {
        // console.log(makeHpItem[i].name + " : ", makeHpItem[i].needItem.length);
        if (haveItem.find((element) => element === makeHpItem[i].needItem[j]) === undefined) {
          break;
        }
        if (j === makeHpItem[i].needItem.length - 1) {
          possibleMakeHpItem.push(makeHpItem[i]);
        }
      }
    }
    setMakeableHpItem(
      produce((draft) => {
        draft.item = possibleMakeHpItem;
      })
    );

    for (let i = 0; i < makeMpItem.length; i++) {
      for (let j = 0; j < makeMpItem[i].needItem.length; j++) {
        if (haveItem.find((element) => element === makeMpItem[i].needItem[j]) === undefined) {
          break;
        }
        if (j === makeMpItem[i].needItem.length - 1) {
          possibleMakeMpItem.push(makeMpItem[i]);
        }
      }
    }
    setMakeableMpItem(
      produce((draft) => {
        draft.item = possibleMakeMpItem;
      })
    );
  };

  // 지역 선택이 바뀔때 마다 실행하는 함수
  useEffect(() => {
    canMakeHpItem();
  }, [area]);

  // 지역 선택시 실행되는 함수
  const isClickArea = (e) => {
    const { id } = e.target;

    if (id !== "") {
      setArea(
        produce((draft) => {
          draft[id].isClick = !draft[id].isClick;
        })
      );
    }
  };

  // 클릭 한 지역명만 가져오기
  const clickAreaTrue = () => {
    let clickArea = " ";

    for (let i = 0; i < area.length; i++) {
      if (area[i].isClick === true) {
        clickArea += " " + area[i].name + " ";
      }
    }
    return <span>{clickArea}</span>;
  };

  return (
    <FoodRouteDiv>
      <Helmet>
        <title>현우GG 음식루트 생성기</title>
      </Helmet>

      <FoodRouteHeader area={area} setArea={setArea} setRouteTitle={setRouteTitle} />

      <div style={{ display: "flex", margin: "0 auto", width: "1200px" }}>
        <ImgDiv>
          <BackSvg
            viewBox="0 0 400 400"
            onClick={isClickArea}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              left: "0px",
            }}
          >
            {poly1}
            {poly2}
            {poly3}
            {poly4}
            {poly5}
            {poly6}
            {poly7}
            {poly8}
            {poly9}
            {poly10}
            {poly11}
            {poly12}
            {poly13}
            {poly14}
            {poly15}
          </BackSvg>
        </ImgDiv>
        <FoodDiv>
          <h3>루트 제목 : {routeTitle}</h3>
          <SelectArea>선택한 지역 : {clickAreaTrue()}</SelectArea>
          <MakeFood>
            <MakeItem>
              <MakeItemHeader>
                <MakeItemHeaderName>아이템</MakeItemHeaderName>
                <MakeItemHeaderRecover>회복 량</MakeItemHeaderRecover>
                <MakeItemHeaderNeedItem>필요 아이템</MakeItemHeaderNeedItem>
              </MakeItemHeader>
              {makeableHpItem.item.map((element, idx) => {
                return (
                  <MakeItemMain key={idx}>
                    <MakeItemMain1>
                      <MakeItemMainImg
                        code={element.code}
                        style={{ background: `url(/img/grade/${element.grade}.jpg)` }}
                      ></MakeItemMainImg>
                      <MakeItemMainCount>x{element.count}</MakeItemMainCount>
                      <MakeItemMainName>{element.name}</MakeItemMainName>
                    </MakeItemMain1>
                    <MakeItemMain2>{element.hp}</MakeItemMain2>
                    <MakeItemMain3>
                      {element.needItem.map((element, idx) => {
                        const found = materialItem.find((e) => e.name === element);
                        return <MakeItemMaterial code={found.code} key={idx}></MakeItemMaterial>;
                      })}
                    </MakeItemMain3>
                  </MakeItemMain>
                );
              })}
            </MakeItem>
            <MakeItem>
              <MakeItemHeader>
                <MakeItemHeaderName>아이템</MakeItemHeaderName>
                <MakeItemHeaderRecover>회복 량</MakeItemHeaderRecover>
                <MakeItemHeaderNeedItem>필요 아이템</MakeItemHeaderNeedItem>
              </MakeItemHeader>
              {makeableMpItem.item.map((element) => {
                return (
                  <MakeItemMain>
                    <MakeItemMain1>
                      <MakeItemMainImg
                        code={element.code}
                        style={{ backgroundImage: `url(/img/grade/${element.grade}.jpg)` }}
                      ></MakeItemMainImg>
                      <MakeItemMainCount>x{element.count}</MakeItemMainCount>
                      <MakeItemMainName>{element.name}</MakeItemMainName>
                    </MakeItemMain1>
                    <MakeItemMain2>{element.mp}</MakeItemMain2>
                    <MakeItemMain3>
                      {element.needItem.map((element) => {
                        const found = materialItem.find((e) => e.name === element);
                        return <MakeItemMaterial code={found.code}></MakeItemMaterial>;
                      })}
                    </MakeItemMain3>
                  </MakeItemMain>
                );
              })}
            </MakeItem>
          </MakeFood>
        </FoodDiv>
      </div>
    </FoodRouteDiv>
  );
};

export default FoodRouteMain;
