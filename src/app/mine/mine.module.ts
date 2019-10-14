import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MinePage } from './mine.component';
import { NgxEchartsModule } from 'ngx-echarts';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: MinePage }]), NgxEchartsModule
  ],
  declarations: [MinePage]
})
export class MinePageModule { }
