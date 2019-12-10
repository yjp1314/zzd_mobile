import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Utils } from '../providers/Utils';
import { NativeService } from '../providers/NativeService';
import { Helper } from '../providers/Helper';
import { GlobalData } from '../providers/GlobalData';
import { Events, NavParams, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { WeatherService } from '../services/wather.service';

@Component({
    selector: 'app-weather-type',
    templateUrl: './weather_type.component.html',
    styleUrls: ['./weather_type.component.scss'],
    // providers: [RainService, Utils]
})

export class WeatherTypePage implements OnInit {
    userInfo = {
        companyId: '',
    };
    weatherInfo = {
        title: "",
        type: 1,
        companyId: 1,
        content: "",
        id: 3
    };
    type = 1;

    constructor(
        public events: Events,
        public nav: NavController,
        public service: WeatherService,
        public storage: Storage) {
    }

    ngOnInit() {
        this.storage.get('loginmsg').then(loginmsg => {
            if (loginmsg != null) {
                console.log("loginmsg:", loginmsg);
                console.log("CompanyID:", loginmsg.companyId);
                this.userInfo.companyId = loginmsg.companyId;
            }
            // this.getlastWeather();
        });
    }

    viewList(typeId) {
        // this.nav.navigateForward('/home/weather/list');
        this.nav.navigateForward(['/home/weather/list'], {
            queryParams: {
                typeId: typeId
            }
        });
    }

    goBack(){
        this.nav.navigateRoot("/home/weather");
    }
}