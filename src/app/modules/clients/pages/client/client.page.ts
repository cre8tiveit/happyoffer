import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { AddClient, EditClient } from 'src/app/core/stores/offer/offer.actions';
import { Client } from 'src/app/core/types/types';
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

  clientForm: FormGroup = {} as FormGroup;
  title = '';
  editMode = false;
  toastMessage = '';

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
    this.clientForm = this.fb.group({
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
        [Validators.pattern('^[0-9]*$')],
      ],
      phonenumber: [
        this.editMode ? this.client?.phone : '',
        [Validators.required],
      ],
      url: [
        this.editMode ? this.client?.websiteUrl : '',
        [Validators.pattern('https?://.+')],
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
    if (this.clientForm.valid) {
      const client: Client = {
        id: this.client?.id,
        name: this.clientForm.value.name,
        email: this.clientForm.value.email,
        phone: this.clientForm.value.phonenumber,
        address: this.clientForm.value.address,
        houseNumber: this.clientForm.value.number,
        city: this.clientForm.value.city,
        zip: this.clientForm.value.zipcode,
        chamberOfCommerce: this.clientForm.value.cocn,
        country: this.clientForm.value.country,
        websiteUrl: this.clientForm.value.url,
      };
      if (this.editMode) {
        this.toastMessage = 'Client updated successfully.';
        this.store.dispatch(new EditClient(client));
      } else {
        this.toastMessage = 'Client successfully added.';
        this.store.dispatch(new AddClient(client));
      }
      this.navController.back();
    }
  }
}
