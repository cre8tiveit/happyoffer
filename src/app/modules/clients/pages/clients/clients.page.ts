import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { Client, OfferState } from 'src/app/core/stores/offer/offer.state';
import { StateDataObject } from 'src/app/core/types/store/state-data-object.type';

@Component({
  selector: 'app-clients',
  templateUrl: 'clients.page.html',
  styleUrls: ['clients.page.scss'],
})
export class ClientsPage implements OnInit {
  @Select(OfferState.clients) public readonly clients$: Observable<
    StateDataObject<Client[]>
  >;

  public clients: Client[] = [];
  public filterdClients: Client[] = [];

  private readonly _unsubscribe: Subject<void> = new Subject<void>();

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.clients$.subscribe((clients) => {
      this.clients = clients.data as Client[];
      this.filterdClients = this.clients;
    });
  }

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
