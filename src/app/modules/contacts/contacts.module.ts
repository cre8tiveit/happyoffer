import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ContactsPage } from './pages/contacts/contacts.page';
import { ContactPage } from './pages/contact/contact.page';
import { heroHomeSolid, heroPlusCircleSolid } from '@ng-icons/heroicons/solid';
import { NgIconsModule } from '@ng-icons/core';
import { ClientsPage } from './pages/clients/clients.page';

const routes: Routes = [
  { path: '', component: ClientsPage },
  { path: ':id', component: ContactPage },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes),
    NgIconsModule.withIcons({
      heroHomeSolid,
      heroPlusCircleSolid,
    }),
  ],
  declarations: [ContactsPage, ContactPage, ClientsPage],
})
export class ContactsPageModule {}
