import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

import { Error, Loading } from "../../components/FetchState";
import MatchHistoryStat from "../../components/MatchHistory/MatchHistoryStat";
import MatchHistoryGame from "../../components/MatchHistory/MatchHistoryGame";
import MatchHistorySelectCharacter from "../../components/MatchHistory/MatchHistorySelectCharacter";

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  max-width: 108rem;
  margin: auto;
`;

const Content = styled.div`
  margin: 0 2rem;
`;

const BtnContainer = styled.div`
  margin: 0 0 2rem 0;
`;

const AddRecordBtn = styled.button`
  border: 0.2rem solid var(--color__txt);
  padding: 0.5rem;
  cursor: pointer;
`;

const MatchHistory = () => {
  const param = useParams().name;

  // 다음 게임 존재 여부, 다음 게임 번호
  const [nextRecord, setNextRecord] = useState({
    isExist: true,
    recordNumber: 0,
  });

  // 전적을 저장할 배열
  const [matchHistory, setMatchHistory] = useState([]);

  // 특정 게임 자세히 보기 클릭 여부
  const [isOpenDetail, setIsOpenDetail] = useState({});

  // 플레이한 캐릭터 가져오기
  const [isPlayCharacter, setIsPlayCharacter] = useState(new Set());

  const [isClickSpecificCharacter, setIsClickSpecificCharacter] = useState({
    isClick: false,
    characterNum: 0,
  });

  // detail 추가
  const makeIsOpenDetail = (records) => {
    let addDetail = {};

    for (let i = 0; i < records.length; i++) {
      addDetail[records[i].gameId] = {
        isOpen: false,
        isLoad: false,
        record: [],
        maxDamage: 0,
      };
    }

    setIsOpenDetail({ ...isOpenDetail, ...addDetail });
  };

  // 유저의 고유번호 가져오기
  const getUserNumber = useQuery({
    queryKey: ["getUserNumber", param],
    queryFn: async () => {
      const res = await axios({
        method: "get",
        url: `/api/user/number/${param}`,
      });
      setMatchHistory([]);
      setIsOpenDetail({});
      setIsPlayCharacter(new Set());
      setNextRecord({ isExist: true, recordNumber: 0 });
      return res.data.userNum;
    },
    onError: () => {
      setNextRecord({ isExist: false, recordNumber: 0 });
    },
    staleTime: 0,
    cacheTime: 0,
  });

  // 유저의 전적 가져오기
  const getUserMatchHistory = useQuery({
    queryKey: ["getUserMatchHistory", getUserNumber.data],

    queryFn: async () => {
      if (!nextRecord.isExist) {
        alert("더 이상의 전적이 존재하지않습니다");
        return false;
      }

      const res = await axios({
        method: "get",
        url: `/api/games?user=${getUserNumber.data}&game=${nextRecord.recordNumber}`,
      });

      const { records, next } = res.data;
      setMatchHistory([...matchHistory, ...records]);
      makeIsOpenDetail(records);

      let newSet = new Set();

      for (let i = 0; i < records.length; i++) {
        newSet.add(records[i].characterNum);
      }

      setIsPlayCharacter((prev) => new Set([...prev, ...newSet]));

      if (next === -1) {
        setNextRecord({ isExist: false, recordNumber: 0 });
      } else {
        setNextRecord({ isExist: true, recordNumber: next });
      }

      return res.data;
    },
    onError: (error) => {
      console.log(error.response);
      setNextRecord({ isExist: false, recordNumber: 0 });
    },
    enabled: getUserNumber.isSuccess,
  });

  // 일반게임 솔로, 듀오, 스쿼드, 코발트 스탯 가져오기
  const getUserStats = useQuery({
    queryKey: ["getUserStats", getUserNumber.data],

    queryFn: async () => {
      const res = await axios({
        method: "get",
        url: `/api/user/stats?user=${getUserNumber.data}&season=0`,
      });

      return res.data;
    },
    onError: () => {},
    staleTime: 0,
    cacheTime: 0,
    enabled: getUserNumber.isSuccess,
  });

  if (getUserNumber.isLoading) {
    return <Loading>전적을 불러 오는 중...</Loading>;
  }

  if (getUserNumber.isError) {
    return <Error>해당 사용자가 존재하지 않습니다.</Error>;
  }

  if (getUserMatchHistory.isError) {
    return <Error>최근 90일내의 플레이 게임이 존재하지 않습니다.</Error>;
  }

  if (getUserStats.isSuccess) {
    return (
      <>
        <Helmet>
          <title>현우GG 전적검색: {param}</title>
          <meta name="description" content="현우GG 실시간 전적검색, 루트, MMR, KDA, KAH" />
        </Helmet>
        <Container>
          <Wrapper>
            <Content>
              <MatchHistoryStat stat={getUserStats.data} />
              <MatchHistorySelectCharacter
                isPlayCharacter={isPlayCharacter}
                isClickSpecificCharacter={isClickSpecificCharacter}
                setIsClickSpecificCharacter={setIsClickSpecificCharacter}
              />
              <MatchHistoryGame
                matchHistory={matchHistory}
                isOpenDetail={isOpenDetail}
                setIsOpenDetail={setIsOpenDetail}
                isClickSpecificCharacter={isClickSpecificCharacter}
              />
              <BtnContainer>
                <AddRecordBtn onClick={() => getUserMatchHistory.refetch()}>추가전적 가져오기</AddRecordBtn>
              </BtnContainer>
            </Content>
          </Wrapper>
        </Container>
      </>
    );
  }
};

export default MatchHistory;
