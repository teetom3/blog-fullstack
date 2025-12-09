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

const getAllPost = async (req,res) => {

    try {


        const posts = await Post.find().sort({createdAt: -1}).populate('author', 'username email');
        if(posts.length === 0){
            return res.status(400).json({message : 'Aucun Posts'})
        }
    
        return res.status(200).json({
            posts,
            count : posts.length
        })

    }catch(error){
        res.status(500).json({message : 'Impossible de trouvé des articles '})
    }

}

const getPostById = async (req,res) => {
    try{
        const {id} = req.params
        const post = await Post.findById(id).populate('author', 'username email')
        if(!post){
            return res.status(404).json({message : 'Le post n\'existe pas'})
        }
        return res.status(200).json({
            message : 'Article trouvé avec succés',
            post
        })
    }catch(error){
        return res.status(500).json({message : 'Erreur lors de la recherche du Post'})
    }
}

const updatePost = async (req, res) => {
    try {

        const {id} = req.params;
        const post = await Post.findById(id).populate('author', 'username email');
        
        if (req.user._id.toString() !== post.author._id.toString()){
            return res.status(403).json({ message:'Non autorisé'})
        }
       
        const {title, content, category, tags} = req.body;

        const updatedPost = await Post.findByIdAndUpdate(id, {
            title,
            content,category,tags
        },{new : true})
        return res.json({ updatedPost, message : 'Article modifié avec succés'})
    }catch(error){
        return res.status(500).json({
            message : 'Erreur lors de la modification du Post'
        })
    }
}

const deletePost = async(req, res) => {

    try{
   const {id} = req.params;
        const post = await Post.findById(id);
        if (!post) {
    return res.status(404).json({ 
        message: 'Article introuvable' 
    });
}
        if (req.user._id.toString() !== post.author._id.toString()){
            return res.status(403).json({ message:'Non autorisé'})
        }

        await Post.findByIdAndDelete(id);
        return res.status(200).json({message : 'article supprimé avec succés'})
    }catch(error){
          return res.status(500).json({
            message : 'Erreur lors de la supression du Post'
        })
    }
     

}


module.exports = {createPost, getAllPost, getPostById, updatePost, deletePost};