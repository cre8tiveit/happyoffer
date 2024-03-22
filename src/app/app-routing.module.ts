import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './modules/tabs/tabs.component';

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'clients',
        loadChildren: () =>
          import('./modules/clients/clients.module').then(
            (m) => m.ClientsPageModule
          ),
      },
      {
        path: 'contacts',
        loadChildren: () =>
          import('./modules/contacts/contacts.module').then(
            (m) => m.ContactsPageModule
          ),
      },
      {
        path: 'offers',
        loadChildren: () =>
          import('./modules/offers/offers.module').then(
            (m) => m.OffersPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
