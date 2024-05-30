import axios from 'axios';

import { Injectable } from '@angular/core';
import { Contact } from '../core/types/types';
import { BASE_URL } from '../core/const';
import { getUser, getConfig } from '../core/helpers/api.helper';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor() {}

  update(contact: Contact): void {
    const user = getUser();
    const url = `${BASE_URL}contacts/${contact.id}`;
    const config = getConfig();
    const { firstname, lastname, email, phoneNumber, emailConfirmation } =
      contact;
    const updatedData = {
      firstname,
      lastname,
      email,
      phone_number: phoneNumber,
      email_confirmation: emailConfirmation,
    };
    axios.patch(url, updatedData, config);
  }

  add(clientId: number, contact: Contact): void {
    const user = getUser();
    const url = `${BASE_URL}contacts/${clientId}/store`;
    const config = getConfig();
    const {
      firstname,
      lastname,
      email,
      phoneNumber,
      emailConfirmation,
      gender,
    } = contact;
    const updatedData = {
      firstname,
      lastname,
      email,
      gender,
      phone_number: phoneNumber,
      email_confirmation: emailConfirmation,
    };
    axios.post(url, updatedData, config);
  }
}
