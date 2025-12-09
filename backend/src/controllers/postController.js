const Post = require('../models/Post');



const createPost = async(req, res) => {

    try{
const { title, content, category, tags} = req.body;

if(!title || !content){
    return res.status(400).json({message : 'Titre ou article manquant'})
}

const newPost = await Post.create({
    title : title ,
    content : content,
    author : req.user._id,
    category,
    tags

});


await newPost.populate('author', 'username email');
return res.status(201).json({message : 'Post crée avec succés',
    post : newPost
})
    }catch(error){
   console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
    }
    
}

module.exports = {createPost};