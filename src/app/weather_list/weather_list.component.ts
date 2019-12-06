import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Utils } from '../providers/Utils';
import { NativeService } from '../providers/NativeService';
import { Helper } from '../providers/Helper';
import { GlobalData } from '../providers/GlobalData';
import { Events, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { WeatherService } from '../services/wather.service';

@Component({
    selector: 'app-weather-list',
    templateUrl: './weather_list.component.html',
    styleUrls: ['./weather_list.component.scss'],
    // providers: [RainService, Utils]
})

export class WeatherListPage implements OnInit {
    userInfo = {
        companyId: '',
    };
    weatherList: any = [];
    typeId = 1;
    title: string = "";
    constructor(public route: ActivatedRoute,
        public nav: NavController,
        public service: WeatherService,
        public storage: Storage) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe((data) => {
            console.log("Params:", data);
            this.typeId = data.typeId;
        })
        this.resetTitle();
        // console.log("navParams:",NavParams);
        // this.typeId = this.navParams.data.typeId;      
        // this.storage.get('loginmsg').then(loginmsg => {
        //     if (loginmsg != null) {
        //         console.log("loginmsg:",loginmsg);
        //         console.log("CompanyID:",loginmsg.companyId);
        //         this.userInfo.companyId = loginmsg.companyId;
        //     }
        //    // this.getWeathers();
        // });
    }

    resetTitle() {
        console.log("old Title:",this.title,this.typeId);
        switch (Number(this.typeId)) {
            case 1:
                this.title = "短期天气预报";
                break;
            case 2:
                this.title = "旬天气预报";
                break;
            case 3:
                this.title = "月天气预报";
                break;
            case 4:
                this.title = "季天气预报";
                break;
            case 5:
                this.title = "年天气预报";
                break;
            case 6:
                this.title = "月气候评估";
                break;
            default:
                this.title = "短期天气预报";
                break;
        }
        console.log("new Title:",this.title,this.typeId);
    }

    getWeathers() {
        this.service.getLastWeather(this.typeId, this.userInfo.companyId).subscribe(res => {
            if (res.isSuccess && res.total > 0) {
                this.weatherList = res.data;
            }
            else if (res.isSuccess && res.total == 0) {

            }
            else {

            }
        }, () => {

        });
    }

    viewOther() {
        this.nav.navigateRoot('/home/main');
    }
}