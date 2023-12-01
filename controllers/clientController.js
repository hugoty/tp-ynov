const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Client = require("../models/client");

const clientController = {
  // Inscription d'un nouvel Client
  register: async (req, res) => {
    try {
      const { nom, email, motDePasse } = req.body;

      // Vérifier si l'Client existe déjà
      const clientExists = await Client.findOne({ email });
      if (clientExists) {
        return res.status(400).send("Un Client avec cet email existe déjà.");
      }

      // Hashage du mot de passe
      const hashedPassword = await bcrypt.hash(motDePasse, 12);

      // Création de l'Client
      const Client = new Client({
        nom,
        email,
        motDePasse: hashedPassword,
      });

      await Client.save();
      res.status(201).send("Client créé avec succès.");
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Connexion de l'Client
  login: async (req, res) => {
    try {
      const { email, motDePasse } = req.body;
      const Client = await Client.findOne({ email });

      if (!Client || !(await bcrypt.compare(motDePasse, Client.motDePasse))) {
        return res.status(401).send("Email ou mot de passe incorrect.");
      }

      // Générer un token JWT en utilisant le secret stocké dans les variables d'environnement
      const token = jwt.sign({ id: clientId }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ message: "Connecté avec succès", token });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Récupération des informations de l'Client connecté
  getMe: async (req, res) => {
    try {
      // L'Client est attaché à la requête dans le middleware d'authentification
      res.json(req.Client);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Mise à jour du profil de l'Client
  updateMe: async (req, res) => {
    try {
      const { nom, email } = req.body;
      const Client = await Client.findByIdAndUpdate(
        req.clientId,
        { nom, email },
        { new: true }
      );

      res.json(Client);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Suppression du compte Client
  deleteMe: async (req, res) => {
    try {
      await Client.findByIdAndDelete(req.clientId);
      res.send("Compte Client supprimé.");
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};

module.exports = clientController;
