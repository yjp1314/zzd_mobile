import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events, AlertController } from '@ionic/angular';
import { Helper } from '../providers/Helper';
import { NativeService } from '../providers/NativeService';
import { MineService } from '../services/mine.service';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-mine',
    templateUrl: './mine.component.html',
    styleUrls: ['./mine.component.scss'],
})
export class MinePage implements OnInit {
    userInfo = {
        id: '',
        userName: '',
        account: ''
    }


    constructor(public helper: Helper,
        public router: Router,
        public events: Events,
        public alertController: AlertController,
        public native: NativeService,
        public service: MineService,
        public storage: Storage
    ) {
        this.userInfo.id = localStorage.getItem("id");
        this.userInfo.account = localStorage.getItem("account");
        this.userInfo.userName = localStorage.getItem("userName");
    }

    ngOnInit() {
       
    }

    changePassword() {
        this.router.navigate(['/home/mine/change-password']);
    }

    loginOut() {
        this.alertController.create({
            header: '退出登录?',
            message: '您确定要退出应用程序么?',
            buttons: [{
                text: '取消',
                role: "cancle"
            },
            {
                text: '退出', handler: () => {
                    localStorage.removeItem("id"); 
                    localStorage.removeItem("account");
                    localStorage.removeItem("password");
                    localStorage.removeItem("userName");
                    localStorage.removeItem("companyid");
                    localStorage.removeItem("imeiCode");
                    this.router.navigate(['login']);
                }
            }]
        }).then(alert => {
            alert.present();
        });
    }


}

