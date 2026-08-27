import { FC } from 'react';

import { AppHeaderUI } from '@ui';

import { useSelector } from '../../services/store';

import { useNavigate } from 'react-router-dom';

export const AppHeader: FC = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  return (
    <AppHeaderUI
      userName={user?.name || ''}
      onConstructorClick={() => navigate('/')}
      onFeedClick={() => navigate('/feed')}
      onProfileClick={() => navigate('/profile')}
    />
  );
};
