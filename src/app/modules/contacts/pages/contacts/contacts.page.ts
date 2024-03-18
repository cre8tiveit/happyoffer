import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.page.html',
  styleUrls: ['contacts.page.scss'],
})
export class ContactsPage {
  constructor(private readonly router: Router) {}

  public contacts = [
    {
      id: 1,
      name: 'Jansen',
    },
    {
      id: 2,
      name: 'Jongbloed',
    },
  ];

  public ionViewWillEnter() {
    console.log('enter');
  }

  public goHome(): void {
    this.router.navigate(['/home']);
  }

  public goContact(id: number): void {
    this.router.navigate([`/contacts/client/contact/${id}`]);
  }

  public add(): void {
    this.router.navigate([`/contacts/client/contact/add`]);
  }

  public search($event: any) {}
}
