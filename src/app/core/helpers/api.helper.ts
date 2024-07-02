import { BASE_DEMO_URL, BASE_URL } from '../const';
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

export const getBaseUrl = (): string => {
  const isDemo = localStorage.getItem('isDemo') === 'true';
  return isDemo ? BASE_DEMO_URL : BASE_URL;
};

export const getOfferUrl = (url: string): string => {
  if (url.includes('draft')) {
    return url;
  }
  const parts = url.split('/offer/');
  const draft = parts[0] + '/offer/draft/' + parts[1];

  return draft;
};
