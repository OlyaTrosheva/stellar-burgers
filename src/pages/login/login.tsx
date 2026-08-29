import { FC, SyntheticEvent, useState } from 'react';

import { LoginUI } from '@ui-pages';

import { login } from '../../services/slices';

import { useDispatch, useSelector } from '../../services/store';

export const Login: FC = () => {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.user.error);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      login({
        email,
        password
      })
    )
      .unwrap()
      .catch(() => {});
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
