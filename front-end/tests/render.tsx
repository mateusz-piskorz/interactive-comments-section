import { render as reactRender } from "@testing-library/react";
import { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const client = new QueryClient();

export const render = (children: ReactNode) => {
  return reactRender(children, {
    wrapper: () => (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    ),
  });
};
