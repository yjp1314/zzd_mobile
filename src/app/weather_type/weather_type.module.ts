import { IonicModule } from '@ionic/angular';
import { Routes,RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherTypePage } from './weather_type.component';
import { WeatherPage } from '../weather/weather.component';
import { WeatherListPage } from '../weather_list/weather_list.component';
import { NgxEchartsModule } from 'ngx-echarts';

const routes: Routes = [
  {
      path: '',
      data: {
          title: '天气预报'
      },
      children: [{
          path: '',
          component: WeatherTypePage,
          data: {
              title: ''
          }
      },
      {
          path: 'detail',
          component: WeatherPage,
          data: {
              title: '天气详情'
          }
      },
      {
          path: 'list',
          component: WeatherListPage,
          data: {
              title: '天气预报列表'
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
    RouterModule.forChild(routes), NgxEchartsModule//[{ path: '', component: WeatherTypePage }]
  ],
  declarations: [WeatherTypePage,WeatherPage,WeatherListPage]
})
export class WeatherTypePageModule { }
