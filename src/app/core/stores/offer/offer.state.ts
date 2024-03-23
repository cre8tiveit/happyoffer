import { Injectable, OnDestroy } from '@angular/core';

import { StateDataObject } from '../../types/store/state-data-object.type';
import { StateDataObjectHelper } from '../../helpers/state-data-object.helper';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, Subject, filter, map, takeUntil, tap } from 'rxjs';
import { GetClients } from './offer.actions';
import { ClientService } from 'src/app/services/client.service';
import { inspectStatus } from '../../helpers/rxjs.helper';

export interface Offer {}

export interface Client {
  id: number;
  name: string;
  email: string;
}
export interface OfferStateModel {
  offers: StateDataObject<Offer>;
  clients: StateDataObject<Client[]>;
}

@State<OfferStateModel>({
  name: 'offer',
  defaults: {
    offers: StateDataObjectHelper.getStateDataObject(),
    clients: StateDataObjectHelper.getStateDataObject(),
  },
})
@Injectable()
export class OfferState implements OnDestroy {
  private readonly _unsubscribe: Subject<void> = new Subject<void>();
  albumStateService: any;

  constructor(private readonly clientService: ClientService) {}

  @Selector()
  public static clients(state: OfferStateModel): StateDataObject<Client[]> {
    return state.clients;
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

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
