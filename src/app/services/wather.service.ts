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

    public getWeather(weatherId:any){
        return this.http.post('weather/GetWeather', {
            'id': weatherId
        });
    }
    public getLastWeather(type:any, companyID:any){
        return this.http.post('weather/GetWeathers', {
            'companyId': companyID,
            'type': type,
            'pageNumber':1,
            'pageSize':1,
        });
    }
    public getWeathersByType(type:any, companyID:any,pageNumber:any, pageSize:any){        
        return this.http.post('weather/GetWeathers', {
            'companyId': companyID,
            'type': type,
            'pageNumber':pageNumber,
            'pageSize':pageSize,
        });
    }
}