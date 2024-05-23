import { Injectable, OnDestroy } from '@angular/core';
import { StateDataObject } from '../../types/store/state-data-object.type';
import { StateDataObjectHelper } from '../../helpers/state-data-object.helper';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, Subject, filter, map, takeUntil, tap } from 'rxjs';
import { Note, Offer } from '../../types/types';
import { inspectStatus } from '../../helpers/rxjs.helper';
import { OfferService } from 'src/app/services/offer.service';
import { GetNotes, GetOffers } from './offer.actions';

export interface OfferStateModel {
  offers: StateDataObject<Offer[]>;
  notes: StateDataObject<Note[]>;
}

@State<OfferStateModel>({
  name: 'offer',
  defaults: {
    offers: StateDataObjectHelper.getStateDataObject(),
    notes: StateDataObjectHelper.getStateDataObject(),
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

  @Selector()
  public static notes(state: OfferStateModel): StateDataObject<Note[]> {
    return state.notes;
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

  @Action(GetNotes)
  public GetNotes(
    { patchState }: StateContext<OfferStateModel>,
    { id }: GetNotes
  ): Observable<StateDataObject<Note[]>> {
    return this.offerService.getNotes(id).pipe(
      filter((notes) => !!notes),

      inspectStatus(),
      tap((result) => patchState({ notes: result })),
      takeUntil(this._unsubscribe)
    );
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
