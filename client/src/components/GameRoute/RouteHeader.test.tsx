import { render, screen } from "@testing-library/react";
import RouteHeader from "./RouteHeader";
import userEvent from "@testing-library/user-event";

window.alert = jest.fn();

describe("루트 검색 헤더", () => {
  const mocks = {
    characterCode: 1,
    title: "첫 번째 루트",
    userNickname: "bubblesort",
    weaponType: 1,
    id: 123456,
  };

  it("루트 제목이 화면에 나타난다.", () => {
    render(<RouteHeader {...mocks} />);
    const titleEl = screen.getByText("제목 : 첫 번째 루트");
    expect(titleEl).toBeInTheDocument();
  });

  it("캐릭터 이미지가 화면에 나타난다.", () => {
    render(<RouteHeader {...mocks} />);
    const imgEl = screen.getAllByRole("img");
    expect(imgEl[0]).toBeInTheDocument();
  });

  it("버튼이 있다.", () => {
    render(<RouteHeader {...mocks} />);
    const btnEl = screen.getByRole("button");
    expect(btnEl).toBeInTheDocument();
  });

  it("버튼을 클릭하면 클립보드에 내용이 복사된다.", async () => {
    render(<RouteHeader {...mocks} />);

    const btnEl = screen.getByRole("button");
    const user = userEvent.setup();

    await user.click(btnEl);

    const clipboard = await navigator.clipboard.readText();

    expect(clipboard).toBe("123456");
  });
});
