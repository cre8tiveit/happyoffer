import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.page.html',
  styleUrls: ['contacts.page.scss'],
})
export class ContactsPage {
  constructor(private readonly router: Router) {}

  public clients = [
    {
      id: 1,
      companyName: 'Mc Donalds',
    },
    {
      id: 2,
      companyName: 'KFC',
    },
    {
      id: 3,
      companyName: 'Wendy',
    },
  ];

  public ionViewWillEnter() {
    console.log('enter');
  }

  public goHome(): void {
    this.router.navigate(['/home']);
  }

  public search($event: any) {}
}
