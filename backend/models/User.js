const mongoose = require('mongoose');

const { Schema } = mongoose;


const UserSchema = new Schema({
    username : { type : String, required : true, unique : true, trim : true},
    email : {type : String, required : true, unique : true, trim : true, lowercase : true},
    password : { type : String, required : true, minLength : 6 },
    createdAt : { type : Date, default : Date.now}

})

const User = mongoose.model('User', UserSchema);

module.exports = User;