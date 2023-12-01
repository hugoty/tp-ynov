const express = require("express");
const router = express.Router();
const transactionController = require("../transaction-controller/transactionController");

// Route pour créer une transaction
router.post("/", transactionController.createTransaction);

// Route pour obtenir toutes les transactions pour un compte
router.get("/:accountId", transactionController.getTransactionsByAccount);

// Route pour supprimer une transaction (optionnel)
router.delete("/:transactionId", transactionController.deleteTransaction);

module.exports = router;
