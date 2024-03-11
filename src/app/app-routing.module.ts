import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
      import('./modules/offers/offers.module').then((m) => m.OffersPageModule),
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./modules/notifications/notifications.module').then(
        (m) => m.NotificationsPageModule
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./modules/settings/settings.module').then(
        (m) => m.SettingsPageModule
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
