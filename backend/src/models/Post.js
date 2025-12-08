const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
    title : {type : String, required : true, trim : true},
    content : {type:String, required : true},
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    category: {type:String},
    tags : {type : [String], default : [] },
    
    
}, {timestamps : true})


const Post = mongoose.model('Post', PostSchema);


module.exports = Post;