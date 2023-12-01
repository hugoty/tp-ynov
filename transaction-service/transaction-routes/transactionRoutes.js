const express = require("express");
const router = express.Router();
const transactionController = require("../transaction-controller/transactionController");
const authMiddleware = require("../../middlewares/authMiddleware"); // Middleware d'authentification

// Route pour créer une transaction
router.post("/", authMiddleware, transactionController.createTransaction);

// Route pour obtenir toutes les transactions pour un compte
router.get(
  "/:accountId",
  authMiddleware,
  transactionController.getTransactionsByAccount
);

// Route pour supprimer une transaction (optionnel)
router.delete(
  "/:transactionId",
  authMiddleware,
  transactionController.deleteTransaction
);

module.exports = router;
