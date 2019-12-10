import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events, AlertController } from '@ionic/angular';
import { Helper } from '../providers/Helper';
import { NativeService } from '../providers/NativeService';
import {MineService  } from '../services/mine.service';
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

    }

    ngOnInit() {
        // this.storage.get('loginmsg').then(loginmsg => {
        //     if (loginmsg != null) {
        //         this.userInfo.id = loginmsg.id;
        //         this.userInfo.account = loginmsg.account;
        //         this.userInfo.userName = loginmsg.userName;
        //     }
        // });
    }

    changePassword() {
        // this.router.navigate(['home/mine/modify-password']);
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
                    this.storage.remove('loginmsg');
                    this.router.navigate(['login']);
                }
            }]
        }).then(alert => {
            alert.present();
        });
    }


}

