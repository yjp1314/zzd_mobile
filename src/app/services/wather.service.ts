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
}