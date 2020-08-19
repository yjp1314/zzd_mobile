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
    public getTides(stationCode:any, dateFrom:any,dateTo:any){
        return this.http.post('tide/GetTides', {
            'stationCode': stationCode,
            'publicDateFrom': dateFrom,
            'publicDateTo': dateTo
        });
    }
    public getTemperatureByToday(){
        return this.http.post('vaisalaAWS/GetVaisalaAWSTaByToday', {});
    }
    public getTemperatureByMonth(){
        return this.http.post('vaisalaAWS/GetVaisalaAWSTaByMonth', {});
    }
    public getTemperatureShelfByToday(){
        return this.http.post('vaisalaAWS/GetVaisalaAWSTaShelfByToday', {});
    }
    public getCurrentInfo(stationCode:any){
        return this.http.post('current/GetCurrentInfo', {station_name:stationCode});
    }
    
    public getAutositeDataByToday(){
        return this.http.post('autoSite/GetAutoSiteDataByToday', {});
    }
    public getLastAutosite(){
        return this.http.post('autoSite/GetLastAutoSiteByToday', {});
    }
}