import { FC, ReactElement } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { useSelector } from '../../services/store';

type TProtectedRouteProps = {
  element: ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  element,
  onlyUnAuth = false
}) => {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return element;
};
