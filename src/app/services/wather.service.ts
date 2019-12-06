import { Injectable } from '@angular/core';
import { HttpService } from '../providers/HttpService';

@Injectable(
    {
        providedIn: 'root'
    }
)


export class WeatherService {
    constructor(public http: HttpService) {

    }

    public get(params) {
        return this.http.post('', params);
    }

    public getLastWeather(type:any, companyID:any){
        return this.http.post('weather/GetWeathers', {
            'companyId': companyID,
            'type': type,
            'pageNumber':1,
            'pageSize':1,
        });
    }
}