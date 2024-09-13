import { fireEvent, render, waitFor } from '@testing-library/react';
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';
import { BackButton } from '..';

describe('BackButton', () => {
  test('render without crashing', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Routes>
          <Route index element={<BackButton text='back button' />} />
        </Routes>
      </BrowserRouter>,
    );
    getByText('back button');
  });

  test('work back navigation', async () => {
    const PAGES: string[] = ['page1', 'page2', 'page3'];

    const { getByText, queryByText } = render(
      <BrowserRouter>
        <Routes>
          <Route
            path=''
            element={
              <>
                {PAGES.map((page) => (
                  <Link key={page} to={`/${page}`}>{`to${page}`}</Link>
                ))}
                <BackButton text='back button' />
                <Outlet />
              </>
            }
          >
            {PAGES.map((page) => (
              <Route key={page} path={`${page}`} element={<div>{page}</div>} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>,
    );

    for await (const page of PAGES) {
      PAGES.forEach((page) => expect(queryByText(page)).toBeNull);

      expect(queryByText(page)).toBeNull();
      fireEvent.click(getByText(`to${page}`));
      expect(getByText(page));

      fireEvent.click(getByText('back button'));
      await waitFor(() => expect(queryByText(page)).toBeNull());
    }
  });
});
