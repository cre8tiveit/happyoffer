import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ClientsPage } from './pages/clients/clients.page';
import { SharedModule } from '../shared/shared.module';
import { ClientPage } from './pages/client/client.page';

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
  ],
  declarations: [ClientsPage, ClientPage],
})
export class ClientsPageModule {}
