import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { mergeMap, timeout } from 'rxjs/operators';
// import { Storage } from '../../providers/Storage';
import { Helper } from '../providers/Helper';
import { NavController } from '@ionic/angular';
import { HttpService } from '../providers/HttpService';
import { Storage } from '@ionic/storage';
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
        imeiCode: '147852963789456'
    };
    constructor(public nav: NavController,
        public helper: Helper,
        public htttp: HttpService,
        public auth: AuthService,
        public storage: Storage) {
    }

    ngOnInit() {

    }

    autoLogin() {
        this.auth.login(this.model.account, this.model.password, this.model.imeiCode).subscribe(res => {
            console.log(res.isSuccess)
            if (res.isSuccess) {
                this.storage.set('loginmsg', { 'account': this.model.account, 'password': this.model.password, 'imeiCode': this.model.imeiCode });
                this.loading = false;
                setTimeout(() => {
                    this.nav.navigateRoot('/home/main');
                }, 1000);
            } else {
                this.loading = false;
                this.helper.toast('手机号或密码错误,请重试！', 2000, 'bottom');
                return;
            }
        }, () => {
            this.loading = false;
            this.helper.toast('系统错误,请联系管理员！', 2000, 'bottom');
            return;
        });
    }
    formSubmit() {
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
                this.storage.set('loginmsg', {
                    'id': res.data[0].id,
                    'account': this.model.account,
                    'password': this.model.password,
                    'userName': res.data[0].userName,
                    'companyId': res.data[0].companyId,
                    'userType': res.data[0].userType,
                    'imeiCode': res.data[0].imeiCode
                });
                this.loading = false;
                this.nav.navigateRoot('/home/main');
            } else {
                this.loading = false;
                this.helper.toast('手机号或密码错误,请重试！', 2000, 'bottom');
                return;
            }
        }, () => {
            this.loading = false;
            this.helper.toast('系统错误,请联系管理员！', 2000, 'bottom');
            return;
        });
    }
}
