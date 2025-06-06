// src/lib/queryClient.js
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutter fresh
      cacheTime: 10 * 60 * 1000, // 10 minutter i memory
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});
