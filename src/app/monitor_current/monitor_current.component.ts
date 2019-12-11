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
    templateUrl: './monitor_current.component.html',
    styleUrls: ['./monitor_current.component.scss'],
    // providers: [RainService, Utils]
})

export class MonitorCurrentPage implements OnInit {
    station_info = {
        station_name: "",
        equipment_id: "",
    }
    ec: any = echarts;
    chartSeaCurrentOption: any;
    seaCurrent: any;
    seaCurrentValue = 0;
    currentDeep = "2";
    currentChart:any;

    constructor(
        public route: ActivatedRoute) {

    }
    ngOnInit() {
        this.route.queryParams.subscribe((data) => {
            console.log("Params:", data);
            this.station_info.station_name = data.stationName;
            this.station_info.equipment_id = data.stationCode;
        });
        this.currentChart = this.ec.init(document.getElementById('currentChart'))
        this.getSeaCurrentData();
        this.refreshChart();
    }

    getSeaCurrentData() {
        //模拟数据
        this.seaCurrent = { t2: 138, t6: 136, t16: 115, t12: 135, t30: 120 };
        this.generateSeaCurrentChart();
    }

    generateSeaCurrentChart() {
        // this.CurrentChart = this.ec.init(document.getElementById('CurrentChart'))
        this.chartSeaCurrentOption = {
            tooltip: {
                formatter: "{a} <br/>{b} : {c}m/s"
            },
            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: '洋流速度',
                    type: 'gauge',
                    min: 0,
                    max: 360,
                    detail: { formatter: '{value}m/s' },
                    data: [{ value: this.seaCurrentValue, name: '洋流' }]
                }
            ]
        };
    }
    refreshChart() {
        if (this.seaCurrent == null) {
            this.seaCurrentValue = 0;
        }
        else {console.log("currentDeep:",this.currentDeep);
            switch (this.currentDeep) {
                case "2":
                    this.seaCurrentValue = this.seaCurrent.t2;
                    break;
                case "6":
                    this.seaCurrentValue = this.seaCurrent.t6;
                    break;
                case "12":
                    this.seaCurrentValue = this.seaCurrent.t12;
                    break;
                case "16":
                    this.seaCurrentValue = this.seaCurrent.t16;
                    break;
                case "30":
                    this.seaCurrentValue = this.seaCurrent.t30;
                    break;
                default:
                    this.seaCurrentValue = 0;
                    break;
            }
        }
        console.log("seaCurrentValue:",this.seaCurrentValue);
        this.chartSeaCurrentOption.series[0].data[0].value = this.seaCurrentValue;
        this.currentChart.setOption(this.chartSeaCurrentOption, true);
    }
    segmentChanged(ev: any) {
        console.log('Segment changed', ev);
        if (ev.detail.value === "") return;
        this.currentDeep = ev.detail.value;
        this.refreshChart();
    }
}