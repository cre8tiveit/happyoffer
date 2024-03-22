import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: 'clients.page.html',
  styleUrls: ['clients.page.scss'],
})
export class ClientsPage {
  public clients: any[] = [
    { id: 1, name: 'Company 1' },
    { id: 2, name: 'Company 2' },
    { id: 3, name: 'Company 3' },
    { id: 4, name: 'Company 4' },
    { id: 5, name: 'Company 5' },
  ];

  public filterdClients: any[] = this.clients;

  constructor(private readonly router: Router) {}

  public search(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filterdClients = this.clients.filter((client) =>
      client.name.toLowerCase().includes(query)
    );
  }

  public showCompanyDetails(company: any): void {
    console.log(company);
    this.router.navigate(['clients/edit']);
  }

  public addClient(): void {
    console.log('Add client');
    this.router.navigate(['clients/add']);
  }

  public goHome(): void {
    this.router.navigate(['/home']);
  }
}
