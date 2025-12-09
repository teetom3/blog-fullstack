const jwt = require("jsonwebtoken");
const User = require('../models/User')

const JWT_SECRET = process.env.JWT_SECRET
const protect = async( req, res , next) => {
    
    try {
       const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({message : 'Requete non authorisé, aucun token fourni'})
        }
        const token = authHeader.split(' ')[1]

      const decoded =  jwt.verify(token, JWT_SECRET)

      const user = await User.findById(decoded.id).select('-password')

      if(!user){
        return res.status(401).json({message : 'Utilisateur introuvable'})
      }

      req.user = user;

      next();
    }catch(error){
        console.error('Erreur middleware auth:', error);
        return res.status(401).json({
            message : 'non authorisé, token invalide'
        });
    }

};

module.exports = {protect};