// import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Issue } from '../../models/Issue';
import { User } from '../../models/User';
import { Project } from '../../models/Project';
import { UserService } from '../../services/UserService';
import {Router} from '@angular/router';
import { setTimeout } from 'core-js/library/web/timers';
import 'rxjs/add/observable/throw';
import { Location } from '@angular/common';

import {
    Directive,
    Component, OnInit, OnDestroy, DoCheck,
    Input, Output, HostListener, HostBinding,
    TemplateRef, EventEmitter
} from '@angular/core';
@Component({
    selector: 'User',
    templateUrl: 'app/components/user/user.html',
    styleUrls: ['app/components/user/user.css'],
    providers: [ UserService],
    
})


export class UserComponent implements OnInit {
    
    user = new User();
    errorMessage :String;
    msg: String;
    constructor(private route : ActivatedRoute, private location: Location, private userService: UserService, private router: Router) { }
    ngOnInit() { 
        console.log("user component");
    }

    // validate():boolean{
    //     if(this.url== null || this.user == null || this.password == null || this.projectKey == null){
    //         this.msg =  "Mandaory field * missing";
    //         return true;
    //     }
    //     return false;
    // }
    insert(name, surname): void {
        this.user.name = name;
        this.user.surname = surname;
        console.log(" send it");
        this.userService.setupEnviornmentVariable(this.user).subscribe
        ( 
            result => {
                console.log(result);
                
                this.msg = JSON.stringify(result);
                console.log("prun "+result["name"]);
                console.log("pring"+result['name']);
            
            },
            error => this.errorMessage = <any>error
        );;
        // this.userService.getupEnviornmentVariable(this.user).subscribe
        // ( access => {
        //                 this.user.name = access.name;
                        
        //             },
        //             error => this.user.surname =<any>error
        // );;
        // this.userService.getUser(this.user);
    }

   
    
}