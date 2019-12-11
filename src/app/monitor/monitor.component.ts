import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Events, NavController } from '@ionic/angular';
import { Utils } from '../providers/Utils';
import { NativeService } from '../providers/NativeService';
import { Helper } from '../providers/Helper';
import { HttpService } from '../providers/HttpService';
import { GlobalData } from '../providers/GlobalData';
 import { MonitorService } from '../services/monitor.service';

@Component({
    selector: 'app-monitor',
    templateUrl: './monitor.component.html',
    styleUrls: ['./monitor.component.scss'],
    // providers: [RainService, Utils]
})

export class MonitorPage implements OnInit {

    constructor(
        public nav: NavController) {

    }
    ngOnInit() {

    }
    viewTemperature(stationName,stationcode)
    {
        this.nav.navigateForward(['/home/monitor/temperature'], {
            queryParams: {
                stationName: stationName,
                stationCode: stationcode
            }
        });
    }
    viewCurrent(stationName,equipmentId){
        this.nav.navigateForward(['/home/monitor/current'], {
            queryParams: {
                stationName: stationName,
                equipmentId: equipmentId
            }
        });
    }
} 