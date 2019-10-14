import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

    constructor() {

    }
    ngOnInit() {

    }
}