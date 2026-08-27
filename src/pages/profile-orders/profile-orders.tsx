import { FC, useEffect } from 'react';

import { ProfileOrdersUI } from '@ui-pages';

import { getOrders } from '../../services/slices';

import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders.orders);

  const isLoading = useSelector((state) => state.orders.isLoading);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  if (isLoading) {
    return null;
  }

  return <ProfileOrdersUI orders={orders} />;
};
