import styled from "styled-components";

interface Props {
  equipment: [number, number, number, number, number, number];
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 5rem);
  column-gap: 1rem;
  row-gap: 0.5rem;

  @media screen and (max-width: 1080px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const Equip = styled.img`
  width: 5rem;
  height: 3.5rem;
  background-color: #edede9;

  @media screen and (max-width: 768px) {
    width: 3rem;
    height: 2.7rem;
  }
`;

const GameEquipment = ({ equipment }: Props) => {
  return (
    <Container>
      <Equip src={`/img/item/${equipment[0]}.png`} />
      <Equip src={`/img/item/${equipment[1]}.png`} />
      <Equip src={`/img/item/${equipment[2]}.png`} />
      <Equip src={`/img/item/${equipment[3]}.png`} />
      <Equip src={`/img/item/${equipment[4]}.png`} />
      <Equip src={`/img/item/${equipment[5]}.png`} />
    </Container>
  );
};

export default GameEquipment;
