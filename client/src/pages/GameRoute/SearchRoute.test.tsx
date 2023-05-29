import { render, screen } from "@testing-library/react";
import SearchRoute from "./SearchRoute";
import userEvent from "@testing-library/user-event";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("루트를 검색할 수 있다.", () => {
  const user = userEvent.setup();

  it("placerholder가 루트 ID인 input이 element에 있다.", () => {
    render(<SearchRoute />);
    const inputEl = screen.getByPlaceholderText("루트 ID");
    expect(inputEl).toBeInTheDocument();
  });

  it("input에는 숫자만 입력할 수 있다.", async () => {
    render(<SearchRoute />);
    const inputEl: HTMLInputElement = screen.getByPlaceholderText("루트 ID");
    await user.type(inputEl, "123");
    expect(inputEl.value).toBe("123");
  });

  it("input에는 문자를 입력할 수 없다.", async () => {
    render(<SearchRoute />);
    const inputEl: HTMLInputElement = screen.getByPlaceholderText("루트 ID");
    await user.type(inputEl, "asd");
    expect(inputEl.value).not.toBe("asd");
  });

  it("input을 입력한 채로 검색버튼을 누르면 route 결과 창으로 넘어간다.", async () => {
    render(<SearchRoute />);

    const inputEl: HTMLInputElement = screen.getByPlaceholderText("루트 ID");

    await user.type(inputEl, "123");

    const navigate = mockNavigate;
    navigate(`/game/route/${inputEl.value}`);

    expect(navigate).toHaveBeenCalledWith("/game/route/123");
  });
});
