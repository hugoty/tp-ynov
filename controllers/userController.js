const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/user');

const userController = {
    // Inscription d'un nouvel utilisateur
    register: async (req, res) => {
        try {
            const { nom, email, motDePasse } = req.body;

            // Vérifier si l'utilisateur existe déjà
            const userExists = await Utilisateur.findOne({ email });
            if (userExists) {
                return res.status(400).send('Un utilisateur avec cet email existe déjà.');
            }

            // Hashage du mot de passe
            const hashedPassword = await bcrypt.hash(motDePasse, 12);

            // Création de l'utilisateur
            const utilisateur = new Utilisateur({
                nom,
                email,
                motDePasse: hashedPassword,
            });

            await utilisateur.save();
            res.status(201).send('Utilisateur créé avec succès.');
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    // Connexion de l'utilisateur
    login: async (req, res) => {
        try {
            const { email, motDePasse } = req.body;
            const utilisateur = await Utilisateur.findOne({ email });

            if (!utilisateur || !await bcrypt.compare(motDePasse, utilisateur.motDePasse)) {
                return res.status(401).send('Email ou mot de passe incorrect.');
            }

            // Générer un token JWT en utilisant le secret stocké dans les variables d'environnement
            const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.json({ message: 'Connecté avec succès', token });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    // Récupération des informations de l'utilisateur connecté
    getMe: async (req, res) => {
        try {
            // L'utilisateur est attaché à la requête dans le middleware d'authentification
            res.json(req.utilisateur);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    // Mise à jour du profil de l'utilisateur
    updateMe: async (req, res) => {
        try {
            const { nom, email } = req.body;
            const utilisateur = await Utilisateur.findByIdAndUpdate(req.userId, { nom, email }, { new: true });

            res.json(utilisateur);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    // Suppression du compte utilisateur
    deleteMe: async (req, res) => {
        try {
            await Utilisateur.findByIdAndDelete(req.userId);
            res.send('Compte utilisateur supprimé.');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
};

module.exports = userController;
