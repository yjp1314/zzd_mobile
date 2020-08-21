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
    templateUrl: './monitor_current.component.html',
    styleUrls: ['./monitor_current.component.scss'],
    // providers: [RainService, Utils]
})

export class MonitorCurrentPage implements OnInit {
    station_info = {
        station_name: "",
        station_code: "",
    }
    ec: any = echarts;
    chartSeaCurrentOption: any;
    seaCurrent: any;
    seaCurrentValue = { speed: 0, direct: 0 };
    currentDeep = "2";
    currentChart: any;
    currentDirect: any;
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
            this.currentChart = this.ec.init(document.getElementById('currentChart'))
            this.getSeaCurrentData();
        });
        // this.refreshChart();
    }
    ngOnDestroy() {
        this.ec = null;
        this.chartSeaCurrentOption = null;
        this.currentDeep = "";
        this.seaCurrent = null;
    }
    getSeaCurrentData() {
        this.service.getCurrentInfo(this.station_info.station_code,).subscribe(res => {
            // console.log(res);
            if (res.isSuccess) {
                this.seaCurrent = res.data;
                console.log("seaCurrent:", this.seaCurrent);
                this.currentDeep = "2";
                this.generateSeaCurrentChart();
                this.refreshChart()
            }
            else {
                this.helper.toast('没有流速流向信息，请联系管理员！', 2000, 'bottom');
                this.helper.hideLoading();
                return;
            }
        }, () => {
            this.helper.toast('流速流向信息获取错误，请联系管理员！', 2000, 'bottom');
            this.helper.hideLoading();
            return;
        });
        // 模拟数据
        // this.seaCurrent = {
        //     t2: { speed: 138, direct: 55.92 },
        //     t4: { speed: 50, direct: 210 },
        //     t6: { speed: 138, direct: 340 },
        //     t8: { speed: 138, direct: 14 },
        //     t10: { speed: 138, direct: 55.92 },
        //     t12: { speed: 138, direct: 55.92 },
        //     t14: { speed: 138, direct: 55.92 },
        //     t16: { speed: 138, direct: 55.92 },
        //     t18: { speed: 138, direct: 55.92 },
        //     t20: { speed: 138, direct: 55.92 },
        //     t22: { speed: 138, direct: 55.92 },
        //     t24: { speed: 138, direct: 55.92 },
        //     t26: { speed: 138, direct: 55.92 },
        //     t28: { speed: 138, direct: 55.92 },
        //     t30: { speed: 138, direct: 55.92 },
        //     t32: { speed: 138, direct: 55.92 },
        //     t34: { speed: 138, direct: 55.92 },
        //     t36: { speed: 138, direct: 55.92 },
        //     t38: { speed: 138, direct: 55.92 },
        //     t40: { speed: 138, direct: 55.92 },
        //     t42: { speed: 138, direct: 55.92 },
        //     t44: { speed: 138, direct: 55.92 },
        //     t46: { speed: 138, direct: 55.92 },
        //     t48: { speed: 138, direct: 55.92 },
        //     t50: { speed: 138, direct: 55.92 },
        //     t52: { speed: 138, direct: 55.92 },
        //     t54: { speed: 138, direct: 55.92 },
        //     t56: { speed: 138, direct: 55.92 },
        //     t58: { speed: 138, direct: 55.92 },
        //     t60: { speed: 138, direct: 55.92 },
        // };
        // this.currentDeep = "2";
        // this.generateSeaCurrentChart();
        // this.refreshChart()

    }

    generateSeaCurrentChart() {
        // this.CurrentChart = this.ec.init(document.getElementById('CurrentChart'))
        // this.chartSeaCurrentOption = {
        //     tooltip: {
        //         formatter: "{a} <br/>{b} : {c}m/s"
        //     },
        //     toolbox: {
        //         feature: {
        //             restore: {},
        //             saveAsImage: {}
        //         }
        //     },
        //     series: [
        //         {
        //             name: '洋流速度',
        //             type: 'gauge',
        //             min: 0,
        //             max: 360,
        //             detail: { formatter: '{value}m/s' },
        //             data: [{ value: this.seaCurrentValue, name: '洋流' }]
        //         }
        //     ]
        // };
        this.chartSeaCurrentOption = {
            tooltip: {
                formatter: "{a} <br/>{c} {b}"
            },
            toolbox: {
                show: false,
                feature: {
                    restore: { show: false },
                    saveAsImage: { show: false }
                }
            },
            series: [
                {
                    name: '速度',
                    type: 'gauge',
                    z: 3,
                    min: 0,
                    max: 360,
                    splitNumber: 18,
                    radius: '60%',
                    center: ['62%', '30%'],    // 默认全局居中
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            width: 10
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        length: 15,        // 属性length控制线长
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: 'auto'
                        }
                    },
                    splitLine: {           // 分隔线
                        length: 20,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            color: 'auto'
                        }
                    },
                    axisLabel: {
                        backgroundColor: 'transparent',
                        borderRadius: 2,
                        color: '#eee',
                        padding: 3,
                        textShadowBlur: 2,
                        textShadowOffsetX: 1,
                        textShadowOffsetY: 1,
                        textShadowColor: '#222',
                        fontSize: '10'
                    },
                    title: {
                        // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        fontSize: 20,
                        fontStyle: 'italic'
                    },
                    detail: {
                        // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        formatter: function (value) {
                            value = (value + '').split('.');
                            value.length < 2 && (value.push('00'));
                            return (value[0]).slice(-10) + '.' + (value[1] + '00').slice(0, 2);
                        },
                        fontWeight: 'bolder',
                        borderRadius: 3,
                        backgroundColor: '#444',
                        borderColor: '#aaa',
                        shadowBlur: 5,
                        shadowColor: '#333',
                        shadowOffsetX: 0,
                        shadowOffsetY: 3,
                        borderWidth: 2,
                        textBorderColor: '#000',
                        textBorderWidth: 2,
                        textShadowBlur: 2,
                        textShadowColor: '#fff',
                        textShadowOffsetX: 0,
                        textShadowOffsetY: 0,
                        fontFamily: 'Arial',
                        color: '#eee',
                        width: 50,
                        fontSize: 20,
                        rich: {}
                    },
                    data: [{ value: '0', name: '流向' }]
                },
                {
                    name: '转速',
                    type: 'gauge',
                    center: ['22%', '30%'],    // 默认全局居中
                    radius: '35%',
                    min: 0,
                    max: 6,
                    endAngle: 45,
                    splitNumber: 3,
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            width: 8
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        length: 12,        // 属性length控制线长
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: 'auto'
                        }
                    },
                    splitLine: {           // 分隔线
                        length: 20,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            color: 'auto'
                        }
                    },
                    pointer: {
                        width: 5
                    },
                    title: {
                        offsetCenter: [0, '-20%'],       // x, y，单位px
                        fontWeight: 'bolder',
                        fontSize: 10,
                        fontStyle: 'italic'
                    },
                    detail: {
                        // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        width: 50,
                        fontSize: 20,
                    },
                    data: [{ value: '0', name: '流速-节' }]
                }
            ]
        };
    }
    refreshChart() {
        if (this.seaCurrent == null) {
            this.seaCurrentValue = { speed: 0, direct: 0 };
        }
        else {
            console.log("currentDeep:", this.currentDeep);
            switch (this.currentDeep) {
                case "2":
                    console.log(this.seaCurrent.t2,this.seaCurrent["t2"]);
                    this.seaCurrentValue = this.seaCurrent.t2;
                    break;
                case "4":
                    this.seaCurrentValue = this.seaCurrent.t4;
                    break;
                case "6":
                    this.seaCurrentValue = this.seaCurrent.t6;
                    break;
                case "8":
                    this.seaCurrentValue = this.seaCurrent.t8;
                    break;
                case "10":
                    this.seaCurrentValue = this.seaCurrent.t10;
                    break;
                case "12":
                    this.seaCurrentValue = this.seaCurrent.t12;
                    break;
                case "14":
                    this.seaCurrentValue = this.seaCurrent.t14;
                    break;
                case "16":
                    this.seaCurrentValue = this.seaCurrent.t16;
                    break;
                case "18":
                    this.seaCurrentValue = this.seaCurrent.t18;
                    break;
                case "20":
                    this.seaCurrentValue = this.seaCurrent.t20;
                    break;
                case "22":
                    this.seaCurrentValue = this.seaCurrent.t22;
                    break;
                case "24":
                    this.seaCurrentValue = this.seaCurrent.t24;
                    break;
                case "26":
                    this.seaCurrentValue = this.seaCurrent.t26;
                    break;
                case "28":
                    this.seaCurrentValue = this.seaCurrent.t28;
                    break;
                case "30":
                    this.seaCurrentValue = this.seaCurrent.t30;
                    break;
                case "32":
                    this.seaCurrentValue = this.seaCurrent.t32;
                    break;
                case "34":
                    this.seaCurrentValue = this.seaCurrent.t34;
                    break;
                case "36":
                    this.seaCurrentValue = this.seaCurrent.t36;
                    break;
                case "38":
                    this.seaCurrentValue = this.seaCurrent.t38;
                    break;
                case "40":
                    this.seaCurrentValue = this.seaCurrent.t40;
                    break;
                case "42":
                    this.seaCurrentValue = this.seaCurrent.t42;
                    break;
                case "44":
                    this.seaCurrentValue = this.seaCurrent.t44;
                    break;
                case "46":
                    this.seaCurrentValue = this.seaCurrent.t46;
                    break;
                case "48":
                    this.seaCurrentValue = this.seaCurrent.t48;
                    break;
                case "50":
                    this.seaCurrentValue = this.seaCurrent.t50;
                    break;
                case "52":
                    this.seaCurrentValue = this.seaCurrent.t52;
                    break;
                case "54":
                    this.seaCurrentValue = this.seaCurrent.t54;
                    break;
                case "56":
                    this.seaCurrentValue = this.seaCurrent.t56;
                    break;
                case "58":
                    this.seaCurrentValue = this.seaCurrent.t58;
                    break;
                case "60":
                    this.seaCurrentValue = this.seaCurrent.t60;
                    break;
                default:
                    this.seaCurrentValue = { speed: 0, direct: 0 };
                    break;
            }
        }
        console.log("seaCurrentValue:", this.seaCurrentValue);
        this.chartSeaCurrentOption.series[0].data[0].value = this.seaCurrentValue.direct;
        this.chartSeaCurrentOption.series[1].data[0].value = this.seaCurrentValue.speed;
        this.currentChart.setOption(this.chartSeaCurrentOption, true);
        this.currentDirect = this.getDirect(this.seaCurrentValue.direct);
    }
    getDirect(direct) {
        console.log("direct:", direct);
        var tempDirect = "北";
        if ((direct >= 348.76 && direct <= 360) || (direct >= 0 && direct <= 11.25))
            tempDirect = "北";
        if (direct >= 11.26 && direct <= 33.75)
            tempDirect = "北东北";
        if (direct >= 33.76 && direct <= 56.25)
            tempDirect = "东北";
        if (direct >= 56.26 && direct <= 78.75)
            tempDirect = "东东北";
        if (direct >= 78.76 && direct <= 101.25)
            tempDirect = "东";
        if (direct >= 101.26 && direct <= 123.75)
            tempDirect = "东东南";
        if (direct >= 123.76 && direct <= 146.25)
            tempDirect = "东南";
        if (direct >= 146.26 && direct <= 168.75)
            tempDirect = "南东南";
        if (direct >= 168.76 && direct <= 191.25)
            tempDirect = "南";
        if (direct >= 191.26 && direct <= 213.75)
            tempDirect = "南西南";
        if (direct >= 213.76 && direct <= 236.25)
            tempDirect = "西南";
        if (direct >= 236.26 && direct <= 258.75)
            tempDirect = "西西南";
        if (direct >= 258.76 && direct <= 281.25)
            tempDirect = "西";
        if (direct >= 281.26 && direct <= 303.75  )
            tempDirect = "西西北";
        if (direct >= 303.76 && direct <= 326.25)
            tempDirect = "西北";
        if (direct >= 326.26 && direct <= 348.75)
            tempDirect = "北西北";
        console.log("tempDirect:", tempDirect);
        return tempDirect;
    }
    segmentChanged(ev: any) {
        console.log('Segment changed', ev);
        if (ev.detail.value === "") return;
        this.currentDeep = ev.detail.value;
        this.refreshChart();
    }

    switchDeep(deep){        
        this.currentDeep = deep.toLocaleString();
        this.refreshChart();
        return true;
    }

    viewList() {
        // this.nav.back();
        this.router.navigate(['/home/monitor'], {
            queryParams: {
            }
        });
    }
}