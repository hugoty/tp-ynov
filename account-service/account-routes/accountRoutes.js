const express = require("express");
const router = express.Router();
const accountController = require("../account-controller/accountController");
const authMiddleware = require("../../middlewares/authMiddleware"); // Middleware d'authentification

// Route pour créer un nouveau compte
router.post("/", authMiddleware, accountController.createAccount);

// Route pour obtenir les détails d'un compte
router.get("/:accountId", authMiddleware, accountController.getAccount);

// Route pour mettre à jour un compte
router.put("/:accountId", authMiddleware, accountController.updateAccount);

// Route pour supprimer un compte
router.delete("/:accountId", authMiddleware, accountController.deleteAccount);

module.exports = router;
