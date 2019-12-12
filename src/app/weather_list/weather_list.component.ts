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
    pageSize = 10;
    currentPageNumber = 1;
    loading = false;
    hasMore = true;

    constructor(public route: ActivatedRoute,
        public nav: NavController,
        public helper: Helper,
        public service: WeatherService,
        public storage: Storage) {
        this.userInfo.companyId = localStorage.getItem("companyid");
    }

    ngOnInit() {
        this.route.queryParams.subscribe((data) => {
            console.log("Params:", data);
            this.typeId = data.typeId;
            this.resetTitle();
        });
        this.getWeathers();
    }

    resetTitle() {
        console.log("old Title:", this.title, this.typeId);
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
        console.log("new Title:", this.title, this.typeId);
    }

    getWeathers(e = null) {
        this.helper.showLoading();
        this.service.getWeathersByType(this.typeId, this.userInfo.companyId, this.currentPageNumber, this.pageSize).subscribe(res => {
            if (res.isSuccess && res.total > 0) {
                this.weatherList = this.weatherList.concat(res.data);
                if (res.total < this.pageSize) {
                    this.hasMore = false;
                }
            }
            else if (res.isSuccess && res.total == 0) {
                this.helper.toast('没有' + this.title + '预报信息，请联系管理员！', 2000, 'bottom');
                return;

            }
            else {
                this.helper.toast('没有' + this.title + '预报信息，请联系管理员！', 2000, 'bottom');
                return;

            }
            e ? e.target.complete() : "";
            this.helper.hideLoading();
        }, () => {
            e ? e.target.complete() : "";
            this.helper.hideLoading();

        });
    }

    viewDetail(weatherId) {
        this.nav.navigateRoot(['/home/weather/detail'], {
            queryParams: {
                weatherId: weatherId
            }
        });
    }

    loadData(e) {
        if (!this.hasMore) { return; }
        this.currentPageNumber++;
        this.getWeathers(e);
    }

    goBack() {
        this.nav.navigateBack("/home/weather");
    }
}