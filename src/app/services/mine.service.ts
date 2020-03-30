import { Injectable } from '@angular/core';
import { HttpService } from '../providers/HttpService';

@Injectable(
    {
        providedIn: 'root'
    }
)


export class MineService {
    constructor(public http: HttpService) {

    }

    public changePassword(params) {
        return this.http.post('', params);
    }

    public getUnusualData(params) {
        return this.http.post('SeaTemperature/GetUnusualData', params)
    }
}