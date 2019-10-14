import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Utils } from '../providers/Utils';
import { NativeService } from '../providers/NativeService';
import { Helper } from '../providers/Helper';
import { GlobalData } from '../providers/GlobalData';
import { Events, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
 import { WeatherService } from '../services/wather.service';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss'],
    // providers: [RainService, Utils]
})

export class WeatherPage implements OnInit {

    constructor() {

    }
    ngOnInit() {

    }
}