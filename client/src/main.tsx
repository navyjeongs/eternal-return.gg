import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { RecoilRoot } from "recoil";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <HelmetProvider>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  </HelmetProvider>
);
