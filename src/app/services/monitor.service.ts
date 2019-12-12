import { Injectable } from '@angular/core';
import { HttpService } from '../providers/HttpService';

@Injectable(
    {
        providedIn: 'root'
    }
)


export class MonitorService {
    constructor(public http: HttpService) {

    }

    public get(params) {
        return this.http.post('', params);
    }
    public getSeaTemperature(stationCode:any, date:any){
        return this.http.post('SeaTemperature/GetSeaTemperatureByToday', {
            'stationCode': stationCode,
            'queryDateTime': date
        });
    }
}