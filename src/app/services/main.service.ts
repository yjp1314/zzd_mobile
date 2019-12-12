import { Injectable } from '@angular/core';
import { HttpService } from '../providers/HttpService';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { GlobalData } from '../providers/GlobalData';
// import { FileService } from '../providers/FileService';
import { ValidationErrors } from '@angular/forms';
// import { Encrypt } from '../providers/Encrypt';
import { Time } from '@angular/common';
import { Utils } from '../providers/Utils'

@Injectable(
    {
        providedIn: 'root'
    }
)


export class MainService {
    constructor(public http: HttpService) {

    }

    public getNotice(params) {
        return this.http.post('notice/GetAll', params);
    }

    public getDetail(params)
    {
        return this.http.post('notice/GetNoticeDetail',params)
    }
    public getPictures(params) {
        return this.http.post('cpicture/GetPictrues', params);
    }
    public getWeathers(params) {
        return this.http.post('', params);
    }

}