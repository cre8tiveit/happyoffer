import { User } from '../types/types';

export const getUser = (): User => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = user?.token || '';
  return { token, company: user?.company };
};

export const getConfig = (): any => {
  const { token } = getUser();

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
};

export const getOfferUrl = (url: string): string => {
  if (url.includes('draft')) {
    return url;
  }
  const parts = url.split('/offer/');
  const draft = parts[0] + '/offer/draft/' + parts[1];

  return draft;
};
