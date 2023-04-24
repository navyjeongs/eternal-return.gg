import styled from "styled-components";
import { produce } from "immer";
import axios from "axios";

const Container = styled.div`
  width: 3rem;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div``;

const GameDetailBtn = ({ isOpenDetail, setIsOpenDetail, gameId }) => {
  // 게임 기록 자세히 불러오기
  const loadDetailGameInfo = async (e, gameId) => {
    // 불러온적 없는 요소라면 api 호출
    if (!isOpenDetail[gameId].isLoad) {
      const res = await axios({
        method: "get",
        url: `/api/detailgame/${gameId}`,
      });

      setIsOpenDetail(
        produce((draft) => {
          draft[gameId] = {
            isOpen: true,
            isLoad: true,
            record: res.data.lists,
            maxDamage: res.data.maxDamage,
          };
        })
      );
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
      <button onClick={(e) => loadDetailGameInfo(e, gameId)}>+</button>
    </Container>
  );
};

export default GameDetailBtn;
