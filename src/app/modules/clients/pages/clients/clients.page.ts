import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: 'clients.page.html',
  styleUrls: ['clients.page.scss'],
})
export class ClientsPage {
  public companies: any[] = [
    { id: 1, name: 'Company 1' },
    { id: 2, name: 'Company 2' },
    { id: 3, name: 'Company 3' },
    { id: 4, name: 'Company 4' },
    { id: 5, name: 'Company 5' },
  ];
  constructor(private readonly router: Router) {}

  public filterdCompanies: any[] = this.companies;

  public search(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filterdCompanies = this.companies.filter((company) =>
      company.name.toLowerCase().includes(query)
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
}
