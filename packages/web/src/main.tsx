import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { configureClient } from '@ephemera/shared';

// Import Mantine styles
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

// Create custom theme
const theme = createTheme({
  primaryColor: 'custom-primary',
  colors: {
    'custom-primary': [
      '#ebe9ff',
      '#d1cdff',
      '#b3adff',
      '#9589ff',
      '#7866ff',
      '#5c43ff',
      '#362EFF',
      '#2920cc',
      '#1f1899',
      '#150f66',
    ],
  },
});

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Configure the API client
configureClient({
  baseUrl: '/api',
});

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30, // 30 seconds
      gcTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <Notifications position="top-right" />
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>
);
