const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ClientModel = require("../models/client"); // Utilisation de ClientModel pour référencer le modèle Mongoose

const clientController = {
  // Inscription d'un nouvel client
  register: async (req, res) => {
    try {
      const { nom, email, motDePasse } = req.body;

      // Vérifier si le client existe déjà
      const clientExists = await ClientModel.findOne({ email });
      if (clientExists) {
        return res.status(400).send("Un client avec cet email existe déjà.");
      }

      // Hashage du mot de passe
      const hashedPassword = await bcrypt.hash(motDePasse, 12);

      // Création du client
      const newClient = new ClientModel({
        nom,
        email,
        motDePasse: hashedPassword,
      });

      await newClient.save();
      res.status(201).send("Client créé avec succès.");
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Connexion du client
  login: async (req, res) => {
    try {
      const { email, motDePasse } = req.body;
      const client = await ClientModel.findOne({ email });

      if (!client || !(await bcrypt.compare(motDePasse, client.motDePasse))) {
        return res.status(401).send("Email ou mot de passe incorrect.");
      }

      // Générer un token JWT
      const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ message: "Connecté avec succès", token });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Récupération des informations du client connecté
  getMe: async (req, res) => {
    try {
      // L'identifiant du client est attaché à la requête dans le middleware d'authentification
      const client = await ClientModel.findById(req.clientId);
      if (!client) {
        return res.status(404).send("Client non trouvé.");
      }
      res.json(client);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Mise à jour du profil du client
  updateMe: async (req, res) => {
    try {
      const { nom, email } = req.body;
      const client = await ClientModel.findByIdAndUpdate(
        req.clientId,
        { nom, email },
        { new: true }
      );

      if (!client) {
        return res.status(404).send("Client non trouvé.");
      }

      res.json(client);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Suppression du compte client
  deleteMe: async (req, res) => {
    try {
      await ClientModel.findByIdAndDelete(req.clientId);
      res.send("Compte client supprimé.");
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};

module.exports = clientController;
