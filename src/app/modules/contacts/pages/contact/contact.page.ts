import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.page.html',
})
export class ContactPage implements OnInit {
  public contactForm: FormGroup;
  public title = '';
  public editMode = false;

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
    private dataService: DataService
  ) {
    this.editMode = !this.router.url.includes('add');
    const contact = this.dataService.getData();
    this.contactForm = this.fb.group({
      firstname: [
        this.editMode ? contact.firstname : '',
        [Validators.required],
      ],
      lastname: [this.editMode ? contact.lastname : '', [Validators.required]],
      phonenumber: [
        this.editMode ? contact.phoneNumber : '',
        [Validators.required, Validators.pattern('\\^+[1-9]d{1,14}$')],
      ],
      email: [this.editMode ? contact.email : '', [Validators.required]],
      emailConfirmation: [
        this.editMode ? contact.emailConfirmation : '',
        [Validators.required],
      ],
      notes: [this.editMode ? contact.note : ''],
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
        console.log(`You selected: ${value.languages.value}`);
      },
    },
  ];

  public onSubmit() {
    console.log(this.contactForm.value);
  }
}
