import axios from 'axios';

import { Injectable } from '@angular/core';

import { getConfig, getUser } from '../core/helpers/api.helper';
import { BASE_URL } from '../core/const';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  saveToken(appToken: string): void {
    const url = `${BASE_URL}users`;
    const config = getConfig();
    const data = {
      app_token: appToken,
    };

    axios.post(url, data, config).then((response) => {
      console.log(response);
    });
  }
}
