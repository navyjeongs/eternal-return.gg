import { useState } from "react";
import { useParams } from "react-router-dom";
import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

import { Error, Loading } from "../../components/FetchState";
import MatchHistoryStat from "../../components/MatchHistory/MatchHistoryStat";
import MatchHistoryGame from "../../components/MatchHistory/MatchHistoryGame";
import MatchHistorySelectCharacter from "../../components/MatchHistory/MatchHistorySelectCharacter";

interface NextRecord {
  isExist: boolean;
  recordNumber: number;
}

export interface StatRecord {
  bestWeapon: number;
  characterLevel: number;
  characterNum: number;
  damageToPlayer: number;
  equipment: [number, number, number, number, number, number];
  escapeState: number;
  gameId: number;
  gameRank: number;
  matchingMode: number;
  matchingTeamMode: number;
  monsterKill: number;
  playTime: string;
  playerAssistant: number;
  playerDeaths: number;
  playerKill: number;
  playingDate: string;
  routeIdOfStart: number;
  seasonId: number;
  skinCode: number;
  traitFirstCore: number;
  traitFirstSub: [] | [number, number];
  traitSecondSub: [] | [number, number];
}

interface AddDetail {
  isOpen: boolean;
  isLoad: boolean;
  record: Array<StatRecord> | [];
  maxDamage: number;
}

export interface UserStats {
  matchingTeamMode: number;
  averageRank: number;
  averageKills: number;
  averageAssistants: number;
  averageHunts: number;
  top1: number;
  top2: number;
  top3: number;
  totalGames: number;
  totalWins: number;
}

export interface OpenDetail {
  [key: number]: AddDetail;
}

interface IsClick {
  isClick: boolean;
  characterNum: number;
}

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
  const param = useParams().name as string;

  // 다음 게임 존재 여부, 다음 게임 번호
  const [nextRecord, setNextRecord] = useState<NextRecord>({
    isExist: true,
    recordNumber: 0,
  });

  // 전적을 저장할 배열
  const [matchHistory, setMatchHistory] = useState<Array<StatRecord> | []>([]);

  // 특정 게임 자세히 보기 클릭 여부
  const [isOpenDetail, setIsOpenDetail] = useState<OpenDetail | undefined>({});

  // 플레이한 캐릭터 가져오기
  const [isPlayCharacter, setIsPlayCharacter] = useState<Set<number>>(new Set<number>());

  const [isClickSpecificCharacter, setIsClickSpecificCharacter] = useState<IsClick>({
    isClick: false,
    characterNum: 0,
  });

  // detail 추가
  const makeIsOpenDetail = (records: Array<StatRecord>) => {
    let addDetail: Record<number, AddDetail> = {};

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

      const res: AxiosResponse = await axios({
        method: "get",
        url: `/api/games?user=${getUserNumber.data}&game=${nextRecord.recordNumber}`,
      });

      const { records, next } = res.data;
      setMatchHistory([...matchHistory, ...records]);
      makeIsOpenDetail(records);
      let newSet = new Set<number>();

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
    onError: (error: AxiosError) => {
      setNextRecord({ isExist: false, recordNumber: 0 });
    },
    enabled: getUserNumber.isSuccess,
  });

  // 일반게임 솔로, 듀오, 스쿼드, 코발트 스탯 가져오기
  const getUserStats = useQuery<Array<UserStats>>({
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
          <title>현우GG {param}</title>
          <meta name="description" content="현우GG 실시간 전적검색, 루트, MMR, KDA, KAH, 이리, 이터널리턴" />
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
