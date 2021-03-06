
/*globals  require, exports */

const mongoose = require("mongoose"),
    config = require("./configdb.js"),
    User = require("./user.js");



    // Function to establish connection for the Database
exports.connectToDb = function (callback) {
    // If the connection is already established, Then don't create one more connection
    if (mongoose.connection.readyState) {
        callback(undefined, { msg: "connected", code: 200 });
        return;
    }
    // Establish the DB connection
    mongoose.connect(config.dbPath);
    // Event for successfully connecting database
    mongoose.connection.on("connected", function () {
        callback(undefined, { msg: "connected", code: 200 });
    });
    // Event when there is an error connecting for database
    mongoose.connection.on("error", function (err) {
        console.log("[connectToDb] Error connecting to DB " + err);
        callback(err);
    });
};


exports.getUser = function (user, callback) {
    // Fetch the dish inforation
    User.find({name: user}, function (err, success) {
        if (err) {
            utils.log("[getDoc] Error fetching the doc " + err);
            callback(err);
            return;
        }
        callback(undefined, success);
    });
};


exports.createUser = function(userName, userinfo, callback) {
    let user;
    let date = new Date().toISOString();
    // To create the model for new Dish
    user = User({
        "name"  : userName,
        "surname" : userinfo.surname,
        "created_date" : date
    });
    // Saving the Dish model
    user.save(function (err, success) {
        if (err) {
            console.log("[createDish] Error creating the doc " + err);
            callback(err);
            return;
        }
        callback(undefined, success);
    });
}