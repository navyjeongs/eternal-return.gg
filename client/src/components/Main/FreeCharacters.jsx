import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { characterState } from "../../recoil/atoms";

const Container = styled.div`
  margin: 2rem 0;
  width: 100%;
`;

const Wrapper = styled.div`
  max-width: 108rem;
  margin: 0 auto;
`;

const Title = styled.div`
  text-align: center;
  font-size: 3rem;
`;

const CharacterGrid = styled.div`
  display: grid;
  width: 80%;
  margin: 0 auto;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 2rem;
  row-gap: 2rem;

  @media screen and (max-width: 1080px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Item = styled.div``;
const ItemTitle = styled.div`
  text-align: center;
  font-size: 1.5rem;
`;
const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Img = styled.img`
  background-color: var(--color__txt);
  max-width: 14rem;
  width: 14rem;
  aspect-ratio: 7 / 9;

  @media screen and (max-width: 1080px) {
    width: 50%;
  }
`;

const FreeCharacters = () => {
  const characterVal = useRecoilValue(characterState);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["freeCharacter"],
    queryFn: async () => {
      const res = await axios({
        method: "get",
        url: "/api/freecharacter",
      });

      return res.data;
    },
  });

  if (isSuccess) {
    return (
      <Container>
        <Wrapper>
          <Title>이번주 무료 캐릭터</Title>
          <CharacterGrid>
            {data.map((num) => {
              return (
                <Item key={num}>
                  <ItemTitle>{characterVal[num]}</ItemTitle>

                  <ImgContainer>
                    <Img src={`/img/profile/${num}.png`} />
                  </ImgContainer>
                </Item>
              );
            })}
            <Item></Item>
          </CharacterGrid>
        </Wrapper>
      </Container>
    );
  }
};

export default FreeCharacters;
