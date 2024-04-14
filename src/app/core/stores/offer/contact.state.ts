import { Injectable, OnDestroy } from '@angular/core';

import { StateDataObject } from '../../types/store/state-data-object.type';
import { StateDataObjectHelper } from '../../helpers/state-data-object.helper';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, Subject, filter, map, takeUntil, tap } from 'rxjs';
import {
  AddContact,
  DeleteContact,
  EditContact,
  GetContacts,
} from './offer.actions';

import { inspectStatus } from '../../helpers/rxjs.helper';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from '../../types/types';
import { ClientService } from 'src/app/services/client.service';

export interface ContactStateModel {
  contacts: StateDataObject<Contact[]>;
}

@State<ContactStateModel>({
  name: 'contact',
  defaults: {
    contacts: StateDataObjectHelper.getStateDataObject(),
  },
})
@Injectable()
export class ContactState implements OnDestroy {
  private readonly _unsubscribe: Subject<void> = new Subject<void>();

  constructor(private readonly clientService: ClientService) {}

  @Selector()
  public static contacts(state: ContactStateModel): StateDataObject<Contact[]> {
    return state.contacts;
  }

  @Action(GetContacts)
  public GetContacts(
    { patchState }: StateContext<ContactStateModel>,
    id: string
  ): Observable<StateDataObject<Contact[]>> {
    return this.clientService.getContacts(id).pipe(
      filter((contacts) => !!contacts),
      inspectStatus(),
      tap((result) => patchState({ contacts: result })),
      takeUntil(this._unsubscribe)
    );
  }

  @Action(AddContact)
  public addContact(
    { getState, patchState }: StateContext<ContactStateModel>,
    { contact }: AddContact
  ) {
    const currentContacts = getState().contacts?.data || [];
    const updatedContacts: Contact[] = [...currentContacts, contact];

    patchState({
      contacts: {
        ...getState().contacts,
        data: updatedContacts,
      },
    });
  }

  @Action(DeleteContact)
  public deleteContact(
    { getState, patchState }: StateContext<ContactStateModel>,
    { id }: DeleteContact
  ) {
    const currentContacts = getState().contacts?.data || [];
    const updatedContacts = currentContacts.filter(
      (contact) => contact.id !== id
    );

    patchState({
      contacts: {
        ...getState().contacts,
        data: updatedContacts,
      },
    });
  }

  @Action(EditContact)
  public editContact(
    { getState, patchState }: StateContext<ContactStateModel>,
    { contact }: EditContact
  ) {
    const currentContacts = getState().contacts?.data || [];

    const updatedContacts = currentContacts.map((existingContact) =>
      existingContact.id === contact.id ? contact : existingContact
    );

    patchState({
      contacts: {
        ...getState().contacts,
        //data: updatedContacts,
      },
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
