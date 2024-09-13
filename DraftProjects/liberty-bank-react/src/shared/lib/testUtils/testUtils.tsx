import { ReactElement } from 'react';
import { MemoryRouter, Routes } from 'react-router-dom';
import { render, RenderResult } from '@testing-library/react';

export const renderWithRouter = (ui: ReactElement, route = '/'): RenderResult => {
  return {
    ...render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>{ui}</Routes>
      </MemoryRouter>,
    ),
  };
};

export const getTestIdAttribute = (prefix: string, testId?: string): object | null => {
  return testId ? { 'data-testid': `${prefix}-${testId}` } : null;
};
