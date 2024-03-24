import { Injectable, OnDestroy } from '@angular/core';
import { StateDataObject } from '../../types/store/state-data-object.type';
import { StateDataObjectHelper } from '../../helpers/state-data-object.helper';
import { Selector, State } from '@ngxs/store';
import { Subject } from 'rxjs';
import { Offer } from '../../types/types';

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

  constructor() {}

  @Selector()
  public static offers(state: OfferStateModel): StateDataObject<Offer[]> {
    return state.offers;
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
