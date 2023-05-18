import styled from "styled-components";

const Container = styled.div`
  background-color: #313640;
  color: white;
`;

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 6rem;
  margin: 0 auto;
  background-color: inherit;
`;

const CopyRight = styled.div`
  font-size: 2rem;
  background-color: inherit;
  color: white;
  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Etc = styled.div`
  font-size: 1.5rem;
  background-color: inherit;
  color: white;
  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const EtcContent = styled.div`
  background-color: inherit;
  color: white;
`;

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <CopyRight>© JeongSeok</CopyRight>
        <Etc>
          <EtcContent>문의 : wjdtjr8649@naver.com</EtcContent>
          <EtcContent>제작자 닉네임 : bubblesort</EtcContent>
        </Etc>
      </Wrapper>
    </Container>
  );
};

export default Footer;
