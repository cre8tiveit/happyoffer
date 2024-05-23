import axios from 'axios';

import { Injectable } from '@angular/core';

import { getUser } from '../core/helpers/api.helper';
import { BASE_URL } from '../core/const';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  saveToken(appToken: string): void {
    const user = getUser();
    const token = user?.token || '';

    const url = `${BASE_URL}users`;
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const data = {
      "app_token": appToken,
    }

    axios.post(url, data, config).then((response) => {
      console.log(response);
    });
  }
}
