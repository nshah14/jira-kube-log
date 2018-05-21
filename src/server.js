const cluster = require('cluster');

var rp = require('request-promise');
var express = require('express');
var morgan = require('morgan'); 
var assert = require('assert');
var bodyParser = require('body-parser');
var cors = require('cors');
// var request = require('sync-request');
var request = require('request');
var fs = require('fs'), path = require('path');
var app = express();
var crypto = require('crypto'),algorithm = 'aes-256-ctr',  password = '';
var http = require('https');
var mongoose = require('./db.js');
app.use(cors());
app.use('/public', express.static(__dirname + '/public'));
app.use('/public/scripts', express.static(__dirname + '/node_modules'));
app.use('/app', express.static(__dirname + '/app'));
app,timeout =0;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const numCPUs = require('os').cpus().length;

app.use(morgan('dev'));
var url = "/app/rest/"
var config = require('./config.js');
var jiraConfig = require('./jira-config.js');

var users = [];
var uniques = [];
var user = new Object();
var db = require('./db.js');




app.get('/*', function (req, res) {
    console.log("index");
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3003, function (req, res) {
    process.env.JIRA_HOST = '127.0.0.1'
    console.log("env host " + process.env.JIRA_HOST);
    console.log('*****Running on port number  ::  3003 *****');
   

});



var listOfWorkLogs = [];
var issue = new Object();
app.get('/rest/api/worklog/:issueid', function (req, res) {

    var queryBy = req.params.issueid;
    var urlissue = "http://"+process.env.JIRA_USER+":"+decrypt(process.env.JIRA_PASSWORD)+"@"+process.env.JIRA_URL+jiraConfig.url+"issue/"+queryBy;
    var optionsworklog = {
        url: urlissue
    };
    var logs = new Object();
    var r = request.get(optionsworklog, function (error, response, body) {
        if (error) {
            console.log("error " + error);
            res.status(500).send('error');
        }
        else {
            var obj = JSON.parse(body);
            console.log("Access rest api for woklog for issue : " + obj.key);
            if (obj.fields != null) {
                var count = 0;
                issue.created = obj.fields.created;
                issue.key = obj.key;
                issue.status = obj.fields.status.name;
                issue.originalEstimate = obj.fields.timetracking.originalEstimate;
                issue.remainingEstimate = obj.fields.timetracking.remainingEstimate;
                issue.timespent = obj.fields.timetracking.timeSpent;
                issue.labels = obj.fields.labels;
                issue.worklogs = [];
                if(obj.fields.worklog.worklogs.length < 1){
                    var w = new Object();
                    w.key = obj.key;
                    w.name = "";
                    obj.fields.labels.length < 1 ?w.labels = "": w.labels = obj.fields.labels;
                    w.timespent = "";
                    w.created = "";
                    w.updated = "";
                    w.started = "";
                    issue.worklogs.push(w);
                }
                else
                {
                    for (var i = 0; i < obj.fields.worklog.worklogs.length; i++) {
                        var w = new Object();
                        var worklog = obj.fields.worklog.worklogs[i];
                        w.key = obj.key;
                        w.name = worklog.author.name;
                        w.timespent = worklog.timeSpentSeconds;
                        w.labels = obj.fields.labels;
                        w.created = prepareDateInFormatOf_YYYY_MM_DD(worklog.created).replace("T", " ");//Date.parse(worklog.created.slice(0,worklog.created.lastIndexOf('.')));//prepareDateInFormatOf_YYYY_MM_DD(worklog.created);//dateString;
                        w.updated = prepareDateInFormatOf_YYYY_MM_DD(worklog.updated).replace("T", " ");//prepareDateInFormatOf_YYYY_MM_DD(worklog.updated);
                        w.started = prepareDateInFormatOf_YYYY_MM_DD(worklog.started).replace("T", " ");//prepareDateInFormatOf_YYYY_MM_DD(worklog.started);//worklog.started;
                        issue.worklogs.push(w);
                        // logs = issue;
                    }
                }
            }
            console.log("List of worklogs " + listOfWorkLogs.length);
            res.json(issue);

        }
    });

});


var project = new Object();
app.get('/rest/api/project-issues/:projectKey', function (req, res) {
    var projectkey = req.params.projectKey;
    var issues = [];
    var fromrestissues = [];
    var urltouse = "https://" + process.env.JIRA_USER + ":" + decrypt(process.env.JIRA_PASSWORD) + "@" + process.env.JIRA_URL + jiraConfig.url + "search?jql=project='" + projectkey + "'&maxResults=5000";
    // var urltouse = 'https://user:password@jira.apt.fs.fujitsu.com/jira/rest/api/2/search?jql=project="CBB"  AND  (created > "2015-09-20" AND created < "2017-09-20")&maxResults=5000';
    // var urltouse = 'https://user:password@jira.apt.fs.fujitsu.com/jira/rest/api/2/search?jql=project="CBB"  AND  (created > "2013-09-21" AND created < "2015-09-21")&maxResults=5000';
    var optionprojectissues =
        {
            url: urltouse
        };

    request.get(optionprojectissues, function (error, response, body) {
        if (error) {
            console.log("Error >>>>>>" + error);
            res.sendStatus(500);
        };
        if(response.statusCode == 401){
            res.sendStatus(401);
        }
        else{
            var obj = JSON.parse(body);
            issues = obj.issues;
            console.log("Access rest api for project-issues >>  Total issues: " + obj.total);
            if(obj.total == null)
            {

                if(obj.errorMessages != null)
                {
                    res.status(400);
                    res.send({"error":obj.errorMessages});
                }
            }
            else{
                if (issues != null) {
                    for (var i = 0; i < issues.length; i++) {
                        var is = obj.issues[i];
                        console.log("issue key  : " +is.key );
                        fromrestissues.push(is.key);
                    }
                }
                project.issues = fromrestissues;
                console.log("---------------------DONE HERE--------------------");
                res.json(project);
            }
        }
        
        
    })
    
    console.log("---------------------DONE--------------------");
});


app.post('/rest/api/login', function (req, res) {
    process.env['JIRA_USER'] = req.body.user;
    process.env['JIRA_URL'] = req.body.url;
    password = req.body.password;
    process.env['JIRA_PASSWORD'] = encrypt(req.body.password);
    res.send(200);
})
const connection = require("./connection.js");

app.put('/rest/api/user/:id', function (req, res) {
    let user = req.params.id;
    console.log("coming here");
    connection.connectToDb(function (error) {
		if (error) {
			res.status(500).json({"msg": "error connecting to db", status: "CONNECTION_ERROR"});
			return;
		}
		// If the DB is connected then Create / Update the doc
		connection.createUser(user, req.body, function (err, success) {
			if (err) {
				res.status(500).json({"msg": "error updating info",  status: "CONNECTION_ERROR"});
				return;
			}
			res.status(200).json({msg: success});
		});
	});
})
app.get('/rest/api/:id', function (req, res) {
    let user = req.params.id;
	
	if (!user) {
		res.status(400).json({msg: "Missing required parameter", status: "BAD_REQUEST"});
		return;
	}
	// To check if the connection is available / To establish the Database connection 
	connection.connectToDb(function (error) {
		if (error) {
			return res.status(500).json({msg: "Error connecting to db", status: "CONNECTION_ERROR"});
		}
		// To get the information of a Dish
		connection.getUser(user, function (err, success) {
			if (err) {
				res.status(500).json({msg: "Error rereiving the info",  status: "CONNECTION_ERROR"});
				return;
			}
			res.status(200).json({doc: success});
		});
	});
})

function prepareDateInFormatOf_YYYY_MM_DD(oldDateString){
    var dateString=new Date(oldDateString).toISOString();
    dateString=dateString.slice(0, 19);
    return dateString;
}


var Promise = require('promise');
var request = require('request');

/**
 * Prepares an Object containing data for all users.
 * @return Promise - Contains object with all user data.
 */
function getUserData() {
    return new Promise(function (fulfill, reject) {
        // Make the first request to get the user IDs:
        // var url1 = 'https://www.google.com/all_users';
        var url1 = '...'
        get(url1)
            .then(function (res) {
                res = JSON.parse(res);
                console.log("url2 >>"+res);
                // Loop through the object to get what you need:
                // Set a counter though so we know once we are done.
                var counter = 0;
                for (x = 0; x < res.issues.length; x++) {
                  
                    var url2 = '';
                  
                    url2 = url2 + res.issues[x].key; //Wherever the individual ID is stored.
                    console.log("url22222 >>"+url2);
                    var returnDataArr = [];
                    get(url2)
                        .then(function (res2) {
                            // Get what you need from the response from the 2nd URL.
                            returnDataArr.push(res2);
                            console.log("length of issues "+res.issues.length);
                            counter++;
                            if (counter === res.issues.length) {
                                fulfill({ data: returnDataArr }); //Return/Fulfill an object containing an array of the user data.
                               
                            }
                        }).catch(function (err) {
                            // Catch any errors from the 2nd HTTPS request:
                            reject('Error: ' + err);
                        });
                }
            }).catch(function (err) {
                // Catch any errors from the 1st HTTPS request:
                reject('Error: ' + err);
            });
    }
    )
}

/**
 * Your HTTPS GET Request Function
 * @param url - The url to GET
 * @return Promise - Promise containing the JSON response. 
 */
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

function encrypt(text){
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  }
   
function decrypt(text){
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }


  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
  /* 
      Add to avoid cross origin access.
      Access-Control-Allow-Origin is set to '*' so that server REST APIs are accessible for all the domains.
      By setting domain name to some value, the API access can be restricted to only the mentioned domain. 
      Eg, Access-Control-Allow-Origin: 'mywebsite.com'
  */
//   app.use(function (req, res, next) {
//       res.header("Access-Control-Allow-Origin", "*");
//       res.header("Access-Control-Allow-Headers", "content-type");
//       next();
//   })

// const connection = require("./connection.js"),
//        u = require('./userroute.js'),
//        userRoute = express.Router() ;
// userRoute.get("/:id", u.getUsers);
// // Api to create / update the dish.
// userRoute.put("/:id", u.updateUser);
// app.use("/users", userRoute);
