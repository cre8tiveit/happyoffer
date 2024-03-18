import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: 'client.page.html',
  styleUrls: ['client.page.scss'],
})
export class ClientPage implements OnInit {
  myForm: FormGroup;
  title = '';
  editMode = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      name: [''],
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
  }
  ngOnInit(): void {
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
