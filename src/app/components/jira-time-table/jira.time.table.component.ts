import { Component, OnInit, NgModule, Input} from '@angular/core';
import { JiraTimeTableService } from "../../services/jira.time.table.component.service";
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import {Issue} from '../../models/Issue';
import {Worklog} from '../../models/Worklog';
import {Project} from '../../models/Project';
import { AppHomeService } from '../../services/app-home.service';
import {LoginComponent} from '../login/login';
import { HttpModule }    from '@angular/http';
// @NgModule({
// 	declarations: [ JiraTimeTableComponent, LoginComponent ]
//   })
@Component({
	selector: 'jira-time',
	templateUrl: 'app/components/jira-time-table/jira.time.table.component.html',
	styleUrls: ['app/components/jira-time-table/jira.time.table.component.css'],
	providers: [JiraTimeTableService]
})

export class JiraTimeTableComponent implements OnInit {
	errorMessage: String;
	isDisableExport = true;
	public buildNumber = "null";
	public values: any[];
	public isProject: boolean;
	data: any;
	options: any;
	words = [];
	word = '';
	public issue: Issue;
	issues: Issue[] = [];
	wlogs: Worklog[] = [];
	@Input()  public project : Project;
	ngOnInit() {
		console.log("project "+this.project);
		
		for(var i =0; i < this.project.issues.length; i++){
			// let issues = new  Array<Issue>()[this.project.issues.length];/
			var issueKey = this.project.issues[i]
			console.log("for issue "+issueKey);
			this.jiraTimeTableSevice.getWorkLogs(issueKey).subscribe(
				data  => 
				{
					setTimeout(()=>
					{
						// this.issue = data;
						this.issues.push(data);
						// console.log("this project inside "+this.issues);
						// console.log("print data "+data);
						this.isDisableExport = false;
					}
					,1000);
			  
				})
				// (data: any) => this.issue = data);
		}

		
	}
	constructor(public jiraTimeTableSevice: JiraTimeTableService) {
	}
	public handleEvent(childData:any){
		this.project = childData;
	}
	tokenizer(sentence) {
		var array = sentence.split(' ');
		console.log("sentence into words" + array)
		return array;
	}

	exportToCsv(){
		var options = { 
			fieldSeparator: ',',
			quoteStrings: '"',
			decimalseparator: '.',
			showLabels: true, 
			showTitle: false,
			headers: ['key','user who logged time','How much time logged', 'start of log entry', 'label', 'created', 'updated'] 
			};
			for(var i =0; i < this.issues.length; i++){
				console.log("printing something "+this.wlogs);
				this.issues[i].worklogs.forEach(element => {
				  let worklog = new Worklog();
				  worklog.key = element.key;
				  worklog.name = element.name;
				  worklog.timespent = element.timespent;
				  worklog.started=element.started;
				  worklog.labels = element.labels;
				  worklog.created = element.created;
				  worklog.updated = element.updated;
				  console.log("key "+worklog.key);
				  
				  this.wlogs.push(worklog);
				});
				// if(i == this.issues.length )
				// {
				// 	console.log("I am the last one ::: "+this.issues[i].name);
				// }
				// this.wlogs.push(this.issues[i].work)
			}
			new Angular2Csv(this.wlogs, "exportedcsv", options)
		
	}	
	/**
	 * Convert from a word to pig altin format.
	 * @param form 
	 */
	convert(sentence, check) {
		console.log("print something")
		this.isProject = false;
		this.jiraTimeTableSevice.getWorkLogs(sentence).subscribe((data: any) => this.issue = data);
		// this.jiraTimeTableSevice.getAllWorkLogsDirectly().subscribe((data:any) => this.issue =  JSON.parse(data).issues);
		console.log("issue "+this.issue.labels);
		//  this.jiraTimeTableSevice.getIssue('POAT-8').then(function(value){console.log(value)});//data => this.issue= data
		// });
		 console.log("this "+this.issue);
		//  console.log("print something"+this.jiraTimeTableSevice.getAllWorkLogs());
		// var outSentence="";
		// for (let token of this.tokenizer(sentence)) {
		// 	outSentence = outSentence+this.translate(token);
		// 	console.log('token :: '+ outSentence);
		// }
		// console.log('outSentence :: '+ outSentence);
		// if (this.words.length > 10) {
		// 	console.log('this is '+this.words.indexOf(this.words));
		// 	this.words.splice(this.words.indexOf(this.words), 1);
		// }

		// this.words.push(outSentence);
		// this.word() = null;
	}
	retrieveAllJira(projectkey, check){
		this.isProject = true;

		// this.jiraTimeTableSevice.getAllWorkLogsDirectly().subscribe(
			
		// 	data => { 
		// 		this.issue = data;
		// 		console.log("data");
		// 	},
		// 	err => console.error(err),
		// 	() => console.log('done')
		// );
		// console.log("key "+projectkey);
			// this.jiraTimeTableSevice.getBooksWithPromise(projectkey)
			//   .then( books => {this.issues = books; console.log(books)},
			// 		 error =>  this.errorMessage = <any>error);   
	   
		// getBooksWithPromise
		// console.log("issue "+this.issues);
		this.jiraTimeTableSevice.getAllWorkLogs(projectkey).subscribe((data: any) => this.project = data);
		console.log("this "+this.issue);
		
		// console.log("this "+this.project.issue);
	}


	/**
	 *  check if its in Array of values
	 * @param vowels 
	 * @param letter 
	 */

	isInArray(vowels, letter) {

		return vowels.indexOf(letter.toLowerCase()) > -1;
	}
	/**
	 * 
	 * @param word Translate from a word to piglatin format
	 */
	translate(word) {
		console.log('in Translate)');
		var array = word.split('');
		var vowels = ['a', 'e', 'i', 'o', 'u'];
		var newWord = '';
		var suffix = "ay ";
		if (this.isInArray(vowels, word.charAt(0))) {
			suffix = "i ";
		}
		console.log(word.substr(1) + word.charAt(0) + suffix);
		return word.substr(1) + word.charAt(0) + suffix;
	}

}
