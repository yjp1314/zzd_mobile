import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonitorPage } from './monitor.component';
import { NgxEchartsModule } from 'ngx-echarts';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: MonitorPage }]), NgxEchartsModule
  ],
  declarations: [MonitorPage]
})
export class MonitorPageModule { }
