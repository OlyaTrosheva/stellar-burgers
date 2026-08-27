import { FC, SyntheticEvent, useState } from 'react';

import { LoginUI } from '@ui-pages';

import { login } from '../../services/slices';

import { useDispatch } from '../../services/store';

import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      .then(() => {
        navigate('/');
      });
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
