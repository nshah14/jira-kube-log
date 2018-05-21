

const connection = require("./connection.js");
exports.getUsers = function (req, res) {
    /* 
        Function to get the list of Dishes available
        curl -X GET http://localhost:3000/dishes/dish-name
    */
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
};


exports.updateUser = function (req, res) {
	console.log("is it coming here");
    /* 
        Function to Create / Update the informaton of a dish
        curl -X PUT http://localhost:3000/dishes/dishid
			 -H "Content-Type: application/json"	
		     -d '{
					"veg": true,
					"price": 100,
					"date": {
						"creationDate": "2017-04-20T17:25:15.417Z",
						"lastModifiedDate": "2017-04-20T17:25:15.417Z"
					},
					"user": {
						"createdBy": "shrisha.sb@gmail.com",
						"lastModifiedBy": "shrisha.sb@gmail.com"
					}
				}'
    */
	let user = req.params.id;
	if (!user) {
		res.status(400).json({msg: "Missing required parameter", status: "BAD_REQUEST"});
		return;
	}
	// To check if the connection is available / To establish the Database connection 
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
};
