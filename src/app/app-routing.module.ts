import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  // },
  {
    path: 'home',
    component: TabsPage,
    children: [
      {
        path: 'main',
        loadChildren: () =>
          import('./main/main.module').then(m => m.MainPageModule)
      },
      {
        path: 'monitor',
        loadChildren: () =>
          import('./monitor/monitor.module').then(m => m.MonitorPageModule)
      },
      {
        path: 'weather',
        loadChildren: () =>
          import('./weather_type/weather_type.module').then(m => m.WeatherTypePageModule)
      },
      {
        path: 'mine',
        loadChildren: () =>
          import('./mine/mine.module').then(m => m.MinePageModule)
      },
      {
        path: '',
        redirectTo: '/home/main',
        pathMatch: 'full'
      }
    ]
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
