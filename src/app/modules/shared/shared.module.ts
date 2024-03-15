import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SubHeaderComponent } from './components/subheader/subheader.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [HeaderComponent, SubHeaderComponent],
  exports: [HeaderComponent, SubHeaderComponent],
})
export class SharedModule {}
