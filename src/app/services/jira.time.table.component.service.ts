// import { Injectable } from '@angular/core';
// import { Http, Response, RequestOptions, Headers, HTTP_PROVIDERS } from '@angular/http';
// import {HttpClient} from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { Issue } from '../models/Issue';
import { Project } from '../models/Project';
import { Resolve } from '@angular/router/src/interfaces';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

declare function require(path:string) : any;
var config = require('../../config.js');

@Injectable()
export class JiraTimeTableService {
    
    private actionUrl = 'http://' + config.host + ':' + config.port + '/rest/api';

    private options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, OPTIONS, HEAD' }) });
    constructor(private http: Http) {

    }

    public getWorkLogs(id: string): Observable<Issue> {
     
        return this.http.get(this.actionUrl + '/worklog/' + id)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    public getIssue(id: string) {
        let promise = new Promise((resolve, reject) => {
            this.http.get(this.actionUrl + '/worklog/' + id)
            .toPromise()
            .then(response => response.json().data as Issue)
            .catch(this.handleError)
        });

        return promise;
    }
    public getAllWorkLogs(id: string): Observable<Project> {
        return this.http.get(this.actionUrl + '/project-issues/' + id)
            .map((res: Response) =>  res.json())
            .catch((error: any) => Observable.throw(this.handleError(error)));
    }
    

    public getBooksWithPromise(id: string): Promise<Project> {
        console.log(" id "+id)
        return this.http.get(this.actionUrl + '/project-issues/' + id).toPromise().then(response => response.json() as Project);
    }
    handleError(error) {
        console.log('Hio');
        throw error;
    }
    private extractData(res: Response) {
        let body = res.json();
        console.log("body "+body);
        return body || {};
    }
    private handleErrorPromise(error: Response | any) {
        console.error(error.message);
        return Promise.reject(error.message || error);
    }
}