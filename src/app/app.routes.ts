import {RouterModule , Routes} from '@angular/router';
import {JiraTimeTableComponent} from './components/jira-time-table/jira.time.table.component';
import {LoginComponent} from './components/login/login';
import { AppComponent } from '../app/app.component'
import { UserComponent } from './components/user/user';

export const routes: Routes = [
	{ path: 'index/jira-time', component: JiraTimeTableComponent },
	{ path: '', redirectTo:'index', pathMatch: 'prefix' },
	{ path: 'index/reload', redirectTo:'index', pathMatch: 'prefix' },
	{ path: 'index', component: LoginComponent},
	{ path: 'index/register', component: UserComponent}
	// ,
	// children: [
	// 	{ path: '', redirectTo: 'jira-time', pathMatch: 'full' },
	// 	{ path: 'jira-time', component: JiraTimeTableComponent }
	//   ]

// }

];

export const appRoutingProviders: any[] = [
];
export const routing =  RouterModule.forRoot(routes);