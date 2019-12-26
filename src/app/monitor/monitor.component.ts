import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Events, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
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

    equips = "";
    constructor(
        public nav: NavController, 
        public router: Router) {
            this.equips = localStorage.getItem("equips").toLowerCase();
    }

    ngOnInit() {
    }

    checkEquip(equipName){
        // console.log(this.equips,equipName.toLowerCase(),this.equips.indexOf(equipName.toLowerCase()));
        return (this.equips.indexOf(equipName.toLowerCase()) >= 0)
    }

    viewTemperature(stationName,stationcode)
    {
        // this.nav.navigateForward(['/home/monitor/temperature'], {
        //     queryParams: {
        //         stationName: stationName,
        //         stationCode: stationcode
        //     }
        // });
        this.router.navigate(['/home/monitor/temperature'], {
            queryParams: {
                stationName: stationName,
                stationCode: stationcode
            }
        });
    }
    viewCurrent(stationName,equipmentId){
        // this.nav.navigateForward(['/home/monitor/current'], {
        //     queryParams: {
        //         stationName: stationName,
        //         equipmentId: equipmentId
        //     }
        // });
        this.router.navigate(['/home/monitor/current'], {
            queryParams: {
                stationName: stationName,
                equipmentId: equipmentId
            }
        });
    }
} 