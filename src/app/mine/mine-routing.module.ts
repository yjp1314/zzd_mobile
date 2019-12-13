import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MinePage } from './mine.component';
import { ModifyPasswordPage } from './modify-password/modify-password.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: '首页'
        },
        children: [{
            path: '',
            component: MinePage,
            data: {
                title: ''
            }
        },
        {
            path: 'change-password',
            component: ModifyPasswordPage,
            data: {
                title: '操作'
            }
        }
        ]
    }
];
@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MineRoutingModule { }