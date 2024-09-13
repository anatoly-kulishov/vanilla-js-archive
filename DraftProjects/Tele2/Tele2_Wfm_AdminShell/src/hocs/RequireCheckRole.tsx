import { FC, useCallback } from 'react';
import { Navigate } from 'react-router-dom';

import useDecodedToken from '@t2crm/wfm-utils/lib/hooks/useDecodedToken';

import routes from 'constants/routes';

import Page403 from 'pages/Page403';
import type { Route } from 'types/Routes';

type RequireCheckRoleProps = {
  route: Route,
};

const RequireCheckRole: FC<RequireCheckRoleProps> = ({ children, route }) => {
  const { role: roles } = useDecodedToken();

  const checkRoles = useCallback((checkRoute: Route) => {
    if (!roles) return true;
    if (!checkRoute.roles || !checkRoute.roles.length) return true;

    return checkRoute.roles.every((role) => (roles as string[]).includes(role));
  }, [roles]);

  const checkRedirect = useCallback((pages: string | string[]) => {
    const isArray = Array.isArray(pages);

    if (isArray) {
      const findFirstPage = pages.find((page) => checkRoles(routes[page]));

      if (findFirstPage) {
        return <Navigate to={routes[findFirstPage].path} replace />;
      }

      return <Page403 />;
    }

    const allowPage = checkRoles(routes[pages]);

    if (allowPage) {
      return <Navigate to={routes[pages].path} replace />;
    }

    return <Page403 />;
  }, [checkRoles]);

  if (route.autoRedirect && route.redirect) {
    return checkRedirect(route.redirect);
  }

  if (route.checkRedirect && checkRoles(routes[route.checkRedirect])) {
    return <Navigate to={routes[route.checkRedirect].path} replace />;
  }

  const allowPage = checkRoles(route);

  if (!allowPage && route.redirect) {
    return checkRedirect(route.redirect);
  }

  if (!allowPage) {
    return <Page403 />;
  }

  return (<>{children}</>);
};

export default RequireCheckRole;
