import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainPage } from './main.component';
import { DetailComponent } from './detail/detail.component';
import { MainRoutingModule } from './main.routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MainRoutingModule
  ],
  declarations: [MainPage, DetailComponent]
})
export class MainPageModule { }
