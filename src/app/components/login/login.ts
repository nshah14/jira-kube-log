// import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Issue } from '../../models/Issue';
import { Access } from '../../models/Access';
import { Project } from '../../models/Project';
import { LoginService } from '../../services/LoginService';
import {Router} from '@angular/router';
import { JiraTimeTableService } from "../../services/jira.time.table.component.service";
import { setTimeout } from 'core-js/library/web/timers';
import {JiraTimeTableComponent} from "../jira-time-table/jira.time.table.component"
import 'rxjs/add/observable/throw';
import { Location } from '@angular/common';

import {
    Directive,
    Component, OnInit, OnDestroy, DoCheck,
    Input, Output, HostListener, HostBinding,
    TemplateRef, EventEmitter
} from '@angular/core';
@Component({
    selector: 'login',
    directives: [JiraTimeTableComponent],
    templateUrl: 'app/components/login/login.html',
    styleUrls: ['app/components/login/login.css'],
    providers: [ LoginService, JiraTimeTableService],
    
})


export class LoginComponent implements OnInit {
    isSubmit = false;
    isReset = false;
    access = new Access();
    errorMessage: String;    
    url: string;
    user: string;
    password: string;
    projectKey: string;
    issues : Issue[];
    isLoaded:boolean;
    isLoading:boolean;
    msg:string;
    error:string;
    isError:boolean;
    @Output('childData') notify: EventEmitter<Project> = new EventEmitter<Project>();
    public project : Project;
    constructor(private route : ActivatedRoute, private location: Location, private loginService: LoginService, private router: Router, private jiraTimeTableService:JiraTimeTableService) { }
    ngOnInit() { 
        console.log(this.project);
    }

    validate():boolean{
        if(this.url== null || this.user == null || this.password == null || this.projectKey == null){
            this.msg =  "Mandaory field * missing";
            return true;
        }
        return false;
    }
    login(url, user, password): void {
        if(!this.validate())
        {
                this.isSubmit= true;
                this.isReset = true;
                console.log("submit is "+this.isSubmit);
                console.log("reset is "+this.isReset);
                // console.log("i am login" + url + user + password);
                this.access.url = url;
                this.access.user = user;
                this.access.password = password;
                this.loginService.setupEnviornmentVariable(this.access).subscribe
                ( access => {
                                this.user = access.user;
                                
                            },
                            error => this.errorMessage =<any>error
                );
                this.isLoading = true;
                console.log("project value "+this.project);
                var list = this.processJira();
                this.notify.emit(this.project);
         }
        
    }

    processJira(): Project{
        this.project = null;
        this.jiraTimeTableService.getAllWorkLogs(this.projectKey).subscribe(data  => 
            {
                setTimeout(()=>
                {
                    
                    this.project = data;
                    console.log("this project inside "+this.project.issues);
                    this.isLoading = false;
                    this.isSubmit=false;
                    this.isReset=false;
                    console.log("submit is "+this.isSubmit);
                    console.log("reset is "+this.isReset);
                    
                }
                ,60000);
          
            },
            err => {
                this.errorMessage = err;
                this.isError= true;
                console.error("thissss "+this.error);
                this.isLoading=false;
            }
        
        );
        return this.project;
        
    }
    reload(){
        // this.location.reload();
    }
    
}