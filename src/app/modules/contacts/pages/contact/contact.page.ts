import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.page.html',
})
export class ContactPage implements OnInit {
  public contactForm: FormGroup;
  title = '';
  addMode = false;

  constructor(private router: Router, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phonenumber: ['', [Validators.required]],
      email: ['', [Validators.required]],
      emailConfirmation: ['', [Validators.required]],
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.addMode = this.router.url.includes('add');
    this.title = this.addMode ? 'Add contact' : 'Contact';
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
  public onSubmit() {}
}
