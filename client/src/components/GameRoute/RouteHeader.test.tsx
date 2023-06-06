import { render, screen } from "@testing-library/react";
import RouteHeader from "./RouteHeader";

describe("루트 검색 헤더", () => {
  const mocks = {
    characterCode: 1,
    title: "첫 번째 루트",
    userNickname: "bubblesort",
    weaponType: 1,
    id: 1,
  };

  it("루트 제목이 화면에 나타난다.", () => {
    render(<RouteHeader {...mocks} />);
    const titleEl = screen.getByText("첫 번째 루트");
    expect(titleEl).toBeInTheDocument();
  });

  it("캐릭터 이미지가 화면에 나타난다.", () => {
    render(<RouteHeader {...mocks} />);
    const imgEl = screen.getByRole("img");
    expect(imgEl).toBeInTheDocument();
  });

  it("버튼이 있다.", () => {
    render(<RouteHeader {...mocks} />);
    const btnEl = screen.getByRole("button");
    expect(btnEl).toBeInTheDocument();
  });
});
