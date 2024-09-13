import '@/shared/styles/global.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './appRouter';
import { setupStore } from './appStore.ts';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={appRouter()} />
    </ReduxProvider>
  </React.StrictMode>,
);
