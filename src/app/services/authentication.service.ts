import axios from 'axios';

import { Injectable } from '@angular/core';
import { User } from '../core/types/types';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  login(email: string, password: string): Promise<User> {
    const url = 'https://develop.my-online-offer.com/api/login';
    const postData = { email, password };

    return axios
      .post(url, postData)
      .then((response) => {
        const user: User = {
          email: response.data.data.attributes.email,
          name: response.data.data.attributes.name,
          token: response.data.data.token.token,
          company: {
            id: response.data.data.relationships.company.id,
            name: response.data.data.relationships.company.name,
          },
        };
        return user;
      })
      .catch((error) => {
        throw error;
      });
  }
}
