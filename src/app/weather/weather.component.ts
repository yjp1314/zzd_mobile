import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
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
    listType = 0;
    title = "";
    loading = false;

    constructor(public sanitizer: DomSanitizer,
        public route: ActivatedRoute,
        public events: Events,
        public nav: NavController,
        public router:Router,
        public helper: Helper,
        public service: WeatherService,
        public storage: Storage) {
        this.userInfo.companyId = localStorage.getItem("companyid");
    }

    ngOnInit() {
        this.route.queryParams.subscribe((data) => {
            console.log("Params:", data);
            this.weatherInfo.id = data.weatherId;
            console.log("weatherInfo.id:", this.weatherInfo.id);
            if (this.weatherInfo.id > 0) {
                this.getWeather();
            }
        });
        // this.storage.get('loginmsg').then(loginmsg => {
        //     if (loginmsg != null) {
        //         console.log("loginmsg:", loginmsg);
        //         console.log("CompanyID:", loginmsg.companyId);
        //         this.userInfo.companyId = loginmsg.companyId;
        //     }

        //     if (this.weatherInfo.id == null) {
        //         this.getlastWeather();
        //     }
        // });
    }
    getWeather() {
        this.listType = 0;
        this.helper.showLoading();
        this.service.getWeather(this.weatherInfo.id).subscribe(res => {
            if (res.isSuccess) {
                let weather = res.data;
                this.weatherInfo.companyId = weather.companyId;
                this.weatherInfo.type = weather.type;
                this.weatherInfo.id = weather.id;
                this.weatherInfo.title = weather.title;
                this.weatherInfo.content = weather.content;
                console.log("weatherInfo", this.weatherInfo);
                this.resetType();
                this.listType = weather.type;
                this.helper.hideLoading();
            }
            else {
                this.helper.toast('没有天气预报信息，请联系管理员！', 2000, 'bottom');
                this.helper.hideLoading();
                return;
            }
        }, () => {
            this.helper.toast('天气预报信息获取错误，请联系管理员！', 2000, 'bottom');
            this.helper.hideLoading();
            return;
        });
    };
    getlastWeather() {
        this.listType = 0;
        this.helper.showLoading();
        this.service.getLastWeather(this.weatherInfo.type, this.userInfo.companyId).subscribe(res => {
            if (res.isSuccess && res.total > 0) {
                let weather = res.data[0];
                this.weatherInfo.companyId = weather.companyId;
                this.weatherInfo.type = weather.type;
                this.weatherInfo.id = weather.id;
                this.weatherInfo.title = weather.title;
                this.weatherInfo.content = weather.content;
                console.log("weatherInfo", this.weatherInfo);
                this.resetType();
                this.helper.hideLoading();
            }
            else {
                this.helper.toast('没有天气预报信息，请联系管理员！', 2000, 'bottom');
                this.helper.hideLoading();
                return;
            }
        }, () => {
            this.helper.toast('天气预报信息获取错误，请联系管理员！', 2000, 'bottom');
            this.helper.hideLoading();
            return;
        });
    }


    resetType() {
        switch (Number(this.weatherInfo.type)) {
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
    }

    viewOther() {
        // this.nav.navigateRoot('/home/weather/type');
        // this.events.publish('jumpTo', 'WeatherTypePage', { id: 11 });
        // this.nav.navigateForward('/home/weather/type');
        this.router.navigate(['/home/weather/type']);
    }

    viewList() {
        // this.nav.navigateForward('/home/weather/list');
        // this.nav.navigateForward(['/home/weather/list'], {
        //     queryParams: {
        //         typeId: this.listType
        //     }
        // });
        this.router.navigate(['/home/weather/list'], {
            queryParams: {
                typeId: this.listType
            }
        });
    }

    assembleHTML(strHTML: any) {
        return this.sanitizer.bypassSecurityTrustHtml(strHTML);
    }
}