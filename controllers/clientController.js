const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ClientModel = require("../models/client");

const clientController = {
  // Inscription d'un nouvel Client
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
        // Remarquez le changement ici, newClient au lieu de Client
        nom,
        email,
        motDePasse: hashedPassword,
      });

      await newClient.save(); // Et ici, newClient au lieu de Client
      res.status(201).send("Client créé avec succès.");
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Connexion du client
  login: async (req, res) => {
    try {
      const { email, motDePasse } = req.body;
      const client = await ClientModel.findOne({ email }); // Remarquez le changement ici, client au lieu de Client

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
