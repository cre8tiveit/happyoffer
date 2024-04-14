import { User } from '../types/types';

export const getUser = (): User => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = user?.token || '';
  return { token, company: user?.company };
};

export const getConfig = (user: User): any => {
  const token = user?.token || '';

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
};
