import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/core/types/types';

@Component({
  selector: 'app-client',
  templateUrl: 'client.page.html',
  styleUrls: ['client.page.scss'],
})
export class ClientPage implements OnInit {
  @Input()
  public client: Client | undefined;

  myForm: FormGroup;
  title = '';
  editMode = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    console.log(this.client);
    this.myForm = this.fb.group({
      name: [this.client?.name],
      address: [''],
      street: [''],
      zipcode: [''],
      city: [''],
      country: [''],
      email: [''],
      cocn: [''],
      phonenumber: [''],
      url: [''],
      number: [''],
    });
    this.editMode = this.router.url.includes('edit');
    this.title = this.editMode ? 'Company' : 'Add client';
  }

  public onSubmit() {
    console.log(this.myForm.value);
  }
  public goHome(): void {
    this.router.navigate(['/home']);
  }
}
