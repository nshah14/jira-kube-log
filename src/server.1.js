// var rp = require('request-promise');
// // var request = require("syn-request");
// // var rp = require('request-promise');
// var express = require('express');
// var morgan = require('morgan'); // logger
// var assert = require('assert');
// var bodyParser = require('body-parser');
// var cors = require('cors');
// // var request = require('sync-request');
// var request = require('request');

// var fs = require('fs'), path = require('path');
// var app = express();

// var http = require('https');
// app.use(cors());
// app.use('/public', express.static(__dirname + '/public'));
// app.use('/public/scripts', express.static(__dirname + '/node_modules'));
// app.use('/app', express.static(__dirname + '/app'));
// app,timeout =0;
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(morgan('dev'));
// var url = "/app/rest/"
// var config = require('./config.js');
// var jiraConfig = require('./jira-config.js');


// var users = [];
// var uniques = [];
// var user = new Object();
// app.get('/index', function (req, res) {
//     console.log("index");
//     res.sendFile(__dirname + '/public/index.html');
// });
// app.get('/rest/api/changelog', function (req, res) {
//     console.log("Access rest api from here");
//     request(options, function (error, response, body) {
//         if (error) throw new Error(error);

//         // console.log(body);
//         var obj = JSON.parse(body);
//         user.reportedBy = obj.fields.reporter.name;
//         user.created = obj.fields.created;
//         // console.log(sys.inspect(obj));
//         var count = 0;
//         for (var i = 0; i < obj.changelog.histories.length; i++) {
//             count++;
//             console.log("histories " + obj.changelog.histories.length);
//             var counter = obj.changelog.histories[i];
//             if (user.name === counter.author.name || user.name === null) {
//                 user.name = counter.author.name;
//                 // console.log(counter.author.name);
//                 if (user.updated === null) {
//                     user.updated = counter.created;
//                 }
//                 else {
//                     user.changed = counter.created;
//                 }
//                 // console.log(counter.created);
//                 if (user.mainasignee === null) {
//                     user.mainasignee = counter.items[0].fromString == "To Do" ? true : false;
//                 }
//                 for (var j = 0; j < counter.items.length; j++) {
//                     if (counter.items[j].field == "status") {
//                         console.log("  value of j for status field " + j);
//                         if (user.arrivedfromstatus == null && user.arrivedtostatus == null) {
//                             user.arrivedfromstatus = counter.items[j].fromString;
//                             user.arrivedtostatus = counter.items[j].toString;
//                         }
//                         else {
//                             console.log("  value of user.movedfromstatus" + counter.items[j].fromString);
//                             user.movedfromstatus = counter.items[j].fromString;
//                             console.log("  value of user.movedtostatus" + counter.items[j].toString);
//                             user.movedtostatus = counter.items[j].toString;
//                         }
//                     }
//                     if (counter.items[j].field == "assignee") {
//                         console.log("  counter.items[j].field " + counter.items[j].field);
//                         user.assignedby = counter.items[j].fromString;
//                         user.assignedTo = counter.items[j].to;
//                     }
//                 }
//             } else {
//                 user = new Object();
//                 console.log("new user has arrived");
//                 user.name = counter.author.name;
//                 user.reportedBy = obj.fields.reporter.name;
//                 user.created = obj.fields.created;
//                 user.updated = counter.created;
//                 for (var j = 0; j < counter.items.length; j++) {
//                     if (counter.items[j].field == "status") {
//                         console.log("  counter.items[j].field " + counter.items[j].field);
//                         user.movedfromstatus = counter.items[j].fromString;
//                         user.movedtostatus = counter.items[j].toString;
//                     }
//                     if (counter.items[j].field == "assignee") {
//                         console.log("  counter.items[j].field " + counter.items[j].field);
//                         user.assignedby = counter.items[j].fromString;
//                         user.assignedTo = counter.items[j].to;
//                     }
//                 }
//             }
//             if (!doesContain(users, user)) {
//                 users.push(user);
//             }

//         }


//         users.forEach(user => {
//             console.log("UserName : " + user.name + " assigned On : " + user.created + " updated date : " + user.updated + " changed on :" + user.changed + " isMainAssignee : " + user.mainasignee + " Arrived Status From : " + user.arrivedfromstatus + " Arrived Status To :" + user.arrivedtostatus + " Moved Status From : " + user.movedfromstatus + " Moved Status To :" + user.movedtostatus + " Assigned By :" + user.assignedby + " Assigned To : " + user.assignedTo);
//         });

//         console.log(users.length);
//         res.json(obj.histories);


//     });
// });

// function doesContain(users, user) {
//     var doesnt = false;
//     for (var i = 0; i < users.length; i++) {
//         var existingUser = users[i];
//         if (existingUser.name == user.name) {
//             if (existingUser.created == null && user.created != null) {
//                 existingUser.created = user.created;
//             }
//             if (existingUser.updated == null && user.updated != null) {
//                 existingUser.updated = user.updated;
//             }
//             if (existingUser.mainasignee == null && user.mainasignee != null) {
//                 existingUser.mainasignee = user.mainasignee;
//             }
//             if (existingUser.arrivedfromstatus == null && user.arrivedfromstatus != null) {
//                 existingUser.arrivedfromstatus = user.arrivedfromstatus;
//             }
//             if (existingUser.movedfromstatus == null && user.movedfromstatus != null) {
//                 existingUser.movedfromstatus = user.movedfromstatus;
//             }
//             if (existingUser.movedtostatus == null && user.movedtostatus != null) {
//                 existingUser.movedtostatus = user.movedtostatus;
//             }
//             if (existingUser.assignedby == null && user.assignedby != null) {
//                 existingUser.assignedby = user.assignedby;
//             }
//             if (existingUser.assignedTo == null && user.assignedTo != null) {
//                 existingUser.assignedTo = user.assignedTo;
//             }

//             doesnt = true;
//         }
//     }
//     return doesnt;
// }
// function addIfFieldDoesNotExist(field1, field2, user) {
//     if (field1 == null) {
//         user.field1 = field2;
//     }
// }
// app.listen(3002, function (req, res) {
//     process.env.JIRA_HOST = '127.0.0.1'
//     console.log("env host " + process.env.JIRA_HOST);
//     console.log('*****Running on port number  ::  3002 *****');

// });

// var listOfWorkLogs = [];
// var worklogs = new Object();
// app.get('/rest/api/worklog/:issueid', function (req, res) {

//     var queryBy = req.params.issueid;
//     // var urlissue = "http://"+jiraConfig.user+":"+jiraConfig.password+"@"+jiraConfig.jira_host+":"+jiraConfig.jira_port+jiraConfig.url+"issue/"+queryBy;
//     // var urlissue = "http://"+process.env.JIRA_USER+":"+process.env.JIRA_PASSWORD+"@"+process.env.JIRA_URL+":"+jiraConfig.jira_port+jiraConfig.url+"issue/"+queryBy;
//     var urlissue = 'https://shahna:Welcome123@jira.apt.fs.fujitsu.com/jira/rest/api/2/' + "issue/" + queryBy;
//     console.log("urlissue" + urlissue);
//     var optionsworklog = {
//         url: urlissue
//     };
//     var logs = new Object();
//     var r = request.get(optionsworklog, function (error, response, body) {
//         if (error) {
//             console.log("error " + error);
//             res.status(500).send('error');
//         }
//         else {
//             var obj = JSON.parse(body);
//             console.log("Access rest api for woklog for issue : " + obj.key);
//             if (obj.fields != null) {
//                 user.reportedBy = obj.fields.reporter.name;
//                 user.created = obj.fields.created;
//                 var count = 0;
//                 worklogs.key = obj.key;
//                 worklogs.originalEstimate = obj.fields.timetracking.originalEstimate;
//                 worklogs.remainingEstimate = obj.fields.timetracking.remainingEstimate;
//                 worklogs.timespent = obj.fields.timetracking.timeSpent;
//                 worklogs.labels = obj.fields.labels;
//                 worklogs.work = [];
//                 for (var i = 0; i < obj.fields.worklog.worklogs.length; i++) {
//                     var w = new Object();
//                     var worklog = obj.fields.worklog.worklogs[i];
//                     w.name = worklog.author.name;
//                     w.timespent = worklog.timeSpentSeconds;
//                     w.created = worklog.created;
//                     w.updated = worklog.updated;
//                     w.started = worklog.started;
//                     worklogs.work.push(w);
//                     logs = worklogs;
//                 }
//             }
//             console.log("List of worklogs " + listOfWorkLogs.length);
//             res.json(worklogs);

//         }
//     });

// });

// var project = new Object();
// app.get('/rest/api/project-issues/:projectKey', function (req, res) {
// //     getUserData();
//     // .then(function (userData) {
//     //     console.log("************************************************************"+JSON.stringify(userData)+"*************************************************************");
//     // }).catch(function (err) {
//     //     console.log('Error: ' + err);
//     // });
//     console.log("  env url to use >>" + process.env.JIRA_URL);
//     // listOfWorkLogs = [];
//     var projectkey = req.params.projectKey;

//     // var logs = new Object();
//     var issues = [];
//     var fromrestissues = [];
//     // var urltouse = "http://"+jiraConfig.user+":"+jiraConfig.password+"@"+jiraConfig.jira_host+":"+jiraConfig.jira_port+jiraConfig.url+"search?jql=project='"+projectkey+"'";
//     // var urltouse = "https://"+process.env.JIRA_USER+":"+process.env.JIRA_PASSWORD+"@"+process.env.JIRA_URL+":"+jiraConfig.jira_port+jiraConfig.url+"search?jql=project='"+projectkey+"'";
//     var urltouse = "https://" + process.env.JIRA_USER + ":" + process.env.JIRA_PASSWORD + "@" + process.env.JIRA_URL + ":" + jiraConfig.jira_port + jiraConfig.url + "search?jql=project='" + projectkey + "'";
//     var urltouse = 'https://shahna:Welcome123@jira.apt.fs.fujitsu.com/jira/rest/api/2/search?jql=project="CBB"&maxResults=5000'
//     console.log("url to use" + urltouse);
//     console.log("url to use" + urltouse);
//     var optionprojectissues =
//         {
//             url: urltouse
//         };
//     console.log("optionprojectissues to use" + optionprojectissues.url);
//     request.get(optionprojectissues, function (error, response, body) {
//         if (error) {
//             console.log("Error >>>>>>" + error);
//             res.status(500).send('Something failed!');
//         };
//         var obj = JSON.parse(body);
//         issues = obj.issues;
//         console.log("Access rest api for project-issues >>  Total issues: " + obj.total);
//         if (issues != null) {
//             for (var i = 0; i < issues.length; i++) {
//                 var is = obj.issues[i];
//                 console.log("issue key  : " +is.key );
//                 fromrestissues.push(is.key);
//                 // request.get({ url: config.url_for_worklog + is.key }, function (error, response, body) {
//                 //     if (error) {
//                 //         console.log(error);
//                 //     }
//                 //     // console.log("issue key  : " + body);
//                 //     if( body != null){
//                 //     let issue = JSON.parse(body);
//                 //     fromrestissues.push(issue);
//                 //     console.log("-----------------------------------------------" + body.key);
//                 //     }
//                 // });
//             }
//         }
//         project.issue = fromrestissues;
//         console.log("---------------------DONE HERE--------------------");
//     })
//     res.json(project);
//     console.log("---------------------DONE--------------------");
// });

// app.post('/rest/api/login', function (req, res) {
//     console.log("reached here with user :" + req.body.user);
//     console.log("reached here with url : " + req.body.url);
//     console.log("reached here with password : " + req.body.password);
//     process.env['JIRA_USER'] = req.body.user;
//     process.env['JIRA_URL'] = req.body.url;
//     process.env['JIRA_PASSWORD'] = req.body.password;
//     console.log("  env url >>" + process.env.JIRA_URL);
// })



// var Promise = require('promise');
// var request = require('request');
// //Get your user data, and print the data in JSON:
// // getUserData()
// //     .then(function (userData) {
// //         console.log(JSON.stringify(userData));
// //     }).catch(function (err) {
// //         console.log('Error: ' + err);
// //     });

// /**
//  * Prepares an Object containing data for all users.
//  * @return Promise - Contains object with all user data.
//  */
// function getUserData() {
//     return new Promise(function (fulfill, reject) {
//         // Make the first request to get the user IDs:
//         // var url1 = 'https://www.google.com/all_users';
//         var url1 = 'https://shahna:Welcome123@jira.apt.fs.fujitsu.com/jira/rest/api/2/search?jql=project="CBB"&maxResults=5000'
//         get(url1)
//             .then(function (res) {
//                 res = JSON.parse(res);
//                 console.log("url2 >>"+res);
//                 // Loop through the object to get what you need:
//                 // Set a counter though so we know once we are done.
//                 var counter = 0;
//                 for (x = 0; x < res.issues.length; x++) {
//                     // var url2 = 'https://www.google.com//id/UserObject/User/';
//                     var url2 = 'https://shahna:Welcome123@jira.apt.fs.fujitsu.com/jira/rest/api/2/' + "issue/";
//                     // var urlissue = 'https://shahna:Welcome123@jira.apt.fs.fujitsu.com/jira/rest/api/2/' + "issue/" + queryBy;
//                     url2 = url2 + res.issues[x].key; //Wherever the individual ID is stored.
//                     console.log("url22222 >>"+url2);
//                     var returnDataArr = [];
//                     get(url2)
//                         .then(function (res2) {
//                             // Get what you need from the response from the 2nd URL.
//                             returnDataArr.push(res2);
//                             console.log("length of issues "+res.issues.length);
//                             counter++;
//                             if (counter === res.issues.length) {
//                                 fulfill({ data: returnDataArr }); //Return/Fulfill an object containing an array of the user data.
                               
//                             }
//                         }).catch(function (err) {
//                             // Catch any errors from the 2nd HTTPS request:
//                             reject('Error: ' + err);
//                         });
//                 }
//             }).catch(function (err) {
//                 // Catch any errors from the 1st HTTPS request:
//                 reject('Error: ' + err);
//             });
//     }
//     )
// }

// /**
//  * Your HTTPS GET Request Function
//  * @param url - The url to GET
//  * @return Promise - Promise containing the JSON response. 
//  */
// function get(url) {
//     return new Promise(function (fulfill, reject) {
//         var options = {
//             url: url,
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             }
//         };
//         request(options, function (err, res, body) {
//             if (err) {
//                 reject(err);
//             } else {
//                 fulfill(body);
//             }
//         });
//     });
// }