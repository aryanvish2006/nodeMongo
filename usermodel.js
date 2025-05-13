const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name:String,
    age:String,
    education:String,
    imgUrl:String
});

module.exports = mongoose.model("user",userSchema);