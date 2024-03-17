import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ClientsPage } from './pages/clients/clients.page';
import { SharedModule } from '../shared/shared.module';
import { ClientPage } from './pages/client/client.page';
import { heroHomeSolid, heroPlusCircleSolid } from '@ng-icons/heroicons/solid';
import { NgIconsModule } from '@ng-icons/core';

const routes: Routes = [
  { path: '', component: ClientsPage },
  { path: 'edit', component: ClientPage },
  { path: 'add', component: ClientPage },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgIconsModule.withIcons({
      heroHomeSolid,
      heroPlusCircleSolid,
    }),
  ],
  declarations: [ClientsPage, ClientPage],
})
export class ClientsPageModule {}
