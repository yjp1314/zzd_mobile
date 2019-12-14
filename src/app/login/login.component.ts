import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { mergeMap, timeout } from 'rxjs/operators';
import { Helper } from '../providers/Helper';
import { HttpService } from '../providers/HttpService';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginPage implements OnInit {
  showBackButton = false;
  loading = false;
  model = {
    account: '',
    password: '',
    imeiCode: ''
  };
  constructor(
    public router: Router,
    public helper: Helper,
    public htttp: HttpService,
    public auth: AuthService,
    public storage: Storage,
    private uid: Uid,
    private androidPermissions: AndroidPermissions) {
    this.getPermission();
  }

  ngOnInit() {
    setTimeout(() => {
      this.model.imeiCode = this.uid.IMEI;
    }, 1000);

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
          // alert("Error! "+error);
        });
      }
    }).catch(error => {
      // alert("Error! "+error);
    });

  }

  // autoLogin() {
  //     this.auth.login(this.model.account, this.model.password, this.model.imeiCode).subscribe(res => {
  //         console.log(res.isSuccess)
  //         if (res.isSuccess) {
  //             this.storage.set('loginmsg', { 'account': this.model.account, 'password': this.model.password, 'imeiCode': this.model.imeiCode });
  //             this.loading = false;
  //             setTimeout(() => {
  //                 this.nav.navigateRoot('/home/main');
  //             }, 1000);
  //         } else {
  //             this.loading = false;
  //             this.helper.toast('手机号或密码错误,请重试！', 2000, 'bottom');
  //             return;
  //         }
  //     }, () => {
  //         this.loading = false;
  //         this.helper.toast('系统错误,请联系管理员！', 2000, 'bottom');
  //         return;
  //     });
  // }
  formSubmit() {
    // alert(this.uid.IMEI);
    // return;
    if (this.model.account.length === 0) {
      this.helper.toast('手机号不能为空！', 2000, 'bottom');
      return;
    }
    if (this.model.password.length === 0) {
      this.helper.toast('密码不能为空！', 2000, 'bottom');
      return;
    }
    this.loading = true;
    this.model.imeiCode = this.uid.IMEI;
    this.auth.login(this.model.account, this.model.password, this.model.imeiCode).subscribe(res => {
      if (res.isSuccess) {
        localStorage.setItem("id", res.data[0].id);
        localStorage.setItem("account", this.model.account);
        localStorage.setItem("password", this.model.password);
        localStorage.setItem("userName", res.data[0].userName);
        localStorage.setItem("companyid", res.data[0].companyId);
        localStorage.setItem("imeiCode", res.data[0].imeiCode);
        this.loading = false;
        this.router.navigate(['/home/main']);
      } else {
        this.loading = false;
        this.helper.toast(res.errorMessage, 2000, 'bottom');
        return;
      }
    }, () => {
      this.loading = false;
      this.helper.toast('系统错误,请联系管理员！', 2000, 'bottom');
      return;
    });
  }
}
