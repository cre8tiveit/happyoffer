import { Component } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.page.html',
  styleUrls: ['contacts.page.scss'],
})
export class ContactsPage {
  constructor() {}

  public ionViewWillEnter() {
    console.log('enter');
  }

  public search($event: any) {}
}
