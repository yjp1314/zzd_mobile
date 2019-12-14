import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { NativeService } from './providers/NativeService';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Helper } from './providers/Helper';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public nav: NavController,
    public router: Router,
    public helper: Helper,
    public native: NativeService,
    private uniqueDeviceID: UniqueDeviceID,
    private uid: Uid,
    private androidPermissions: AndroidPermissions

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.nav.navigateRoot('/login');
      this.native.setStatusBarStyle();
      this.native.hideSplashScreen();
    });
  }
}
