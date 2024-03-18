import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: 'clients.page.html',
  styleUrls: ['clients.page.scss'],
})
export class ClientsPage {
  constructor(private readonly router: Router) {}

  public clients = [
    {
      id: 1,
      name: 'Mc Donalds',
    },
    {
      id: 2,
      name: 'KFC',
    },
    {
      id: 3,
      name: 'Wendy',
    },
  ];

  public filterdClients: any[] = this.clients;

  public search(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filterdClients = this.clients.filter((client) =>
      client.name.toLowerCase().includes(query)
    );
  }
  public ionViewWillEnter() {
    console.log('enter');
  }

  public goHome(): void {
    this.router.navigate(['/home']);
  }

  public goContacts(id: number): void {
    this.router.navigate([`/contacts/client/${id}`]);
  }
}
