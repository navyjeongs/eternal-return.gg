import styled, { css } from "styled-components";
import { AreaMaterial } from "../../material/areaMaterialItem";

const ImgContainer = styled.div`
  display: flex;
  width: 40rem;
  height: 40rem;
  position: relative;
  text-align: center;
  background-size: 100%;
`;

const BackSvg = styled.svg`
  background-image: url("/img/lumia/lumia3.png");
  background-size: 400px 400px;
`;

// 항구 Polygon
const Poly1 = styled.polygon.attrs(() => ({
  points: "143,355 179,387 190,378 214,399 234,382 238,387 279,353 257,333 240,348 195,310",
  id: "1",
}))<{ isClick: boolean }>`
  cursor: pointer;
  ${(props) =>
    props.isClick
      ? css`
          fill: beige;
          opacity: 0.4;
        `
      : css`
          opacity: 0;
        `}

  &:hover {
    fill: beige;
    opacity: 0.4;
    cursor: pointer;
  }
`;

// 연못 Polygon
const Poly2 = styled(Poly1).attrs<typeof Poly1>(() => ({
  points:
    "289,244 329,210 323,206 364,171 319,132 311,138 298,128 269,152 263,147 246,160 249,163 220,188 227,194 228,192 240,201 236,206 254,222 269,227",
  id: "2",
}))``;

// 모래사장 Polygon
const Poly3 = styled(Poly1).attrs<typeof Poly1>(() => ({
  points:
    "71,292 117,252 87,225 79,232 65,219 61,222 54,216 48,220 28,202 26,203 25,205 26,207 25,210 24,210 20,211 17,219 20,227 24,228 24,232 22,236 24,236 23,238 31,253 34,256 32,259 32,264 39,268 42,267 42,271 44,276 51,276 54,272 66,283 65,287",
  id: "3",
}))``;

// 고급 주택가 Polygon
const Poly4 = styled(Poly1).attrs<typeof Poly1>(() => ({
  points:
    "72,292 85,303 76,311 80,313 78,315 86,321 81,325 94,336 99,331 111,341 116,337 125,345 142,354 194,310 189,304 168,296 163,292 118,252",
  id: "4",
}))``;

// 골목길 Polygon
const Poly5 = styled(Poly1).attrs<typeof Poly1>(() => ({
  points:
    "114,57 175,110 238,58 249,68 252,67 269,81 281,72 273,64 283,54 236,14 226,20 206,2 193,14 177,0 124,46 125,47",
  id: "5",
}))``;

// 호텔 Polygon
const Poly6 = styled(Poly1).attrs<typeof Poly1>(() => ({
  points:
    "52,123 68,137 71,133 131,185 79,231 64,219 61,222 54,216 48,220 24,199 27,197 3,176 6,174 1,169 30,145 28,143",
  id: "6",
}))``;

// 번화가 Polygon
const Poly7 = styled(Poly1).attrs<typeof Poly1>(() => ({
  points:
    "175,111 196,129 159,162 174,176 181,169 180,168 190,159 200,167 198,169 208,177 211,177 218,182 217,185 220,188 249,163 247,161 263,147 269,152 298,127 285,116 296,106 252,67 250,68 238,58",
  id: "7",
}))``;

// 병원 Polygon
const Poly8 = styled(Poly1).attrs<typeof Poly1>(() => ({
  points: "364,171 371,176 360,185 400,219 343,269 336,264 328,271 294,241 330,211 323,206 338,194",
  id: "8",
}))``;

// 절 Polygon
const Poly9 = styled(Poly1).attrs<typeof Poly1>(() => ({
  points:
    "356,163 392,132 374,118 380,113 332,72 325,79 312,67 300,77 289,68 283,73 282,72 270,83 296,105 285,115 311,138 319,132",
  id: "9",
}))``;

// 양궁장 Polygon
const Poly10 = styled(Poly1).attrs<typeof Poly1>(() => ({
  points:
    "87,146 125,113 115,105 141,82 114,58 111,60 115,63 95,81 84,71 68,84 71,86 53,102 62,110 61,114 52,123 67,136 71,133",
  id: "10",
}))``;

// 묘지 Polygon
const Poly11 = styled(Poly1).attrs<typeof Poly1>(() => ({
  points:
    "287,307 327,271 294,242 289,245 269,227 255,223 236,206 229,211 228,209 218,218 219,221 212,227 208,226 199,235 201,236 194,242 242,286 253,278",
  id: "11",
}))``;

// 숲 Polygon
const Poly12 = styled(Poly1).attrs<typeof Poly1>(() => ({
  points:
    "207,254 164,292 87,225 158,162 174,176 172,178 169,178 162,182 162,185 153,194 151,193 141,202 150,211 152,210 162,218 162,222 169,227 172,227 181,234 179,236 190,245 193,243",
  id: "12",
}))``;

// 공장 Polygon
const Poly13 = styled(Poly1).attrs<typeof Poly1>(() => ({
  points: "336,264 357,282 354,285 391,317 358,346 348,339 320,363 316,360 306,368 283,349 279,352 258,333",
  id: "13",
}))``;

// 성당 Polygon
const Poly14 = styled(Poly1).attrs<typeof Poly1>(() => ({
  points: "207,254 243,285 253,277 287,307 239,347 189,304 168,296 164,292",
  id: "14",
}))``;

const Poly15 = styled(Poly1).attrs<typeof Poly1>(() => ({
  points: "141,82 196,130 132,185 87,146 125,113 115,104",
  id: "15",
}))``;

interface FoodProps {
  area: Array<AreaMaterial>;
  isClickArea: (e: React.SyntheticEvent<SVGElement>) => void;
}

const FoodPolygon = (props: FoodProps) => {
  const { area, isClickArea } = props;

  return (
    <ImgContainer>
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
        <Poly1 isClick={area[1].isClick} />
        <Poly2 isClick={area[2].isClick} />
        <Poly3 isClick={area[3].isClick} />
        <Poly4 isClick={area[4].isClick} />
        <Poly5 isClick={area[5].isClick} />
        <Poly6 isClick={area[6].isClick} />
        <Poly7 isClick={area[7].isClick} />
        <Poly8 isClick={area[8].isClick} />
        <Poly9 isClick={area[9].isClick} />
        <Poly10 isClick={area[10].isClick} />
        <Poly11 isClick={area[11].isClick} />
        <Poly12 isClick={area[12].isClick} />
        <Poly13 isClick={area[13].isClick} />
        <Poly14 isClick={area[14].isClick} />
        <Poly15 isClick={area[15].isClick} />
      </BackSvg>
    </ImgContainer>
  );
};

export default FoodPolygon;
