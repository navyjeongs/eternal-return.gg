import styled, { css, keyframes } from "styled-components";
import { produce } from "immer";
import axios from "axios";
import { useRef, useState } from "react";
const BtnKeyFrame = keyframes`
  0%{
    transform: rotate(0);
  }
  100%{
    transform:rotate(-180deg);
  }
`;

const BtnKeyFrame2 = keyframes`
  0%{
    transform: rotate(180deg);
  }
  100%{
    transform:rotate(0);
  }
`;
const Container = styled.div`
  width: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DetailBtn = styled.button`
  border: none;
  padding: 0;
  width: 2rem;
  height: 2rem;
  background-image: url("/img/etc/down.png");
  background-color: inherit;
  background-size: 2rem 2rem;
  cursor: pointer;

  &.active {
    animation: ${BtnKeyFrame} 0.5s ease-in-out forwards;
  }

  &.not {
    animation: ${BtnKeyFrame2} 0.5s ease-in-out forwards;
  }
`;

const GameDetailBtn = ({ isOpenDetail, setIsOpenDetail, gameId }) => {
  const btnRef = useRef(null);

  const [isClickBtn, setIsClickBtn] = useState(false);

  // 게임 기록 자세히 불러오기
  const loadDetailGameInfo = async (e, gameId) => {
    console.log(btnRef.current);

    if (btnRef.current) {
      if (isClickBtn) {
        btnRef.current.classList.remove("active");
        btnRef.current.classList.add("not");
      } else {
        btnRef.current.classList.add("active");
        btnRef.current.classList.remove("not");
      }
      setIsClickBtn((prev) => !prev);
    }

    if (!isOpenDetail.isLoad) {
      // 불러온적 없는 요소라면 api 호출
      try {
        const res = await axios({
          method: "get",
          url: `/api/detailgame/${gameId}`,
        });

        setIsOpenDetail(
          produce((draft) => {
            draft[gameId] = {
              isOpen: true,
              isLoad: true,
              record: res.data.userArr,
              maxDamage: res.data.maxDamage,
            };
          })
        );
      } catch (error) {
        alert(error.response.data.message);
        throw error;
      }
    } else {
      setIsOpenDetail(
        produce((draft) => {
          draft[gameId] = {
            isOpen: !draft[gameId].isOpen,
            isLoad: true,
            record: draft[gameId].record,
            maxDamage: draft[gameId].maxDamage,
          };
        })
      );
    }
  };

  return (
    <Container>
      <DetailBtn ref={btnRef} onClick={(e) => loadDetailGameInfo(e, gameId)} isClickBtn={isClickBtn}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.2236 0.447213L19.4211 18.8422C19.6871 19.3742 19.3003 20 18.7056 20L1.29443 20C0.699721 20 0.312924 19.3741 0.578885 18.8422L9.77639 0.447213C9.86852 0.262951 10.1315 0.262951 10.2236 0.447213Z"
            fill="var(--color__txt)"
          />
        </svg>
      </DetailBtn>
    </Container>
  );
};

export default GameDetailBtn;
