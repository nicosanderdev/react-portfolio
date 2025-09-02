import React from 'react'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import "./i18n.js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      // refetchOnWindowFocus: false, // Optional: disable refetch on window focus
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(

  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
