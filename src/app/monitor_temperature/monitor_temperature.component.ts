import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    seaTides = [];
    currentSeaTemperature = { time: "", t3: "", t6: "", t9: "", t12: "", t20: "" }
    temperatureDay = [];
    temperatureMonth = [];
    temperatureShelf = { currentTa: "", maxTa: "", minTa: "", averageTa: "" };
    interval: any;
    publicDate: any;
    moonDate: any;
    CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
    madd = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

    cYear: any;
    cMonth: any;
    cDay: any;
    TheDate: any;
    tgString = "甲乙丙丁戊己庚辛壬癸";
    dzString = "子丑寅卯辰巳午未申酉戌亥";
    monString = "正二三四五六七八九十冬腊";
    numString = "一二三四五六七八九十";

    constructor(
        public helper: Helper,
        public service: MonitorService,
        public route: ActivatedRoute,
        public router: Router,
        public nav: NavController
    ) {
    }
    ngOnInit() {
        this.route.queryParams.subscribe((data) => {
            console.log("Params:", data);
            // console.log("11112222233333444445555566666");
            this.station_info.station_name = data.stationName;
            this.station_info.station_code = data.stationCode;
            this.getLocation();
            let that = this;
            // console.log("asasdfasdfasdfasdfasdf");
            that.getSeaTemperatureData();
            this.getTemperatureData();
            this.getTideData();
            this.interval = setInterval(function () {
                console.log("TEST TIME:", new Date());
                that.getSeaTemperatureData();
            }, 1000 * 60 * 5);//
        });
        let now = new Date();
        this.publicDate = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        this.moonDate = this.GetLunarDay(now.getFullYear(), (now.getMonth() + 1), now.getDate());//"asdf";
    }

    ngOnDestroy() {
        this.ec = null;
        this.temperatureChart = null;
        this.chartSeaTemperatureOption = null;
        this.chartTemperatureOption = null;
        this.seaTemperature = [];
        this.temperatureDay = [];
        this.temperatureMonth = [];
        clearInterval(this.interval);
    }
    GetBit(m, n) {
        return (m >> n) & 1;
    }
    e2c(solarYear, solarMonth, solarDay) {
        let TheDate = new Date(solarYear, solarMonth, solarDay);
        var total, m, n, k;
        var isEnd = false;
        var tmp = TheDate.getFullYear();
        total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + this.madd[TheDate.getMonth()] + TheDate.getDate() - 38;
        if (TheDate.getFullYear() % 4 == 0 && TheDate.getMonth() > 1) {
            total++;
        }
        for (m = 0; ; m++) {
            k = (this.CalendarData[m] < 0xfff) ? 11 : 12;
            for (n = k; n >= 0; n--) {
                if (total <= 29 + this.GetBit(this.CalendarData[m], n)) {
                    isEnd = true;
                    break;
                }
                total = total - 29 - this.GetBit(this.CalendarData[m], n);
            }
            if (isEnd) break;
        }
        this.cYear = 1921 + m;
        this.cMonth = k - n + 1;
        this.cDay = total;
        if (k == 12) {
            if (this.cMonth == Math.floor(this.CalendarData[m] / 0x10000) + 1) {
                this.cMonth = 1 - this.cMonth;
            }
            if (this.cMonth > Math.floor(this.CalendarData[m] / 0x10000) + 1) {
                this.cMonth--;
            }
        }
    }
    GetcDateString() {
        var tmp = "";
        // tmp += this.tgString.charAt((this.cYear - 4) % 10);
        // tmp += this.dzString.charAt((this.cYear - 4) % 12);
        // tmp += "年 ";
        if (this.cMonth < 1) {
            tmp += "(闰)";
            tmp += this.monString.charAt(- this.cMonth - 1);
        } else {
            tmp += this.monString.charAt(this.cMonth - 1);
        }
        tmp += "月";
        tmp += (this.cDay < 11) ? "初" : ((this.cDay < 20) ? "十" : ((this.cDay < 30) ? "廿" : "三十"));
        if (this.cDay % 10 != 0 || this.cDay == 10) {
            tmp += this.numString.charAt((this.cDay - 1) % 10);
        }
        return tmp;
    }
    GetLunarDay(solarYear, solarMonth, solarDay) {
        if (solarYear < 1921 || solarYear > 2020) {
            return "";
        } else {
            solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
            this.e2c(solarYear, solarMonth, solarDay);
            return this.GetcDateString();
        }
    }
    getLocation(){
        console.log(this.station_info);
        if(this.station_info.station_code == "Z0001"){            
            this.station_info.east_longitude= "122度48分11秒";
            this.station_info.northern_latitude= "39度03分47秒";
        }
        if(this.station_info.station_code == "Z0002"){            
            this.station_info.east_longitude= "122度43分17秒";
            this.station_info.northern_latitude= "39度00分38秒";
        }
        if(this.station_info.station_code == "Z0003"){            
            this.station_info.east_longitude= "122度50分54秒";
            this.station_info.northern_latitude= "39度04分29秒";
        }
        if(this.station_info.station_code == "Z0004"){            
            this.station_info.east_longitude= "122度44分32秒 ";
            this.station_info.northern_latitude= "39度02分35秒";
        }
        if(this.station_info.station_code == "Z0005"){            
            this.station_info.east_longitude= "122度42分06秒";
            this.station_info.northern_latitude= "39度02分02秒";
        }
        if(this.station_info.station_code == "Z0006"){            
            this.station_info.east_longitude= "122度49分42秒";
            this.station_info.northern_latitude= "39度02分19秒";
        }
        if(this.station_info.station_code == "Z0007"){            
            this.station_info.east_longitude= "122度50分53秒";
            this.station_info.northern_latitude= "39度03分36秒";
        }
        if(this.station_info.station_code == "Z0008"){            
            this.station_info.east_longitude= "123度13分59秒";
            this.station_info.northern_latitude= "39度06分0.6秒";
        }
        if(this.station_info.station_code == "Z0009"){            
            this.station_info.east_longitude= "122度48分44秒";
            this.station_info.northern_latitude= "39度02分04秒";
        }
        if(this.station_info.station_code == "Z0010"){            
            this.station_info.east_longitude= "122度48分24秒";
            this.station_info.northern_latitude= "39度04分55秒";
        }
    }
    getTideData() {
        let now = new Date();
        let publicDateFrom = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        this.seaTides = [];
        // let tomorrow = new Date(now.setDate(now.getDate()+1));
        // let publicDateTo = tomorrow.getFullYear() + "-" + (tomorrow.getMonth() + 1) + "-" + tomorrow.getDate();
        this.service.getTides("", publicDateFrom, publicDateFrom).subscribe(res => {
            // console.log(res);
            if (res.isSuccess) {
                this.seaTides = res.data;
            }
            else {
                this.helper.toast('没有潮汐信息，请联系管理员！', 2000, 'bottom');
                this.helper.hideLoading();
                return;
            }
        }, () => {
            this.helper.toast('没有潮汐信息，请联系管理员！', 2000, 'bottom');
            this.helper.hideLoading();
            return;
        });
    }
    clearSeaTemperatureChart() {
        this.currentSeaTemperature.time = "";
        this.currentSeaTemperature.t3 = "";
        this.currentSeaTemperature.t6 = "";
        this.currentSeaTemperature.t9 = "";
        this.currentSeaTemperature.t12 = "";
        this.currentSeaTemperature.t20 = "";
        this.generateSeaTemperatureChart();
    }
    getSeaTemperatureData() {
        let now = new Date();
        let today = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        this.seaTemperature = [];
        this.clearSeaTemperatureChart()
        this.service.getSeaTemperature(this.station_info.station_code, today).subscribe(res => {
            // console.log(res);
            if (res.isSuccess) {
                this.seaTemperature = res.data;
                let tc = new Date(this.seaTemperature[this.seaTemperature.length - 1].time);
                let hours = (tc.getHours() > 9) ? tc.getHours() : "0" + tc.getHours();
                let minutes = (tc.getMinutes() > 9) ? tc.getMinutes() : "0" + tc.getMinutes();
                this.currentSeaTemperature.time = hours + ":" + minutes;
                this.currentSeaTemperature.t3 = (this.seaTemperature[this.seaTemperature.length - 1].t3) ? this.seaTemperature[this.seaTemperature.length - 1].t3 : "";
                this.currentSeaTemperature.t6 = (this.seaTemperature[this.seaTemperature.length - 1].t6) ? this.seaTemperature[this.seaTemperature.length - 1].t6 : "";
                this.currentSeaTemperature.t9 = (this.seaTemperature[this.seaTemperature.length - 1].t9) ? this.seaTemperature[this.seaTemperature.length - 1].t9 : "";
                this.currentSeaTemperature.t12 = (this.seaTemperature[this.seaTemperature.length - 1].t12) ? this.seaTemperature[this.seaTemperature.length - 1].t12 : "";
                this.currentSeaTemperature.t20 = (this.seaTemperature[this.seaTemperature.length - 1].t20) ? this.seaTemperature[this.seaTemperature.length - 1].t20 : "";
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
        this.temperatureShelf =  { currentTa: "", maxTa: "", minTa: "", averageTa: "" };
        this.temperatureMonth = [];
        this.temperatureDay = [];
        this.generateTemperatureChart();
        
        this.getTemperatureTaTodayData();
        this.getTemperatureShelfData();
    }
    getTemperatureShelfData() {
        this.service.getTemperatureShelfByToday().subscribe(res => {
            // console.log(res);
            if (res.isSuccess) {
                this.temperatureShelf = res.data;
            }
            else {
                this.helper.toast('没有温度信息，请联系管理员！', 2000, 'bottom');
                this.helper.hideLoading();
                return;
            }
        }, () => {
            this.helper.toast('温度信息获取错误，请联系管理员！', 2000, 'bottom');
            this.helper.hideLoading();
            return;
        });
    }
    getTemperatureTaMonthData() {
        this.service.getTemperatureByMonth().subscribe(res => {
            // console.log(res);
            if (res.isSuccess) {
                this.temperatureMonth = res.data;
                this.generateTemperatureChart();
            }
            else {
                this.helper.toast('没有温度信息，请联系管理员！', 2000, 'bottom');
                this.helper.hideLoading();
                return;
            }
        }, () => {
            this.helper.toast('温度信息获取错误，请联系管理员！', 2000, 'bottom');
            this.helper.hideLoading();
            return;
        });
    }
    getTemperatureTaTodayData() {
        this.service.getTemperatureByToday().subscribe(res => {
            // console.log(res);
            if (res.isSuccess) {
                this.temperatureDay = res.data;
                this.getTemperatureTaMonthData();
            }
            else {
                this.helper.toast('没有温度信息，请联系管理员！', 2000, 'bottom');
                this.helper.hideLoading();
                return;
            }
        }, () => {
            this.helper.toast('温度信息获取错误，请联系管理员！', 2000, 'bottom');
            this.helper.hideLoading();
            return;
        });
        // this.temperatureDay = [{ time: '00:00', t: 28 },
        // { time: '02:00', t: 28 },
        // { time: '04:00', t: 25.5 },
        // { time: '06:00', t: 21.8 },
        // { time: '08:00', t: 22.3 },
        // { time: '10:00', t: 20.4 },
        // { time: '12:00', t: 18.9 },
        // { time: '14:00', t: 20.1 },
        // { time: '16:00', t: 25.1 },
        // { time: '18:00', t: 28.2 },
        // { time: '20:00', t: 26.5 },
        // { time: '22:00', t: 25.4 }];
        // this.temperatureMonth = [{ date: '12-01', t: 28.1 },
        // { date: '12-02', t: 28 },
        // { date: '12-03', t: 20.9 },
        // { date: '12-04', t: 25.4 },
        // { date: '12-05', t: 26 },
        // { date: '12-06', t: 20.7 },
        // { date: '12-07', t: 25.1 },
        // { date: '12-08', t: 20.8 },
        // { date: '12-09', t: 20.5 },
        // { date: '12-10', t: 28.5 },
        // { date: '12-11', t: 28.2 },
        // { date: '12-12', t: 20.9 },
        // { date: '12-13', t: 25.5 },
        // { date: '12-14', t: 25.9 },
        // { date: '12-15', t: 28 },
        // { date: '12-16', t: 20.4 },
        // { date: '12-17', t: 25.3 },
        // { date: '12-18', t: 20.8 },
        // { date: '12-19', t: 20.7 },
        // { date: '12-20', t: 28 },
        // { date: '12-21', t: 26.4 },
        // { date: '12-22', t: 20.6 },
        // { date: '12-23', t: 25.8 },
        // { date: '12-24', t: 25.6 },
        // { date: '12-25', t: 28.2 },
        // { date: '12-26', t: 20.9 },
        // { date: '12-27', t: 25.4 },
        // { date: '12-28', t: 20.9 },
        // { date: '12-29', t: 20.7 },
        // { date: '12-30', t: 28.1 },
        // { date: '12-31', t: 28.0 }];
        // this.generateTemperatureChart()
    }
    generateTemperatureChart() {
        let tempertatureDayTime = this.temperatureDay.map(function (item) {
            console.log("obstime:", item.obstime, typeof (item.obstime));
            let tc = new Date(item.obstime); console.log("TC:", tc);
            let hours = (tc.getHours() > 9) ? tc.getHours() : "0" + tc.getHours(); console.log("hours:", hours);
            let minutes = (tc.getMinutes() > 9) ? tc.getMinutes() : "0" + tc.getMinutes(); console.log("minutes:", minutes);
            return hours + ":" + minutes;
            // return item.time;
        });
        let tempertatureDayValue = this.temperatureDay.map(function (item) {
            return item.ta;
        });
        let tempertatureMonthDate = this.temperatureMonth.map(function (item) {
            let tc = new Date(item.obstime);
            let monthTmp = tc.getMonth() + 1;
            let month = (monthTmp > 9) ? monthTmp : "0" + monthTmp;
            let day = (tc.getDate() > 9) ? tc.getDate() : "0" + tc.getDate();
            return month + "-" + day;
            // return item.date;
        });
        let tempertatureMonthValue = this.temperatureMonth.map(function (item) {
            return item.ta;
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
        let tempSort3 = seaTemparature3.slice(0);
        let tempSort6 = seaTemparature6.slice(0);
        let tempSort9 = seaTemparature9.slice(0);
        let tempSort12 = seaTemparature12.slice(0);
        let tempSort20 = seaTemparature20.slice(0);
        tempSort3 = tempSort3.sort((n1, n2) => n1 - n2); //console.log("tempSort3:", tempSort3, seaTemparature3);
        tempSort6 = tempSort6.sort((n1, n2) => n1 - n2); //console.log("tempSort6:", tempSort6, seaTemparature6);
        tempSort9 = tempSort9.sort((n1, n2) => n1 - n2); //console.log("tempSort9:", tempSort9, seaTemparature9);
        tempSort12 = tempSort12.sort((n1, n2) => n1 - n2); //console.log("tempSort12:", tempSort12, seaTemparature12);
        tempSort20 = tempSort20.sort((n1, n2) => n1 - n2); //console.log("tempSort20:", tempSort20, seaTemparature20);

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
        let tempMinSort = tempMin.sort((n1, n2) => n1 - n2); //console.log("tempMinSort:", tempMinSort, tempMinSort[0]);
        let tempMaxSort = tempMax.sort((n1, n2) => n1 - n2); //console.log("tempMaxSort:", tempMaxSort, tempMaxSort[tempMaxSort.length - 1]);

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
        // console.log("seaTemparature3:", seaTemparature3);
        // console.log("seaTemparature20:", seaTemparature20);
        // this.temperatureChart = this.ec.init(document.getElementById('temperatureChart'))
        this.chartSeaTemperatureOption = {
            title: {
                text: '海水温度变化图',
                x: 'center',
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
                y: "bottom"
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
        // this.nav.back();
        this.router.navigate(['/home/monitor'], {
            queryParams: {
            }
        });
    }
}