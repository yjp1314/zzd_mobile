import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Utils } from '../providers/Utils';
import { NativeService } from '../providers/NativeService';
import { Helper } from '../providers/Helper';
import { HttpService } from '../providers/HttpService';
import { GlobalData } from '../providers/GlobalData';
import { MonitorService } from '../services/monitor.service';
import { NavController } from '@ionic/angular';
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
        station_code: "",
        east_longitude: "122.803",
        northern_latitude: "39.063",
    }
    ec: any = echarts;
    temperatureChart: any;
    chartSeaTemperatureOption: any;
    chartTemperatureOption: any;
    seaTemperature = [];
    temperatureDay = [];
    temperatureMonth = [];
    interval: any;

    constructor(
        public helper: Helper,
        public service: MonitorService,
        public route: ActivatedRoute,
        public nav: NavController
        ) {

    }
    ngOnInit() {
        this.route.queryParams.subscribe((data) => {
            console.log("Params:", data);
            this.station_info.station_name = data.stationName;
            this.station_info.station_code = data.stationCode;
        });
        let that = this;
        that.getSeaTemperatureData();
        this.getTemperatureData();
        this.interval = setInterval(function () {
            console.log("TEST TIME:", new Date());
            that.getSeaTemperatureData();
        }, 1000 * 60 * 5);//
    }

    ngOnDestroy(){
        this.ec = null;
        this.temperatureChart = null;
        this.chartSeaTemperatureOption = null;
        this.chartTemperatureOption = null;
        this.seaTemperature = [];
        this.temperatureDay = [];
        this.temperatureMonth = [];
        clearInterval(this.interval);
    }

    getSeaTemperatureData() {
        let now = new Date();
        let today = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        this.service.getSeaTemperature(this.station_info.station_code, today).subscribe(res => {
            console.log(res);
            if (res.isSuccess) {
                this.seaTemperature = res.data;
                this.generateSeaTemperatureChart();
            }
            else {
                this.helper.toast('没有海水温度信息，请联系管理员！', 2000, 'bottom');
                this.helper.hideLoading();
                return;
            }
        }, () => {
            this.helper.toast('海水温度信息获取错误，请联系管理员！', 2000, 'bottom');
            this.helper.hideLoading();
            return;
        });
        //模拟数据
        // this.seaTemperature = [{ time: '00:00', t3: 138, t6: 136, t9: 115, t12: 135, t20: 120 },
        // { time: '02:00', t3: 138, t6: 136, t9: 120, t12: 135, t20: 120 },
        // { time: '04:00', t3: 120, t6: 115, t9: 122, t12: 138, t20: 122 },
        // { time: '06:00', t3: 115, t6: 110, t9: 125, t12: 129, t20: 118 },
        // { time: '08:00', t3: 118, t6: 122, t9: 127, t12: 125, t20: 112 },
        // { time: '10:00', t3: 110, t6: 117, t9: 130, t12: 122, t20: 105 },
        // { time: '12:00', t3: 125, t6: 136, t9: 124, t12: 118, t20: 116 },
        // { time: '14:00', t3: 130, t6: 105, t9: 122, t12: 128, t20: 118 },
        // { time: '16:00', t3: 140, t6: 120, t9: 118, t12: 111, t20: 124 },
        // { time: '18:00', t3: 138, t6: 127, t9: 108, t12: 105, t20: 130 },
        // { time: '20:00', t3: 128, t6: 130, t9: 122, t12: 114, t20: 138 },
        // { time: '22:00', t3: 120, t6: 134, t9: 124, t12: 120, t20: 140 }];

        // this.generateSeaTemperatureChart();
    }
    getTemperatureData() {
        this.temperatureDay = [{ time: '00:00', t: 28 },
        { time: '02:00', t: 28 },
        { time: '04:00', t: 25.5 },
        { time: '06:00', t: 21.8 },
        { time: '08:00', t: 22.3 },
        { time: '10:00', t: 20.4 },
        { time: '12:00', t: 18.9 },
        { time: '14:00', t: 20.1 },
        { time: '16:00', t: 25.1 },
        { time: '18:00', t: 28.2 },
        { time: '20:00', t: 26.5 },
        { time: '22:00', t: 25.4 }];
        this.temperatureMonth = [{ date: '12-01', t: 28.1 },
        { date: '12-02', t: 28 },
        { date: '12-03', t: 20.9 },
        { date: '12-04', t: 25.4 },
        { date: '12-05', t: 26 },
        { date: '12-06', t: 20.7 },
        { date: '12-07', t: 25.1 },
        { date: '12-08', t: 20.8 },
        { date: '12-09', t: 20.5 },
        { date: '12-10', t: 28.5 },
        { date: '12-11', t: 28.2 },
        { date: '12-12', t: 20.9 },
        { date: '12-13', t: 25.5 },
        { date: '12-14', t: 25.9 },
        { date: '12-15', t: 28 },
        { date: '12-16', t: 20.4 },
        { date: '12-17', t: 25.3 },
        { date: '12-18', t: 20.8 },
        { date: '12-19', t: 20.7 },
        { date: '12-20', t: 28 },
        { date: '12-21', t: 26.4 },
        { date: '12-22', t: 20.6 },
        { date: '12-23', t: 25.8 },
        { date: '12-24', t: 25.6 },
        { date: '12-25', t: 28.2 },
        { date: '12-26', t: 20.9 },
        { date: '12-27', t: 25.4 },
        { date: '12-28', t: 20.9 },
        { date: '12-29', t: 20.7 },
        { date: '12-30', t: 28.1 },
        { date: '12-31', t: 28.0 }];
        this.generateTemperatureChart()
    }
    generateTemperatureChart() {
        let tempertatureDayTime = this.temperatureDay.map(function (item) {
            return item.time;
        });
        let tempertatureDayValue = this.temperatureDay.map(function (item) {
            return item.t;
        });
        let tempertatureMonthDate = this.temperatureMonth.map(function (item) {
            return item.date;
        });
        let tempertatureMonthValue = this.temperatureMonth.map(function (item) {
            return item.t;
        });
        this.chartTemperatureOption = {
            // Make gradient line here
            visualMap: [{
                show: false,
                type: 'continuous',
                seriesIndex: 0
            }, {
                show: false,
                type: 'continuous',
                seriesIndex: 1,
                dimension: 0
            }],
            title: [{
                left: 'center',
                text: '当日气温变化曲线'
            }, {
                top: '55%',
                left: 'center',
                text: '当月气温变化曲线'
            }],
            tooltip: {
                trigger: 'axis'
            },
            xAxis: [{
                data: tempertatureDayTime
            }, {
                data: tempertatureMonthDate,
                gridIndex: 1
            }],
            yAxis: [{
                scale: true,
                splitLine: { show: false }
            }, {
                scale: true,
                splitLine: { show: false },
                gridIndex: 1
            }],
            grid: [{
                bottom: '60%'
            }, {
                top: '60%'
            }],
            series: [{
                type: 'line',
                showSymbol: false,
                data: tempertatureDayValue
            }, {
                type: 'line',
                showSymbol: false,
                data: tempertatureMonthValue,
                xAxisIndex: 1,
                yAxisIndex: 1
            }]
        };
    }
    generateSeaTemperatureChart() {
        let seaTemparatureTime = this.seaTemperature.map(function (item) {
            let tc = new Date(item.time);
            let hours = (tc.getHours() > 9) ? tc.getHours() : "0" + tc.getHours();
            let minutes = (tc.getMinutes() > 9) ? tc.getMinutes() : "0" + tc.getMinutes();
            return hours + ":" + minutes;
        });
        let seaTemparature3 = this.seaTemperature.map(function (item) {
            return (item.t3);
        });
        let seaTemparature6 = this.seaTemperature.map(function (item) {
            return (item.t6);
        });
        let seaTemparature9 = this.seaTemperature.map(function (item) {
            return (item.t9);
        });
        let seaTemparature12 = this.seaTemperature.map(function (item) {
            return (item.t12);
        });
        let seaTemparature20 = this.seaTemperature.map(function (item) {
            return (item.t20);
        });
        let tempSort3 = seaTemparature3.sort((n1, n2) => n1 - n2); console.log("tempSort3:", tempSort3);
        let tempSort6 = seaTemparature6.sort((n1, n2) => n1 - n2); console.log("tempSort6:", tempSort6);
        let tempSort9 = seaTemparature9.sort((n1, n2) => n1 - n2); console.log("tempSort9:", tempSort9);
        let tempSort12 = seaTemparature12.sort((n1, n2) => n1 - n2); console.log("tempSort12:", tempSort12);
        let tempSort20 = seaTemparature20.sort((n1, n2) => n1 - n2); console.log("tempSort20:", tempSort20);

        let tempMin: number[] = [];// = [tempSort3[0] / 1.0, tempSort6[0] / 1.0, tempSort9[0] / 1.0, tempSort12[0] / 1.0, tempSort20[0] / 1.0]; console.log("tempMin:", tempMin);
        let tempMax: number[] = [];// = [tempSort3[tempSort3.length - 1] / 1.0, tempSort6[tempSort6.length - 1] / 1.0, tempSort9[tempSort9.length - 1] / 1.0, tempSort12[tempSort12.length - 1] / 1.0, tempSort20[tempSort20.length - 1] / 1.0];
        //console.log("tempMax:", tempMax);
        if ((tempSort3[0])) tempMin.push(tempSort3[0]);
        if ((tempSort6[0])) tempMin.push(tempSort6[0]);
        if ((tempSort9[0])) tempMin.push(tempSort9[0]);
        if ((tempSort12[0])) tempMin.push(tempSort12[0]);
        if ((tempSort20[0])) tempMin.push(tempSort20[0]);
        if ((tempSort3[tempSort3.length - 1])) tempMax.push(tempSort3[tempSort3.length - 1]);
        if ((tempSort6[tempSort6.length - 1])) tempMax.push(tempSort6[tempSort6.length - 1]);
        if ((tempSort9[tempSort9.length - 1])) tempMax.push(tempSort9[tempSort9.length - 1]);
        if ((tempSort12[tempSort12.length - 1])) tempMax.push(tempSort12[tempSort12.length - 1]);
        if ((tempSort20[tempSort20.length - 1])) tempMax.push(tempSort20[tempSort20.length - 1]);
        let tempMinSort = tempMin.sort((n1, n2) => n1 - n2); console.log("tempMinSort:", tempMinSort, tempMinSort[0]);
        let tempMaxSort = tempMax.sort((n1, n2) => n1 - n2); console.log("tempMaxSort:", tempMaxSort, tempMaxSort[tempMaxSort.length - 1]);

        // let tempTime = (new Date()).getTime();
        // let tempCount = 0;
        // this.seaTemperature.forEach((element) => {
        //     seaTemparature3.push({ name: new Date(tempCount * 2 * 60 * 60 * 1000 + tempTime), value: element.t3 });
        //     seaTemparature6.push({ name:  new Date(tempCount * 2 * 60 * 60 * 1000 + tempTime), value: element.t6 });
        //     seaTemparature9.push({ name:  new Date(tempCount * 2 * 60 * 60 * 1000 + tempTime), value: element.t9 });
        //     seaTemparature12.push({ name:  new Date(tempCount * 2 * 60 * 60 * 1000 + tempTime), value: element.t12 });
        //     seaTemparature20.push({ name:  new Date(tempCount * 2 * 60 * 60 * 1000 + tempTime), value: element.t20 });
        //     tempCount++;
        // }
        // );
        console.log("seaTemparature3:", seaTemparature3);
        console.log("seaTemparature20:", seaTemparature20);
        // this.temperatureChart = this.ec.init(document.getElementById('temperatureChart'))
        this.chartSeaTemperatureOption = {
            title: {
                text: '海水温度变化图',
                x:'center',
                y: 'top',
                padding: 5,
            },
            tooltip: {
                trigger: 'axis',
                // formatter: function (params) {
                //     params = params[0];
                //     var date = new Date(params.name);
                //     return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
                // },
                // axisPointer: {
                //     animation: false
                // }
            },
            legend: {
                orient: 'horizontal',
                // right: '20%',
                data: ['3m', '6m', '9m', '12m', '20m'],
                y:"bottom"
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: seaTemparatureTime,
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                scale: true,
                boundaryGap: [0, '100%'],
                min: tempMinSort[0] - 0.5,
                max: tempMaxSort[tempMaxSort.length - 1] + 0.5,
                minInterval: 0.1,
                splitNumber: 5, // (tempMaxSort[tempMaxSort.length -1] - tempMinSort[0])/0.5,
                splitLine: {
                    show: false
                }
            },
            series: [{
                name: '3m',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: seaTemparature3
            }, {
                name: '6m',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: seaTemparature6
            }, {
                name: '9m',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: seaTemparature9
            }, {
                name: '12m',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: seaTemparature12
            }, {
                name: '20m',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: seaTemparature20
            }]
        };
        // this.temperatureChart.setOption(this.chartOption);
    }
    viewList() {
        this.nav.back();
      }
}