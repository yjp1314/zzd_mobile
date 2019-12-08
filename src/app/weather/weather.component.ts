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
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss'],
    // providers: [RainService, Utils]
})

export class WeatherPage implements OnInit {
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
    loading = false;

    constructor(public route: ActivatedRoute,
        public events: Events,
        public nav: NavController,
        public helper: Helper,
        public service: WeatherService,
        public storage: Storage) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe((data) => {
            console.log("Params:", data);
            this.weatherInfo.id = data.weatherId;
            console.log("weatherInfo.id:",this.weatherInfo.id);
            if (this.weatherInfo.id > 0) {
                this.getWeather();
            }
        });
        this.storage.get('loginmsg').then(loginmsg => {
            if (loginmsg != null) {
                console.log("loginmsg:", loginmsg);
                console.log("CompanyID:", loginmsg.companyId);
                this.userInfo.companyId = loginmsg.companyId;
            }
            
            if (this.weatherInfo.id == null ) {
                this.getlastWeather();
            }
        });
    }
    getWeather() {
        this.service.getWeather(this.weatherInfo.id).subscribe(res => {
            if (res.isSuccess) {
                let weather = res.data;
                this.weatherInfo.companyId = weather.companyId;
                this.weatherInfo.type = weather.type;
                this.weatherInfo.id = weather.id;
                this.weatherInfo.title = weather.title;
                this.weatherInfo.content = weather.content;
                console.log("weatherInfo", this.weatherInfo);
                this.loading = false;
            }
            else {
                this.loading = false;
                this.helper.toast('没有天气预报信息，请联系管理员！', 2000, 'bottom');
                return;
            }
        }, () => {
            this.loading = false;
            this.helper.toast('天气预报信息获取错误，请联系管理员！', 2000, 'bottom');
            return;
        });
    };
    getlastWeather() {
        this.service.getLastWeather(this.type, this.userInfo.companyId).subscribe(res => {
            if (res.isSuccess && res.total > 0) {
                let weather = res.data[0];
                this.weatherInfo.companyId = weather.companyId;
                this.weatherInfo.type = weather.type;
                this.weatherInfo.id = weather.id;
                this.weatherInfo.title = weather.title;
                this.weatherInfo.content = weather.content;
                console.log("weatherInfo", this.weatherInfo);
                this.loading = false;
            }
            else {
                this.loading = false;
                this.helper.toast('没有天气预报信息，请联系管理员！', 2000, 'bottom');
                return;
            }
        }, () => {
            this.loading = false;
            this.helper.toast('天气预报信息获取错误，请联系管理员！', 2000, 'bottom');
            return;
        });
    }

    viewOther() {
        // this.nav.navigateRoot('/home/weather/type');
        // this.events.publish('jumpTo', 'WeatherTypePage', { id: 11 });
        this.nav.navigateForward('/home/weather/type');
    }
}