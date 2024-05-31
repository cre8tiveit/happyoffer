import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ClientState } from 'src/app/core/stores/offer/client.state';
import { OfferState } from 'src/app/core/stores/offer/offer.state';
import { StateDataObject } from 'src/app/core/types/store/state-data-object.type';
import { Client, Offer } from 'src/app/core/types/types';

@Component({
  selector: 'app-clients',
  templateUrl: 'clients.page.html',
  styleUrls: ['clients.page.scss'],
})
export class ClientsPage implements OnInit {
  @Select(ClientState.clients) public readonly clients$: Observable<
    StateDataObject<Client[]>
  >;

  constructor(private readonly modalCtrl: ModalController) {}

  public clients: Client[] = [];
  private selectedClients: Set<number> = new Set();

  ngOnInit(): void {
    this.clients$.subscribe((clients) => {
      this.clients = clients.data as Client[];
      this.clients = this.clients.map((client) => {
        return {
          ...client,
          checked: client.id ? this.selectedClients.has(+client.id) : false,
        };
      });
    });
  }

  public toggleClient(id: number) {
    if (this.selectedClients.has(+id)) {
      this.selectedClients.delete(+id);
    } else {
      this.selectedClients.add(+id);
    }
  }

  public close(): void {
    const data = { clients: this.selectedClients };
    this.modalCtrl.dismiss(data);
  }
}
