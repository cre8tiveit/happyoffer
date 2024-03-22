import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { OfferState } from './core/stores/offer/offer.state';
import { NgIconsModule } from '@ng-icons/core';
import {
  heroUsers,
  heroUser,
  heroHome,
  heroDocumentText,
} from '@ng-icons/heroicons/outline';
import { TabsComponent } from './modules/tabs/tabs.component';
import { heroHomeSolid } from '@ng-icons/heroicons/solid';

@NgModule({
  declarations: [AppComponent, TabsComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgxsModule.forRoot([OfferState], {
      developmentMode: !environment.production,
    }),
    NgIconsModule.withIcons({
      heroUsers,
      heroUser,
      heroHome,
      heroHomeSolid,
      heroDocumentText,
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
