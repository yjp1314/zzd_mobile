import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TabsPageRoutingModule } from './tabs.router.module';
import { TabsPage } from './tabs.page';
@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        // RouterModule.forChild([])
        TabsPageRoutingModule
    ],
    declarations: [TabsPage]
})
export class TabsPageModule { }
