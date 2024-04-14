import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ContactState } from 'src/app/core/stores/offer/contact.state';
import { StateDataObject } from 'src/app/core/types/store/state-data-object.type';
import { Client, Contact } from 'src/app/core/types/types';

@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.page.html',
  styleUrls: ['contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  public contacts: Contact[] = [];
  public filteredContacts: Contact[] = [];

  @Select(ContactState.contacts) public readonly contacts$: Observable<
    StateDataObject<Contact[]>
  >;

  constructor(private readonly router: Router) {}
  ngOnInit(): void {
    this.contacts$.subscribe((contacts) => {
      // this.contacts = contacts.data as Client[];
      this.filteredContacts = this.contacts;
    });
  }

  public goContact(id: number): void {
    this.router.navigate([`/contacts/client/contact/${id}`]);
  }

  public add(): void {
    this.router.navigate([`/contacts/client/contact/add`]);
  }

  public search($event: any) {}
}
