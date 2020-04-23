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
    imeiCode: '' //865547047765809
  };
  constructor(
    public router: Router,
    public helper: Helper,
    public htttp: HttpService,
    public auth: AuthService,
    public storage: Storage,
    private uid: Uid,
    private androidPermissions: AndroidPermissions) {

  }

  ngOnInit() {
 
    setTimeout(() => {
      if (localStorage.getItem('imeiCode') && localStorage.getItem('account') && localStorage.getItem('password')) {
        this.model.imeiCode = localStorage.getItem('imeiCode');
        this.model.account = localStorage.getItem('account');
        this.model.password = localStorage.getItem('password');
        this.helper.toast('自动登录中！', 1000, 'bottom');
        this.autoLogin(localStorage.getItem('imeiCode'), localStorage.getItem('account'), localStorage.getItem('password'));
      }
      else {
        this.model.imeiCode = this.uid.IMEI;
        if (!this.model.imeiCode) {
          this.helper.toast('请赋予访问本机设备号的权限或输入IMEI码！', 2000, 'bottom');
        }
      }
    }, 1000);


  }


  autoLogin(code, account, password) {
    this.auth.login(account, password, code).subscribe(res => {
      console.log(res.isSuccess)
      if (res.isSuccess) {
        this.savaLoginData(res);
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/home/main']);
        }, 1000);
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
    this.auth.login(this.model.account, this.model.password, this.model.imeiCode).subscribe(res => {
      if (res.isSuccess) {
        this.savaLoginData(res);
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
  savaLoginData(res) {
    localStorage.setItem("id", res.data[0].id);
    localStorage.setItem("account", this.model.account);
    localStorage.setItem("password", this.model.password);
    localStorage.setItem("userName", res.data[0].userName);
    localStorage.setItem("companyid", res.data[0].companyId);
    localStorage.setItem("equips", res.data[0].equipments);
    localStorage.setItem("imeiCode", res.data[0].imeiCode);
  }
}
