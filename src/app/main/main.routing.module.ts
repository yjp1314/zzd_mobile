import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainPage } from './main.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: '首页'
        },
        children: [{
            path: '',
            component: MainPage,
            data: {
                title: ''
            }
        },
        {
            path: 'detail',
            component: DetailComponent,
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
  export class MainRoutingModule { }