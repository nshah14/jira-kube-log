import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
declare function require(path:string) : any;
var config = require('../../config.js');
@Injectable()
export class UserService {
    private actionUrl = 'http://' + config.host + ':' + config.port + '/rest/api/';
    constructor(private http: Http) { }
    setupEnviornmentVariable(access: User): Observable<User> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.actionUrl + 'user/'+access.name, JSON.stringify(access), options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }
    getupEnviornmentVariable(access: User): Observable<User> {
        console.log("get value");
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.actionUrl +access.name, options)
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