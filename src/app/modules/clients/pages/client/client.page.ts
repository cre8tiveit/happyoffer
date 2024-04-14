import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { AddClient, EditClient } from 'src/app/core/stores/offer/offer.actions';
import { Client } from 'src/app/core/types/types';
import { ClientService } from 'src/app/services/client.service';
import { DataService } from 'src/app/services/data.service';

interface Validations {
  [key: string]: { type: string; message: string }[];
}

@Component({
  selector: 'app-client',
  templateUrl: 'client.page.html',
  styleUrls: ['client.page.scss'],
})
export class ClientPage implements OnInit {
  @Input()
  public client: Client | undefined;

  myForm: FormGroup = {} as FormGroup;
  title = '';
  editMode = false;

  validations = {
    name: [{ type: 'required', message: 'Username is required.' }],
    zipcode: [{ type: 'required', message: 'Zip code is required.' }],
    address: [{ type: 'required', message: 'Address is required.' }],
    number: [
      { type: 'required', message: 'House number is required.' },
      { type: 'pattern', message: 'Only numbers allowed.' },
    ],
    country: [{ type: 'required', message: 'Country is required.' }],
    city: [{ type: 'required', message: 'City is required.' }],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Invalid email.' },
    ],
    cocn: [
      { type: 'required', message: 'Chamber of Commerce number is required.' },
      { type: 'pattern', message: 'Only numbers allowed.' },
    ],
    phonenumber: [{ type: 'required', message: 'Phone number is required.' }],
    url: [
      { type: 'required', message: 'Website is required.' },
      { type: 'pattern', message: 'Invalid url.' },
    ],
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private dataService: DataService,
    private navController: NavController
  ) {}

  ngOnInit(): void {
    this.client = this.dataService.getData();
    this.editMode = this.router.url.includes('edit');
    this.myForm = this.fb.group({
      name: [this.editMode ? this.client?.name : '', [Validators.required]],
      address: [
        this.editMode ? this.client?.address : '',
        [Validators.required],
      ],
      zipcode: [this.editMode ? this.client?.zip : '', [Validators.required]],
      city: [this.editMode ? this.client?.city : '', [Validators.required]],
      country: [
        this.editMode ? this.client?.country : '',
        [Validators.required],
      ],
      email: [
        this.editMode ? this.client?.email : '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      cocn: [
        this.editMode ? this.client?.chamberOfCommerce : '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      phonenumber: [this.client?.phone, [Validators.required]],
      url: [
        this.editMode ? this.client?.websiteUrl : '',
        [Validators.required, Validators.pattern('https?://.+')],
      ],
      number: [
        this.editMode ? this.client?.houseNumber : '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
    });
    this.editMode = this.router.url.includes('edit');
    this.title = this.editMode ? 'Client' : 'Add client';
  }

  public async onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      const client: Client = {
        id: this.client?.id,
        name: this.myForm.value.name,
        email: this.myForm.value.email,
        phone: this.myForm.value.phonenumber,
        address: this.myForm.value.address,
        houseNumber: this.myForm.value.number,
        city: this.myForm.value.city,
        zip: this.myForm.value.zipcode,
        chamberOfCommerce: this.myForm.value.cocn,
        country: this.myForm.value.country,
        websiteUrl: this.myForm.value.url,
      };
      if (this.editMode) {
        this.store.dispatch(new EditClient(client));
      } else {
        this.store.dispatch(new AddClient(client));
      }
      this.navController.pop();
    } else {
      console.log('Form is invalid');
    }
  }
}
