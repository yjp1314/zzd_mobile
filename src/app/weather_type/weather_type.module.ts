import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherTypePage } from './weather_type.component';
import { NgxEchartsModule } from 'ngx-echarts';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: WeatherTypePage }]), NgxEchartsModule
  ],
  declarations: [WeatherTypePage]
})
export class WeatherTypePageModule { }
