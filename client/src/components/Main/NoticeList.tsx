import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { Loading } from "../FetchState";

interface NoticeContent {
  content: string;
  date: string;
  link: string;
}

interface QueryData {
  notice: Array<NoticeContent>;
  patchnote: Array<NoticeContent>;
  event: Array<NoticeContent>;
  character: Array<NoticeContent>;
}

const Main = styled.div`
  max-width: 108rem;
  margin: 0 auto;
`;

const MainContainer = styled.div`
  margin: 5rem 2rem;
`;

const SelectContainer = styled.div`
  height: 5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-bottom: 0.5rem solid gray;
`;

const BoardContainer = styled.div`
  margin-top: 2rem;
`;

const SelectElement = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;

  font-size: 2rem;
  cursor: pointer;

  @media screen and (max-width: 1080px) {
    font-size: 1.8rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const BoardHeader = styled.div`
  height: 5rem;
  display: grid;
  grid-template-columns: 10rem 80rem 14rem;
  border-bottom: 2px solid gray;
  @media screen and (max-width: 1080px) {
    grid-template-columns: 1fr 10fr 2fr;
  }
`;

const BoardHeaderIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;
const BoardHeaderContent = styled(BoardHeaderIndex)``;
const BoardHeaderDate = styled(BoardHeaderContent)``;

const BoardMainContainer = styled.ul`
  padding: 0;
  margin: 0;

  > li:nth-child(-n + 4) > div {
    background-color: #8a8a8a;
  }
  > li:nth-child(-n + 4) > div > a {
    background-color: #8a8a8a;
  }
`;

const BoardContentList = styled.li`
  height: 5rem;
  list-style: none;
  display: grid;
  grid-template-columns: 10rem 80rem 14rem;

  border-bottom: 2px solid gray;
  text-overflow: ellipsis;
  @media screen and (max-width: 1080px) {
    grid-template-columns: 1fr 10fr 2fr;
  }
`;

const BoardListIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;
const BoardListContent = styled(BoardListIndex)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media screen and (max-width: 768px) {
    justify-content: flex-start;
    text-align: left;
  }
`;

const BoardLink = styled.a`
  text-decoration: none;
`;

const BoardListDate = styled(BoardListIndex)``;

const NoticeList = () => {
  const location = useLocation();

  // 공지 or 패치노트 or 이벤트 선택하기
  // 만약 url로 바로 들어왔다면 기본 값인 notice로 셋팅
  const [menu, setMenu] = useState<"notice" | "patchnote" | "event" | "character">(location.state || "notice");

  const { isLoading, isError, isSuccess, data } = useQuery<QueryData, AxiosError>({
    queryKey: ["notice"],
    queryFn: async () => {
      const res = await axios({
        method: "get",
        url: "/api/notice",
      });
      return res.data.list;
    },
    onError: (err: AxiosError) => {
      return err.response?.data;
    },
  });

  if (isLoading) {
    return <Loading>공지사항을 불러오는 중...</Loading>;
  }

  if (isError) {
    return <Loading>공지사항을 불러오는 중 오류가 발생했습니다.</Loading>;
  }

  return (
    <Main>
      <MainContainer>
        <SelectContainer>
          <SelectElement onClick={() => setMenu("notice")}>공지사항</SelectElement>
          <SelectElement onClick={() => setMenu("patchnote")}>패치노트</SelectElement>
          <SelectElement onClick={() => setMenu("event")}>이벤트</SelectElement>
          <SelectElement onClick={() => setMenu("character")}>캐릭터 소식</SelectElement>
        </SelectContainer>
        <BoardContainer>
          <BoardHeader>
            <BoardHeaderIndex>번호</BoardHeaderIndex>
            <BoardHeaderContent>내용</BoardHeaderContent>
            <BoardHeaderDate>작성일</BoardHeaderDate>
          </BoardHeader>
          <BoardMainContainer>
            {data[menu].map((ele: NoticeContent, idx: number) => {
              return (
                <BoardContentList key={idx}>
                  <BoardListIndex>{idx + 1}</BoardListIndex>
                  <BoardListContent>
                    <BoardLink href={ele.link} target="_blank" rel="noreferrer">
                      {ele.content}
                    </BoardLink>
                  </BoardListContent>
                  <BoardListDate>{ele.date}</BoardListDate>
                </BoardContentList>
              );
            })}
          </BoardMainContainer>
        </BoardContainer>
      </MainContainer>
    </Main>
  );
};

export default NoticeList;
