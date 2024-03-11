import { Component } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: 'clients.page.html',
  styleUrls: ['clients.page.scss'],
})
export class ClientsPage {
  public items = [
    { title: 'Clients', background: 'bg-primary', icon: '' },
    { title: 'Contacts', background: 'bg-primary', icon: '' },
    { title: 'Offters', background: 'bg-primary', icon: '' },
    { title: 'Notifications', background: 'bg-primary', icon: '' },
    { title: 'Settings', background: 'bg-secondary', icon: '' },
  ];

  constructor() {}
}
