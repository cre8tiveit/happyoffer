import { Injectable, OnDestroy } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, Subject, map, of, takeUntil, tap } from 'rxjs';
import { GetActivities } from './offer.actions';

import { StateDataObject } from '../../types/store/state-data-object.type';
import { StateStatus } from '../../types/store/state-status.enum';
import { StateDataObjectHelper } from '../../helpers/state-data-object.helper';

export interface Offer {}

export interface OfferStateModel {
  offers: StateDataObject<Offer>;
}

@State<OfferStateModel>({
  name: 'offer',
  defaults: {
    offers: StateDataObjectHelper.getStateDataObject(),
  },
})
@Injectable()
export class OfferState implements OnDestroy {
  private readonly _unsubscribe: Subject<void> = new Subject<void>();

  constructor() {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
