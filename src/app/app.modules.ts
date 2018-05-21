import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {bootstrap}    from '@angular/platform-browser-dynamic';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {HTTP_PROVIDERS} from '@angular/http';
import {CommonModule}   from '@angular/common';
import {FormsModule}    from '@angular/forms';
import {ClickOutsideModule} from 'ng2-click-outside';


import { AppComponent } from '../app/app.component';
// import { PigLatinComponent } from './components/piglatin/piglatin.component';
// import { TableComponent } from './components/table/table.component';
// import { TabComponent } from '../app/tab.component';
// import { TabsComponent } from '../app/tabs.component';
// import { RegisterComponent } from './components/register/register.component';
import { JiraTimeTableComponent } from './components/jira-time-table/jira.time.table.component';
import { LoginComponent } from './components/login/login';
import { UserComponent } from './components/user/user';
import { appRoutingProviders ,
         routing } from './app.routes';
import 'rxjs/add/operator/map';

// import {environment} from './app/';
import {NgModule, ApplicationRef} from '@angular/core';
import {enableProdMode} from '@angular/core';
import { HttpModule } from '@angular/http';
enableProdMode();
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    FormsModule,
    routing,
    ClickOutsideModule,
    HttpModule
  ],
  declarations: [
  AppComponent,JiraTimeTableComponent, LoginComponent, UserComponent],
  entryComponents: [AppComponent],
  providers: [
    appRoutingProviders,
 
    
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { 
 
}
