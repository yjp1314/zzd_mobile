import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'main',
                loadChildren: () =>
                    import('../main/main.module').then(m => m.MainPageModule)
            },
            {
                path: 'monitor',
                loadChildren: () =>
                    import('../monitor/monitor.module').then(m => m.MonitorPageModule)
            },
            {
                path: 'weather',
                loadChildren: () =>
                    import('../weather_type/weather_type.module').then(m => m.WeatherTypePageModule)
            },
            {
                path: 'mine',
                loadChildren: () =>
                    import('../mine/mine.module').then(m => m.MinePageModule)
            },
            {
                path: '',
                redirectTo: '/home/main',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/home/main',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule { }
