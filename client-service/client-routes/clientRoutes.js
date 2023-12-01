const express = require("express");
const clientController = require("../client-controller/clientController");
const authMiddleware = require("../../middlewares/authMiddleware"); // Middleware d'authentification

const router = express.Router();

// Inscription d'un nouvel Client
router.post("/register", clientController.register);

// Connexion de l'Client
router.post("/login", clientController.login);

// Récupérer les informations de l'Client connecté
router.get("/me", authMiddleware, clientController.getMe);

// Mettre à jour le profil de l'Client connecté
router.put("/me", authMiddleware, clientController.updateMe);

// Supprimer le compte de l'Client connecté
router.delete("/me", authMiddleware, clientController.deleteMe);

module.exports = router;
