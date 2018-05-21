host = "127.0.0.1";
port="3003";
endpoint_for_worklog="/rest/api/worklog/";
endpoint_for_project_issues = "/rest/api/project-issues/";
url_for_worklog= "http://"+host+":"+port+endpoint_for_worklog;
url_for_project_issues="http://"+host+":"+port+endpoint_for_project_issues;
module.exports = {
    host:host,
    port:port,
    url_for_worklog:url_for_worklog,
    url_for_project_issues:url_for_project_issues
} 
