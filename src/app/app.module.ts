import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { Events, NavParams, NavController } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Network } from '@ionic-native/network/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { HttpClientModule } from '@angular/common/http';

import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';



@NgModule({
  declarations: [AppComponent
    // ,TabsPage,Tab1Page,Tab2Page,Tab3Page,DemoPage,MinePage
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    // IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicModule.forRoot({
      hardwareBackButton: true,
      rippleEffect: false,
      mode: 'ios',
      backButtonText: '返回',
      statusTap: true,
      swipeBackEnabled: true
    }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppVersion,
    SocialSharing,
    PhotoLibrary,
    InAppBrowser,
    Network,
    AppMinimize,
    UniqueDeviceID,
    Uid,
    AndroidPermissions,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
