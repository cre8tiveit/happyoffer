import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

interface Validations {
  [key: string]: { type: string; message: string }[];
}

@Component({
  selector: 'app-validation-messages',
  templateUrl: './validation-messages.component.html',
})
export class ValidationMessagesComponent {
  @Input() control: AbstractControl = {} as AbstractControl;
  @Input() name: string = '';

  validations: Validations = {
    name: [{ type: 'required', message: 'Username is required.' }],
    zipCode: [{ type: 'required', message: 'Zip code is required.' }],
    address: [{ type: 'required', message: 'Address is required.' }],
    number: [{ type: 'required', message: 'House number is required.' }],
    country: [{ type: 'required', message: 'Country is required.' }],
    city: [{ type: 'required', message: 'City is required.' }],
    email: [{ type: 'required', message: 'Email is required.' }],
    cocn: [
      { type: 'required', message: 'Chamber of Commerce number is required.' },
    ],
    phoneNumber: [{ type: 'required', message: 'Phone number is required.' }],
    url: [{ type: 'required', message: 'Website is required.' }],
  };

  fieldValidations: any = {};

  constructor() {
    console.log('control', this.name);
    this.fieldValidations = this.validations[this.name];
  }
}
