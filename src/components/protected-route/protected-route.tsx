import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { getUser, getUserState } from '../../services/slices/user/user-slice';
import { Preloader } from '@ui';

interface IProtectedRouteProps {
  children: React.ReactElement;
  isPublic?: boolean;
}
export const protectedRoute = ({
  children,
  isPublic
}: IProtectedRouteProps) => {
  const location = useLocation();
  const isUserChecked = useSelector(getUserState);
  const user = useSelector(getUser);

  //Обработка состояния "проверка не завершена"
  if (!isUserChecked) {
    return <Preloader />;
  }

  //Обработка защищённых маршрутов
  if (!isPublic && (user.email === '' || user.name === '')) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  // Обработка публичных маршрутов для авторизованных пользователей
  if (isPublic && user.email && user.name) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
