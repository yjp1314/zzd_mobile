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
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../main/main.module').then(m => m.MainPageModule)
                    },
                    {
                        path:'detail',
                        loadChildren:()=>
                        import("../main/detail/detail.module").then(m=>m.DetailPageModule)
                    }
                ]
            },
            {
                path: 'monitor',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../monitor/monitor.module').then(m => m.MonitorPageModule)
                    },                    
                    {
                        path: 'temperature',
                        loadChildren: () =>
                            import('../monitor_temperature/monitor_temperature.module').then(m => m.MonitorTemperaturePageModule)
                    },                    
                    {
                        path: 'current',
                        loadChildren: () =>
                            import('../monitor_current/monitor_current.module').then(m => m.MonitorCurrentPageModule)
                    }
                ]
            },
            {
                path: 'weather',
                children: [
                    {
                        path: 'detail',
                        loadChildren: () =>
                            import('../weather/weather.module').then(m => m.WeatherPageModule)
                    },
                    {
                        path: 'list',
                        loadChildren: () =>
                            import('../weather_list/weather_list.module').then(m => m.WeatherListPageModule)
                    },
                    {
                        path: '',
                        loadChildren: () =>
                            import('../weather_type/weather_type.module').then(m => m.WeatherTypePageModule)
                    }
                ]
            },
            {
                path: 'mine',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../mine/mine.module').then(m => m.MinePageModule)
                    }
                ]
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
