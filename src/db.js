var mongoose = require('mongoose'),  
db = mongoose.createConnection('127.0.0.1', 'jira');
db.on('error', console.error.bind(console, 'connection error:'));  
module.exports = db;