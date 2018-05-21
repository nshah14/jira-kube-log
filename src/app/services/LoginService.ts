import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Access } from '../models/Access';
declare function require(path:string) : any;
var config = require('../../config.js');
@Injectable()
export class LoginService {
    private actionUrl = 'http://' + config.host + ':' + config.port + '/rest/api';
    constructor(private http: Http) { }
    setupEnviornmentVariable(access: Access): Observable<Access> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.actionUrl + '/login', access, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    private handleErrorObservable(error: Response | any) {
        // console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
    private handleErrorPromise(error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }
}