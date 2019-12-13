import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MinePage } from './mine.component';
import { ModifyPasswordPage } from './modify-password/modify-password.component';
import { MineRoutingModule } from './mine-routing.module';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MineRoutingModule
    // RouterModule.forChild([{ path: '', component: MinePage }]), NgxEchartsModule
  ],
  declarations: [MinePage, ModifyPasswordPage]
})
export class MinePageModule { }
