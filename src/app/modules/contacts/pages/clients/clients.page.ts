import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ClientState } from 'src/app/core/stores/offer/client.state';
import { GetContacts } from 'src/app/core/stores/offer/offer.actions';
import { StateDataObject } from 'src/app/core/types/store/state-data-object.type';
import { Client } from 'src/app/core/types/types';

@Component({
  selector: 'app-clients',
  templateUrl: 'clients.page.html',
  styleUrls: ['clients.page.scss'],
})
export class ClientsPage implements OnInit {
  @Select(ClientState.clients) public readonly clients$: Observable<
    StateDataObject<Client[]>
  >;

  constructor(private readonly router: Router, private readonly store: Store) {}

  ngOnInit(): void {
    this.clients$.subscribe((clients) => {
      this.clients = clients.data as Client[];
      this.filterdClients = this.clients;
      console.log(this.clients);
    });
  }

  public clients: Client[] = [];
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
    this.store.dispatch(new GetContacts(id));
    this.router.navigate([`/contacts/client/${id}`]);
  }
}
