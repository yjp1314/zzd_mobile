import { IonicModule } from '@ionic/angular';
import { Routes,RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonitorPage } from './monitor.component';
import { MonitorTemperaturePage } from '../monitor_temperature/monitor_temperature.component';
import { NgxEchartsModule } from 'ngx-echarts';
const routes: Routes = [
  {
      path: '',
      data: {
          title: '监测'
      },
      children: [{
          path: '',
          component: MonitorPage,
          data: {
              title: ''
          }
      },
      {
          path: 'temperature',
          component: MonitorTemperaturePage,
          data: {
              title: '海水温度'
          }
      }
      ]
  }
];
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes), NgxEchartsModule//[{ path: '', component: MonitorPage }]
  ],
  declarations: [MonitorPage,MonitorTemperaturePage]
})
export class MonitorPageModule { }
