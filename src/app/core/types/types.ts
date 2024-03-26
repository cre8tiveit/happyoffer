export interface Offer {
  id: number;
  number: string;
  name: string;
  nameContactPerson: string;
  created: Date;
  client: string;
}

export interface Client {
  id: number;
  name: string;
  email: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
}

export interface Notification {
  id: number;
  name: string;
}

export interface Logging {
  id: number;
  name: string;
}
