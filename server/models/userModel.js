const mongoose = require('mongoose');

// user userSchema is a structure of our user it going to have name email etc...
const userSchema = mongoose.Schema({
    name : {
        type : String, // preferable
        required : true, //must
    },
    email:{
        type : String,
        required : true,
    },
    profilePic : {
        type : String,
        required : true,
    },
});

// now in which collection it will going to be stored defined below
const User = mongoose.model("User", userSchema); // model created
module.exports  = User; // it will make User variable entirely public it can be accessed now from anywhere