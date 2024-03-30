import { Client, Contact } from '../../types/types';

export class GetClients {
  public static readonly type = '[Client] Get clients';
}

export class AddClient {
  static readonly type = '[Client] Add';
  constructor(public client: Client) {}
}

export class DeleteClient {
  static readonly type = '[Client] Delete Contact';
  constructor(public id: number) {}
}

export class EditClient {
  static readonly type = '[Client] Edit Contact';
  constructor(public client: Client) {}
}
export class GetContacts {
  public static readonly type = '[Contacts] Get contacts';
}

export class AddContact {
  static readonly type = '[Contact] Add';
  constructor(public contact: Contact) {}
}

export class DeleteContact {
  static readonly type = '[Contact] Delete Contact';
  constructor(public id: number) {}
}

export class EditContact {
  static readonly type = '[Offer] Edit Contact';
  constructor(public contact: Client) {}
}

export class GetNotifications {
  public static readonly type = '[Client] Get notifications';
}

export class DeleteNotification {
  static readonly type = '[Client] Delete Notification';
  constructor(public id: number) {}
}

export class GetLogging {
  public static readonly type = '[Client] Get logging';
}

export class GetOffers {
  public static readonly type = '[Client] Get offers';
}
