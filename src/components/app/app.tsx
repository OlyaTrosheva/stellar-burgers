import { FC, useEffect } from 'react';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

import '../../index.css';
import styles from './app.module.css';

import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { Preloader } from '@ui';
import { getIngredients, getUser } from '../../services/slices';
import { useDispatch, useSelector } from '../../services/store';

const App: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
  const user = useSelector((state) => state.user.user);
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  const isIngredientsLoading = useSelector(
    (state) => state.ingredients.isLoading
  );

  const error = useSelector((state) => state.ingredients.error);

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
  }, [dispatch]);

  if (!isAuthChecked) {
    return <div>Проверяем авторизацию...</div>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route
          path='/profile'
          element={user ? <Profile /> : <Navigate to='/login' replace />}
        />

        <Route
          path='/profile/orders'
          element={user ? <ProfileOrders /> : <Navigate to='/login' replace />}
        />

        <Route
          path='/feed/:number'
          element={
            <Modal title='Информация о заказе' onClose={() => navigate(-1)}>
              <OrderInfo />
            </Modal>
          }
        />

        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
              <IngredientDetails />
            </Modal>
          }
        />

        <Route
          path='/profile/orders/:number'
          element={
            <Modal title='Информация о заказе' onClose={() => navigate(-1)}>
              <OrderInfo />
            </Modal>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
