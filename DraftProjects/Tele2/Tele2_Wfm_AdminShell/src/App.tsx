import {
  FC,
  lazy,
  Suspense,
  useMemo,
  useEffect,
} from 'react';
import { useAuth, AuthProvider } from 'oidc-react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import dayjs from 'dayjs';
import ShellContextProvider from '@t2crm/wfm-shell-context';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import ruLocaleDayjs from 'dayjs/locale/ru';

import Pages from 'pages';
import useTheme from 'hooks/useTheme';
import { initInterceptors, initAxiosConfigs, setAuthHeader } from 'utils/api/interseptors';

import authConfig from './authConfig';

// @ts-ignores
const ThemeProvider = lazy(() => import('tele2_wfm_uilibraryapp/components/ThemeProvider'));

dayjs.locale(ruLocaleDayjs);
dayjs.extend(customParseFormat);

initAxiosConfigs();

const App: FC = () => {
  const auth = useAuth();

  const [isDarkMode, setIsDarkMode] = useTheme();

  const isAuth = useMemo(() => !!auth.userData, [auth]);

  useEffect(() => {
    if (isAuth) {
      initInterceptors(auth.signOutRedirect);
      setAuthHeader(auth.userData?.access_token);
    }
  }, [isAuth, auth]);

  if (!isAuth) {
    return null;
  }

  return (
    <Suspense fallback={<></>}>
      <ThemeProvider mode={isDarkMode ? 'dark' : 'light'}>
        <Router>
          <Pages isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </Router>
      </ThemeProvider>
    </Suspense>
  );
};

const AuthApp: FC = () => (
  <AuthProvider
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...authConfig}
    onSignIn={() => {
      window.location.hash = '';
      window.history.pushState(null, '', '/');
    }}
    onSignOut={() => {
      window.location.hash = '';
      window.history.pushState(null, '', '/');
    }}
  >
    <App />
  </AuthProvider>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

const PageComponent: FC = () => (
  <QueryClientProvider client={queryClient}>
    <ShellContextProvider>
      <AuthApp />
      {process.env.NODE_ENV === 'development'
        ? <ReactQueryDevtools initialIsOpen={false} />
        : null}
    </ShellContextProvider>
  </QueryClientProvider>
);

export default PageComponent;
