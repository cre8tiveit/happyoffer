import { Client, Contact } from './offer.state';

export class GetClients {
  public static readonly type = '[Client] Get clients';
}

export class AddClient {
  static readonly type = '[Client] Add';
  constructor(public client: Client) {}
}

export class GetContacts {
  public static readonly type = '[Contacts] Get contacts';
}

export class AddContact {
  static readonly type = '[Contact] Add';
  constructor(public contact: Contact) {}
}
