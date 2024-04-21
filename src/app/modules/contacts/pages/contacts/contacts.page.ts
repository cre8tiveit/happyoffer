import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ContactState } from 'src/app/core/stores/offer/contact.state';
import { StateDataObject } from 'src/app/core/types/store/state-data-object.type';
import { Contact } from 'src/app/core/types/types';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.page.html',
  styleUrls: ['contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  public contacts: Contact[] = [];
  public filteredContacts: Contact[] = [];
  public clientId: string | null = '';

  @Select(ContactState.contacts) public readonly contacts$: Observable<
    StateDataObject<Contact[]>
  >;

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private readonly dataService: DataService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.clientId = params.get('id');
    });

    this.contacts$.subscribe((contacts) => {
      const c: Contact[] =
        contacts.data?.map((contact) => ({
          id: contact.id,
          firstname: contact.firstname,
          lastname: contact.lastname,
          gender: contact.gender,
          email: contact.email,
          emailConfirmation: contact.emailConfirmation,
          phoneNumber: contact.phoneNumber,
          note: contact.note,
        })) || [];

      this.contacts = c;
      this.filteredContacts = c;
    });
  }

  public goContact(contact: Contact): void {
    this.dataService.setData(contact);
    this.router.navigate([`/contacts/client/contact/${contact.id}`]);
  }

  public add(): void {
    this.dataService.setData({ clientId: this.clientId });
    this.router.navigate([`/contacts/client/contact/add`]);
  }

  public search($event: any) {
    const query = $event.target.value.toLowerCase();
    this.filteredContacts = this.contacts.filter(
      (contact) =>
        contact.firstname.toLowerCase().includes(query) ||
        contact.lastname.toLowerCase().includes(query)
    );
  }
}
