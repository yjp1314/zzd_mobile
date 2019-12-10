import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Utils } from '../providers/Utils';
import { NativeService } from '../providers/NativeService';
import { Helper } from '../providers/Helper';
import { HttpService } from '../providers/HttpService';
import { GlobalData } from '../providers/GlobalData';
import { MonitorService } from '../services/monitor.service';
import * as echarts from 'echarts';

@Component({
    selector: 'app-monitor',
    templateUrl: './monitor_temperature.component.html',
    styleUrls: ['./monitor_temperature.component.scss'],
    // providers: [RainService, Utils]
})

export class MonitorTemperaturePage implements OnInit {
    station_info = {
        station_name: "",
        east_longitude: "",
        northern_latitude: "",
    }
    ec: any = echarts;
    temperatureChart:any;
    chartOption: any;

    constructor(
        public route: ActivatedRoute) {

    }
    ngOnInit() {
        this.route.queryParams.subscribe((data) => {
            console.log("Params:", data);
            this.station_info.station_name = data.station_name;
        });

    }

    generateTemperatureChart(){
        
        this.temperatureChart = this.ec.init(document.getElementById('temperatureChart'))
        this.chartOption = {            
        };        
        this.temperatureChart.setOption(this.chartOption);
    }
}