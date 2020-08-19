import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from '../providers/Utils';
import { NativeService } from '../providers/NativeService';
import { Helper } from '../providers/Helper';
import { HttpService } from '../providers/HttpService';
import { GlobalData } from '../providers/GlobalData';
import { MonitorService } from '../services/monitor.service';
import * as echarts from 'echarts';

@Component({
    selector: 'app-monitor',
    templateUrl: './monitor_autosite.component.html',
    styleUrls: ['./monitor_autosite.component.scss'],
    // providers: [RainService, Utils]
})

export class MonitorautositePage implements OnInit {
    station_info = {
        station_name: "",
        station_code: "",
    }
    autositeData:any = [];
    constructor(
        public helper: Helper,
        public route: ActivatedRoute,
        public router: Router,
        public service: MonitorService) {

    }
    ngOnInit() {
        this.route.queryParams.subscribe((data) => {
            console.log("Params:", data);
            this.station_info.station_name = data.stationName;
            this.station_info.station_code = data.stationCode;
            this.getAutositeData();
        });
    }
    ngOnDestroy() {
    }
    getAutositeData() {
        this.service.getLastAutosite().subscribe(res => {
            // console.log(res);
            if (res.isSuccess) {
                this.autositeData = res.data;
                console.log("autositeData:",this.autositeData);
            }
            else {
                this.helper.toast('没有自动站数据信息，请联系管理员！', 2000, 'bottom');
                this.helper.hideLoading();
                return;
            }
        }, () => {
            this.helper.toast('自动站数据错误，请联系管理员！', 2000, 'bottom');
            this.helper.hideLoading();
            return;
        });
    }

    viewList() {
        // this.nav.back();
        this.router.navigate(['/home/monitor'], {
            queryParams: {
            }
        });
    }
}