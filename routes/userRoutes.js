const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware d'authentification

const router = express.Router();

// Inscription d'un nouvel utilisateur
router.post('/register', userController.register);

// Connexion de l'utilisateur
router.post('/login', userController.login);

// Récupérer les informations de l'utilisateur connecté
router.get('/me', authMiddleware, userController.getMe);

// Mettre à jour le profil de l'utilisateur connecté
router.put('/me', authMiddleware, userController.updateMe);

// Supprimer le compte de l'utilisateur connecté
router.delete('/me', authMiddleware, userController.deleteMe);

module.exports = router;
