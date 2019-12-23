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
    this.getPermission();
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.nav.navigateRoot('/login');
      this.native.setStatusBarStyle();
      this.native.hideSplashScreen();
    });
  }

  getPermission() {
    this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    ).then(res => {
      if (res.hasPermission) {

      } else {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(res => {
          // alert("Persmission Granted Please Restart App!");
          this.helper.toast('请赋予访问本机设备号的权限！', 2000, 'bottom');
        }).catch(error => {
          this.helper.toast('请赋予访问本机设备号的权限！', 2000, 'bottom');
        });
      }
    }).catch(error => {
      this.helper.toast('请赋予访问本机设备号的权限！', 2000, 'bottom');
    });
  }
}
