import { useEffect, useState } from "react";
import styled from "styled-components";
import { produce } from "immer";
import { Helmet } from "react-helmet-async";

import FoodRouteHeader from "./FoodRouteHeader";
import FoodPolygon from "./FoodPolygon";

import { foodMaterial } from "../../material/foodMaterial";
import { AreaMaterial, areaMaterialItem } from "../../material/areaMaterialItem";
import { HPFood, MPFood, foodHP, foodMP } from "../../material/foodList";

interface MakeItemImgProps {
  code: number;
  grade: "common" | "epic" | "legend" | "rare" | "uncommon";
}

const Container = styled.div`
  width: 100%;
  max-width: 108rem;
  margin: 0 auto;
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

const BackSvg = styled.svg`
  background-image: url("/img/lumia/lumia3.png");
  background-size: 400px 400px;
`;

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  @media screen and (max-width: 1080px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FoodDiv = styled.div``;

const SelectArea = styled.div``;

// 스태미너 div 전체를 포함하는 div
const MakeFood = styled.div`
  display: flex;
  column-gap: 2rem;
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
  const [haveMaterial, setHaveMaterial] = useState<Map<string, number>>(
    new Map([
      ["빵", 1],
      ["물", 1],
    ])
  );

  const [canMakeHPItem, setCanMakeHpItem] = useState<Array<HPFood>>([]);
  const [canMakeMPItem, setCanMakeMpItem] = useState<Array<MPFood>>([]);
  /// 위에 가 새로 추가

  // 입력한 루트의 title
  const [routeTitle, setRouteTitle] = useState("");

  // 각 지역에 있는 item과 해당 지역 선택 여부
  const [area, setArea] = useState<Array<AreaMaterial>>(areaMaterialItem);

  // 가지고 있는 재료 변경
  const handleHaveMaterial = (id: number, isClick: boolean): void => {
    let tmpMap = new Map(haveMaterial);

    const { item } = areaMaterialItem[id];

    // 지역을 선택한거면
    if (isClick) {
      for (let i = 0; i < item.length; i++) {
        tmpMap.set(item[i], (tmpMap.get(item[i]) || 0) + 1);
      }
    }
    // 선택 해제 한거면
    else {
      for (let i = 0; i < item.length; i++) {
        tmpMap.set(item[i], (tmpMap.get(item[i]) || 1) - 1);
        if (tmpMap.get(item[i]) === 0) {
          tmpMap.delete(item[i]);
        }
      }
    }

    setHaveMaterial(tmpMap);
  };

  // 음식 만들기
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

  // 지역 선택시 실행되는 함수
  const isClickArea = async (e: React.SyntheticEvent<SVGElement>) => {
    const { id } = e.target as SVGPolygonElement;

    let numberId: number = +id; // id가 string이므로 배열에서 접근할 때 number가 필요하므로 number로 변환

    // 현재 false라면 만들 수 있게 변경
    handleHaveMaterial(numberId, !area[numberId].isClick);

    setArea(
      produce((draft) => {
        draft[numberId].isClick = !draft[numberId].isClick;
      })
    );
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

  useEffect(() => {
    handleMakeFood();
  }, [haveMaterial]);

  return (
    <Container>
      <Helmet>
        <title>이터널리턴 전적검색 - 음식루트 생성기</title>
      </Helmet>

      <FoodRouteHeader area={area} setArea={setArea} setRouteTitle={setRouteTitle} />

      <Wrapper>
        <FoodPolygon area={area} isClickArea={isClickArea} />
        <FoodDiv>
          <h3>루트 제목 : {routeTitle}</h3>
          <SelectArea>선택한 지역 : {clickAreaTrue()}</SelectArea>
          <svg width="23" height="26" viewBox="0 0 23 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.25 14.375L8.75 19.5417L14.25 24.7083" stroke="var(--color__txt)" stroke-width="2" />
            <path
              d="M3.16451 15.0208C2.10511 13.2971 1.68079 11.2932 1.95734 9.31981C2.2339 7.34645 3.19589 5.51397 4.6941 4.10656C6.19231 2.69914 8.14302 1.79546 10.2437 1.53567C12.3444 1.27587 14.4776 1.67448 16.3125 2.66967C18.1474 3.66486 19.5815 5.20101 20.3923 7.03988C21.2032 8.87876 21.3454 10.9176 20.797 12.8401C20.2487 14.7627 19.0403 16.4615 17.3593 17.6732C15.6784 18.8849 13.6188 19.5416 11.5 19.5416"
              stroke="var(--color__txt)"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
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
        </FoodDiv>
      </Wrapper>
    </Container>
  );
};

export default FoodRouteMain;
