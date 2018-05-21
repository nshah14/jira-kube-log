
const mongoose = require("mongoose"),
Schema = mongoose.Schema;

// create a schema for Dish
let userSchema = new Schema({
    name  : String,
    surname: String,
    created_date: Date
});

// Create a model using schema
let User = mongoose.model("users", userSchema);

// make this model available
module.exports = User;