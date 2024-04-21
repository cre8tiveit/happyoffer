import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import {
  AddContact,
  EditContact,
} from 'src/app/core/stores/offer/offer.actions';
import { Contact } from 'src/app/core/types/types';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.page.html',
})
export class ContactPage implements OnInit {
  public contactForm: FormGroup;
  public title = '';
  public editMode = false;
  private contact = {} as Contact;
  public gender: string = '';

  validations = {
    firstname: [{ type: 'required', message: 'First name is required.' }],
    lastname: [{ type: 'required', message: 'Last name is required.' }],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Invalid email.' },
    ],
    emailConfirmation: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Invalid email.' },
    ],
    phonenumber: [
      { type: 'required', message: 'Phone number is required.' },
      { type: 'pattern', message: 'Invalid phone number.' },
    ],
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store,
    private nav: NavController,
    private dataService: DataService
  ) {
    this.editMode = !this.router.url.includes('add');
    this.contact = this.dataService.getData();
    this.gender = this.editMode ? this.contact.gender : 'male';
    this.contactForm = this.fb.group({
      firstname: [
        this.editMode ? this.contact.firstname : '',
        [Validators.required],
      ],
      lastname: [
        this.editMode ? this.contact.lastname : '',
        [Validators.required],
      ],
      phonenumber: [
        this.editMode ? this.contact.phoneNumber : '',
        [Validators.required],
      ],
      email: [this.editMode ? this.contact.email : '', [Validators.required]],
      emailConfirmation: [
        this.editMode ? this.contact.emailConfirmation : '',
        [Validators.required],
      ],
      note: [this.editMode ? this.contact.note : ''],
    });
  }

  ngOnInit(): void {
    this.title = this.editMode ? 'Contact' : 'Add contact';
  }

  public goHome(): void {
    this.router.navigate(['/home']);
  }

  public pickerColumns = [
    {
      name: 'gender',
      options: [
        {
          text: 'Male',
          value: 'male',
        },
        {
          text: 'Female',
          value: 'female',
        },
      ],
    },
  ];

  public pickerButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirm',
      handler: (value: any) => {
        this.gender = value.gender.value;
      },
    },
  ];

  public onSubmit() {
    const clientId = this.dataService.getData().clientId;

    if (this.contactForm.valid) {
      const contact: Contact = {
        id: this.contact.id,
        firstname: this.contactForm.value.firstname,
        lastname: this.contactForm.value.lastname,
        email: this.contactForm.value.email,
        emailConfirmation: this.contactForm.value.emailConfirmation,
        phoneNumber: this.contactForm.value.phonenumber,
        gender: this.gender,
        note: this.contactForm.value.notes,
      };

      if (this.editMode) {
        this.store.dispatch(new EditContact(contact));
      } else {
        this.store.dispatch(new AddContact(clientId, contact));
      }
      this.nav.back();
    }
  }
}
