import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Utils } from '../providers/Utils';
import { MainService } from '../services/main.service';
import { Storage } from '@ionic/storage';
import { PIC_FILE_PATH } from '../providers/constant';
import { Router } from '@angular/router';
@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    // providers: [RainService, Utils]
})

export class MainPage implements OnInit {
    userInfo = {
        companyId: '',
    }
    imgList = [];
    noticeList = [];
    weather = {
        context: ''
    }
    constructor(public service: MainService, public storage: Storage, public router: Router) {
        this.userInfo.companyId = localStorage.getItem("companyid");
    }
    ngOnInit() {

        // this.storage.get('loginmsg').then(loginmsg => {
        //     if (loginmsg != null) {
        //         this.userInfo.companyId = loginmsg.companyId;

        //     }
        // });
        this.bindNotice();
        this.bindPic();
        this.bindWeather();
    }

    bindNotice() {
        this.noticeList = [];
        const params = {
            companyId: this.userInfo.companyId,
            pageNumber: 1,
            pageSize: 10
        }
        this.service.getNotice(params).subscribe(res => {

            if (res.isSuccess) {
                this.noticeList = res.data;
            }
            else {
                this.noticeList = [];
            }
        })
    }

    bindPic() {
        this.imgList = [];
        const params = {
            companyId: this.userInfo.companyId,
            pageNumber: 1,
            pageSize: 3
        }
        this.service.getPictures(params).subscribe(res => {
            if (res.isSuccess) {
                res.data.forEach(element => {
                    element.imgUrl = element.imgUrl;
                });
                this.imgList = res.data;
            }
        })
    }
    bindWeather() {

    }

    viewDetail(item) {
        this.router.navigate(['/home/main/detail'], {
            queryParams: {
                id: item
            }
        });
    }
}