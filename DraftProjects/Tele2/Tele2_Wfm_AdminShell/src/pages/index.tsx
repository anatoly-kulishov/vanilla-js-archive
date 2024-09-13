import { FC } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import {
  Routes as Switch,
  Route,
} from 'react-router-dom';

import PageLayout from 'components/PageLayout';
import RequireCheckRole from 'hocs/RequireCheckRole';
import routes from 'constants/routes';
import ErrorBoundary from 'components/ErrorBoundary';

type PagesProps = {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
};

const Pages: FC<PagesProps> = ({ isDarkMode, setIsDarkMode }) => (
  <PageLayout
    isDarkMode={isDarkMode}
    setIsDarkMode={setIsDarkMode}
  >
    <Switch>
      {Object.entries(routes).map(([key, route]) => (
        route?.children?.length ? (
          route.children.map((child) => (
            <Route
              path={child.path}
              key={child.key}
              element={(
                <ErrorBoundary>
                  <RequireCheckRole route={route}>
                    {child.component}
                  </RequireCheckRole>
                </ErrorBoundary>
              )}
            />
          ))
        ) : (
          <Route
            path={route.path}
            key={key}
            element={(
              <RequireCheckRole route={route}>
                {route.component}
              </RequireCheckRole>
            )}
          />
        )))}
    </Switch>
  </PageLayout>
);

export default Pages;
