const User = require("../models/User");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email et password sont obligatoires",
      });
    }

    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Un utilisateur existe deja avec cette email" });
    }
    if (!username.trim() || !email.trim() || !password.trim()) {
      return res.status(400).json({
        message: "les champs ne peuvent pas être vides",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "L'email n'est pas valide" });
    }

    if (password.length <= 6) {
      return res.status(400).json({
        message: "Le mot de passe doit contenir 6 caractères minimum",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });
    res.status(201).json({
      message: "Utilisateur crée avec succés",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = { register };
