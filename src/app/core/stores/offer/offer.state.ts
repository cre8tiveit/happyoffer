import { Injectable, OnDestroy } from '@angular/core';

import { StateDataObject } from '../../types/store/state-data-object.type';
import { StateDataObjectHelper } from '../../helpers/state-data-object.helper';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, Subject, filter, map, takeUntil, tap } from 'rxjs';
import {
  AddClient,
  AddContact,
  GetClients,
  GetContacts,
} from './offer.actions';
import { ClientService } from 'src/app/services/client.service';
import { inspectStatus } from '../../helpers/rxjs.helper';
import { ContactService } from 'src/app/services/contact.service';

export interface Offer {
  id: number;
  name: string;
  email: string;
}

export interface Client {
  id: number;
  name: string;
  email: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
}
export interface OfferStateModel {
  offers: StateDataObject<Offer[]>;
  clients: StateDataObject<Client[]>;
  contacts: StateDataObject<Contact[]>;
}

@State<OfferStateModel>({
  name: 'offer',
  defaults: {
    offers: StateDataObjectHelper.getStateDataObject(),
    clients: StateDataObjectHelper.getStateDataObject(),
    contacts: StateDataObjectHelper.getStateDataObject(),
  },
})
@Injectable()
export class OfferState implements OnDestroy {
  private readonly _unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private readonly clientService: ClientService,
    private readonly contactService: ContactService
  ) {}

  @Selector()
  public static clients(state: OfferStateModel): StateDataObject<Client[]> {
    return state.clients;
  }

  @Selector()
  public static contacts(state: OfferStateModel): StateDataObject<Contact[]> {
    return state.contacts;
  }

  @Selector()
  public static offers(state: OfferStateModel): StateDataObject<Offer[]> {
    return state.offers;
  }

  @Action(GetClients)
  public GetClients({
    patchState,
  }: StateContext<OfferStateModel>): Observable<StateDataObject<Client[]>> {
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
    { getState, patchState }: StateContext<OfferStateModel>,
    { client }: AddClient
  ) {
    const currentClients = getState().clients?.data || [];
    const updatedClients: Client[] = [...currentClients, client];

    patchState({
      clients: {
        ...getState().clients,
        data: updatedClients,
      },
    });
  }

  @Action(GetContacts)
  public GetContacts({
    patchState,
  }: StateContext<OfferStateModel>): Observable<StateDataObject<Contact[]>> {
    return this.contactService.getContacts().pipe(
      filter((contacts) => !!contacts),
      map((contacts) => contacts.map((contacts) => contacts)),
      inspectStatus(),
      tap((result) => patchState({ contacts: result })),
      takeUntil(this._unsubscribe)
    );
  }

  @Action(AddContact)
  public addContact(
    { getState, patchState }: StateContext<OfferStateModel>,
    { contact }: AddContact
  ) {
    const currentContacts = getState().contacts?.data || [];
    const updatedContacts: Client[] = [...currentContacts, contact];

    patchState({
      contacts: {
        ...getState().contacts,
        data: updatedContacts,
      },
    });
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
