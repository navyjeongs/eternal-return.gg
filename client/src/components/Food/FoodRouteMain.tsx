import { useEffect, useState } from "react";
import styled from "styled-components";
import { produce } from "immer";
import { Helmet } from "react-helmet-async";

import FoodRouteHeader from "./FoodRouteHeader";
import FoodPolygon from "./FoodPolygon";

import { foodMaterial } from "../../constants/foodMaterial";
import { AreaMaterial, areaMaterialItem } from "../../constants/areaMaterialItem";
import { HPFood, MPFood, foodHP, foodMP } from "../../constants/foodList";

interface MakeItemImgProps {
  code: number;
  grade: "common" | "epic" | "legend" | "rare" | "uncommon";
}

// 라우트에서 음식 재료 가져올 때
export interface RoutePath {
  path: number;
  isClick: boolean;
}

const Container = styled.div`
  width: 100%;
  max-width: 108rem;
  margin: 2rem auto;
`;

const ImgContainer = styled.div`
  display: flex;
  width: 40rem;
  height: 40rem;
  position: relative;
  text-align: center;
  background-image: url("/img/lumia/lumia3.png");
  background-size: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  @media screen and (max-width: 1080px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FoodContainer = styled.div``;
const FoodTitle = styled.h2`
  font-size: 2rem;
`;

const ResetBtn = styled.button`
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.2rem solid var(--color__txt);
  padding: 0;

  cursor: pointer;
  border-radius: 1rem;
`;

const MakeFood = styled.div`
  display: flex;
  column-gap: 2rem;

  @media screen and (max-width: 1080px) {
    flex-direction: column;
    row-gap: 2rem;
  }
`;

const MakeItem = styled.div`
  border: 0.2rem solid var(--color__2nd);
  overflow-y: scroll;
  height: 50rem;
`;

const MakeItemHeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 7rem 5rem 18rem;
  align-items: center;
  justify-content: center;

  font-size: 1.4rem;
  border-bottom: 0.2rem solid var(--color__2nd);
`;
const HeaderName = styled.div``;
const HeaderRecover = styled.div``;
const HeaderNeedItem = styled.div``;

const MakeItemMain = styled.div`
  display: grid;
  grid-template-columns: 7rem 5rem 18rem;
  font-size: 1.4rem;
`;
const MainItemContent = styled.div``;
const MainItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const MainItemImg = styled.img.attrs<MakeItemImgProps>((prop) => ({
  src: `/img/item/${prop.code}.png`,
  alt: "food",
}))<MakeItemImgProps>`
  width: 4.5rem;
  height: 2.8125rem;
  background-image: ${(prop) => `url(/img/grade/${prop.grade}.jpg)`};
  background-size: 4.5rem 3rem;
`;
const MainItemCount = styled.div``;
const MainItemName = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const MakeItemHeal = styled.div`
  padding-top: 0.5rem;
`;
const MakeItemMaterialWrapper = styled.div`
  padding-top: 0.5rem;
  display: flex;
  column-gap: 0.3rem;
`;

const MakeItemMaterialImg = styled(MainItemImg).attrs<MakeItemImgProps>((prop) => ({
  src: `/img/item/${prop.code}.png`,
  alt: "material",
}))<MakeItemImgProps>`
  width: 3rem;
  height: 1.875rem;
  background-image: url("/img/grade/common.jpg");
`;

const FoodRouteMain = () => {
  // 각 지역에 있는 item과 해당 지역 선택 여부
  const [area, setArea] = useState<Array<AreaMaterial>>(areaMaterialItem);

  // 현재 가지고 있는 재료 아이템
  const [haveMaterial, setHaveMaterial] = useState<Map<string, number>>(
    new Map([
      ["빵", 1],
      ["물", 1],
    ])
  );

  // 만들 수 있는 체력 아이템
  const [canMakeHPItem, setCanMakeHpItem] = useState<Array<HPFood>>([]);
  // 만들 수 있는 스태미너 아이템
  const [canMakeMPItem, setCanMakeMpItem] = useState<Array<MPFood>>([]);

  // 만약 루트를 가져왔다면 가쟈온 루트의 제목
  const [routeTitle, setRouteTitle] = useState<string>("");

  /**
   * 선택지역을 확인해서 가지고 있는 재료를 변경
   */
  const handleHaveMaterial = () => {
    let tmpMap = new Map<string, number>([]);

    for (let i = 0; i < area.length; i++) {
      const { item } = areaMaterialItem[i];
      if (area[i].isClick) {
        for (let j = 0; j < item.length; j++) {
          tmpMap.set(item[j], (tmpMap.get(item[j]) || 0) + 1);
        }
      }
    }

    setHaveMaterial(tmpMap);
  };

  /**
   * 가지고 있는 재료로 음식을 만듦
   */
  const handleMakeFood = () => {
    let possibleMakeHpItem: Set<HPFood> = new Set();
    let possibleMakeMpItem: Set<MPFood> = new Set();

    // Map 객체의 키를 배열로 변환
    let haveMaterialArr = Array.from(haveMaterial.keys());

    for (let i = 0; i < foodHP.length; i++) {
      const { needItem, name } = foodHP[i];

      if (needItem.every((ele) => haveMaterialArr.includes(ele))) {
        possibleMakeHpItem.add(foodHP[i]);
      }
    }

    for (let i = 0; i < foodMP.length; i++) {
      const { needItem, name } = foodMP[i];

      if (needItem.every((ele) => haveMaterialArr.includes(ele))) {
        possibleMakeMpItem.add(foodMP[i]);
      }
    }

    // Map 객체를 Array로 변환
    setCanMakeHpItem(Array.from(possibleMakeHpItem));
    setCanMakeMpItem(Array.from(possibleMakeMpItem));
  };

  /**
   * 지역 선택시 실행되는 함수
   * @param e
   */
  const isClickArea = async (e: React.SyntheticEvent<SVGElement>) => {
    const { id } = e.target as SVGPolygonElement;

    // 정확히 지역만 클릭했을 때
    if (id !== "") {
      let numberId: number = +id; // id가 string이므로 배열에서 접근할 때 number가 필요하므로 number로 변환

      // 현재 false라면 만들 수 있게 변경
      setArea(
        produce((draft) => {
          draft[numberId].isClick = !draft[numberId].isClick;
        })
      );
    }
  };

  /**
   * 폴리건을 클릭하거나
   * 리셋버튼을 누르거나
   * 루트ID를 검색하면 실행
   */
  useEffect(() => {
    handleHaveMaterial();
  }, [area]);

  /**
   * 가지고 있는 재료가 변경되면 음식 handleMakeFood를 실행하여 음식 만들기
   */
  useEffect(() => {
    handleMakeFood();
  }, [haveMaterial]);

  return (
    <Container>
      <Helmet>
        <title>이터널리턴 전적검색 - 음식루트 생성기</title>
      </Helmet>
      <FoodRouteHeader setArea={setArea} setRouteTitle={setRouteTitle} />
      <Wrapper>
        <FoodPolygon area={area} isClickArea={isClickArea} />
        <FoodContainer>
          <FoodTitle>루트 제목 : {routeTitle}</FoodTitle>
          <MakeFood>
            <MakeItem>
              <MakeItemHeaderWrapper>
                <HeaderName>아이템</HeaderName>
                <HeaderRecover>회복량</HeaderRecover>
                <HeaderNeedItem>제작 아이템</HeaderNeedItem>
              </MakeItemHeaderWrapper>
              {canMakeHPItem.map((ele) => {
                return (
                  <MakeItemMain key={ele.code}>
                    <MainItemContent>
                      <MainItemWrapper>
                        <MainItemImg code={ele.code} grade={ele.grade} />
                        <MainItemCount>x{ele.count}</MainItemCount>
                      </MainItemWrapper>
                      <MainItemName>{ele.name}</MainItemName>
                    </MainItemContent>
                    <MakeItemHeal>{ele.hp}</MakeItemHeal>
                    <MakeItemMaterialWrapper>
                      {ele.needItem.map((val) => {
                        const mat = foodMaterial.find((e) => e.name === val);
                        if (mat) {
                          return (
                            <MakeItemMaterialImg code={mat.code} grade={mat.grade} key={mat.code}></MakeItemMaterialImg>
                          );
                        }
                      })}
                    </MakeItemMaterialWrapper>
                  </MakeItemMain>
                );
              })}
            </MakeItem>
            <MakeItem>
              <MakeItemHeaderWrapper>
                <HeaderName>아이템</HeaderName>
                <HeaderRecover>회복량</HeaderRecover>
                <HeaderNeedItem>제작 아이템</HeaderNeedItem>
              </MakeItemHeaderWrapper>
              {canMakeMPItem.map((ele) => {
                return (
                  <MakeItemMain key={ele.code}>
                    <MainItemContent>
                      <MainItemWrapper>
                        <MainItemImg code={ele.code} grade={ele.grade} />
                        <MainItemCount>x{ele.count}</MainItemCount>
                      </MainItemWrapper>
                      <MainItemName>{ele.name}</MainItemName>
                    </MainItemContent>
                    <MakeItemHeal>{ele.mp}</MakeItemHeal>
                    <MakeItemMaterialWrapper>
                      {ele.needItem.map((val) => {
                        const mat = foodMaterial.find((e) => e.name === val);
                        if (mat) {
                          return (
                            <MakeItemMaterialImg code={mat.code} grade={mat.grade} key={mat.code}></MakeItemMaterialImg>
                          );
                        }
                      })}
                    </MakeItemMaterialWrapper>
                  </MakeItemMain>
                );
              })}
            </MakeItem>
          </MakeFood>
        </FoodContainer>
      </Wrapper>
    </Container>
  );
};

export default FoodRouteMain;
