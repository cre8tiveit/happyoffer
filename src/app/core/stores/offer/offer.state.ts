import { Injectable, OnDestroy } from '@angular/core';
import { StateDataObject } from '../../types/store/state-data-object.type';
import { StateDataObjectHelper } from '../../helpers/state-data-object.helper';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, Subject, filter, map, takeUntil, tap } from 'rxjs';
import { Client, Offer } from '../../types/types';
import { inspectStatus } from '../../helpers/rxjs.helper';
import { ClientStateModel } from './client.state';
import { OfferService } from 'src/app/services/offer.service';
import { GetOffers } from './offer.actions';

export interface OfferStateModel {
  offers: StateDataObject<Offer[]>;
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

  constructor(private readonly offerService: OfferService) {}

  @Selector()
  public static offers(state: OfferStateModel): StateDataObject<Offer[]> {
    return state.offers;
  }

  @Action(GetOffers)
  public GetOffers({
    patchState,
  }: StateContext<OfferStateModel>): Observable<StateDataObject<Offer[]>> {
    return this.offerService.getOffers().pipe(
      filter((offers) => !!offers),

      inspectStatus(),
      tap((result) => patchState({ offers: result })),
      takeUntil(this._unsubscribe)
    );
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
