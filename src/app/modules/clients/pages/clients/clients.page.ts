import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { ClientState } from 'src/app/core/stores/offer/client.state';

import { StateDataObject } from 'src/app/core/types/store/state-data-object.type';
import { Client } from 'src/app/core/types/types';
import { ClientPage } from '../client/client.page';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-clients',
  templateUrl: 'clients.page.html',
  styleUrls: ['clients.page.scss'],
})
export class ClientsPage implements OnInit {
  public presentingElement: any;

  @Select(ClientState.clients) public readonly clients$: Observable<
    StateDataObject<Client[]>
  >;

  public clients: Client[] = [];
  public filterdClients: Client[] = [];

  private readonly _unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly dataService: DataService,
    private readonly modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.presentingElement = document.querySelector('.ion-page');
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

  public showClientDetails(client: Client): void {
    this.dataService.setData(client);
    this.router.navigate(['clients/edit']);
  }

  public addClient(): void {
    console.log('Add client');
    this.router.navigate(['clients/add']);
  }

  async openModal(client: Client) {
    const modal = await this.modalCtrl.create({
      component: ClientPage,
      componentProps: { client },
      presentingElement: this.presentingElement,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
    }
  }
}
