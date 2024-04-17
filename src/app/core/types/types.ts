export interface Offer {
  id: number;
  number: string;
  name: string;
  nameContactPerson: string;
  created: Date;
  client: Client;
  offer: Offer;
}

export interface Client {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  houseNumber: string;
  city: string;
  zip: string;
  chamberOfCommerce: string;
  country: string;
  websiteUrl: string;
  logo?: string;
}

export interface Contact {
  id: number;
  firstname: string;
  lastname: string;
  gender: string;
  email: string;
  emailConfirmation: string;
  phoneNumber: string;
  note: string;
}

export interface Notification {
  id: number;
  message: string;
  createdAt: string;
  updatedAt: Date;
  offerId: number;
  createdBy: string;
}

export interface Logging {
  id: number;
  name: string;
}

export interface Company {
  id: string;
  name: string;
}
export interface User {
  email?: string;
  name?: string;
  token: string;
  company: Company;
}

export interface Offer {
  emailSubject: string;
  name: string;
  offerDate: string;
  offerNumber: string;
  offerStatus: string;
  offerType: string;
  totalOfferPriceOnce: string;
  totalOfferPriceRepeat: string;
  url: string;
  client: Client;
  contact?: Contact;
}
