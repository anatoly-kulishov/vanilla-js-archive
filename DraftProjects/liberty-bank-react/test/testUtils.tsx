import { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { render, RenderOptions } from '@testing-library/react';
import { AppStore, RootState, setupStore } from '../src/app/appStore';
import { PreloadedState } from '@reduxjs/toolkit';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export const renderWithProviders = (
  ui: ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) => {
  function Wrapper({ children }: PropsWithChildren<NonNullable<unknown>>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
