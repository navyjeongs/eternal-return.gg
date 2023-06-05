import { render, screen, waitFor } from "@testing-library/react";
import DetailRoute from "./DetailRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const renderComponent = (routeId: string) => {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return (
    <QueryClientProvider client={testQueryClient}>
      <MemoryRouter initialEntries={[`/game/route/${routeId}`]}>
        <Routes>
          <Route path="/game/route/:id" element={<DetailRoute />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe("특정 루트 ID를 검색했을 때", () => {
  it("존재하지 않는 ID라면 에러를 발생한다.", async () => {
    render(renderComponent("1"));

    await waitFor(() => {
      const notFoundImgEl = screen.getByAltText("NotFound");
      expect(notFoundImgEl).toBeInTheDocument();
    });
  });
});
