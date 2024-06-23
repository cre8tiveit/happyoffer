import { Injectable, OnDestroy } from '@angular/core';

import { StateDataObject } from '../../types/store/state-data-object.type';
import { StateDataObjectHelper } from '../../helpers/state-data-object.helper';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, Subject, filter, map, takeUntil, tap } from 'rxjs';
import {
  AddClient,
  DeleteClient,
  EditClient,
  GetClients,
} from './offer.actions';
import { ClientService } from 'src/app/services/client.service';
import { inspectStatus } from '../../helpers/rxjs.helper';
import { ContactService } from 'src/app/services/contact.service';
import { Client } from '../../types/types';

export interface ClientStateModel {
  clients: StateDataObject<Client[]>;
}

@State<ClientStateModel>({
  name: 'client',
  defaults: {
    clients: StateDataObjectHelper.getStateDataObject(),
  },
})
@Injectable()
export class ClientState implements OnDestroy {
  private readonly _unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private readonly clientService: ClientService,
    private readonly contactService: ContactService
  ) {}

  @Selector()
  public static clients(state: ClientStateModel): StateDataObject<Client[]> {
    return state.clients;
  }

  @Action(GetClients)
  public GetClients({
    patchState,
  }: StateContext<ClientStateModel>): Observable<StateDataObject<Client[]>> {
    return this.clientService.getClients().pipe(
      filter((clients) => !!clients),
      map((clients) => clients.map((client) => client)),
      inspectStatus(),
      tap((result) => patchState({ clients: result })),
      takeUntil(this._unsubscribe)
    );
  }

  @Action(AddClient)
  public addClient(
    { getState, patchState }: StateContext<ClientStateModel>,
    { client }: AddClient
  ) {
    const currentClients = getState().clients?.data || [];

    this.clientService.addClient(client).then((response: any) => {
      const id = response.data['data']['id'];
      const updateClient = {
        ...client,
        id,
      };
      const updatedClients: Client[] = [...currentClients, updateClient];
      patchState({
        clients: {
          ...getState().clients,
          data: updatedClients,
        },
      });
    });
  }

  @Action(DeleteClient)
  public deleteClient(
    { getState, patchState }: StateContext<ClientStateModel>,
    { id }: DeleteClient
  ) {
    const currentClients = getState().clients?.data || [];
    const updatedCients = currentClients.filter((client) => client.id !== id);

    patchState({
      clients: {
        ...getState().clients,
        data: updatedCients,
      },
    });
  }

  @Action(EditClient)
  public async editClient(
    { getState, patchState }: StateContext<ClientStateModel>,
    { client }: EditClient
  ) {
    const currentClients = getState().clients?.data || [];
    this.clientService.updateClient(client);

    const updatedClients = currentClients.map((existingClient) =>
      existingClient.id === client.id ? client : existingClient
    );

    patchState({
      clients: {
        ...getState().clients,
        data: updatedClients,
      },
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
