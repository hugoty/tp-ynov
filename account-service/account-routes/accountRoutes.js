const express = require("express");
const router = express.Router();
const accountController = require("../account-controller/accountController");

// Route pour créer un nouveau compte
router.post("/", accountController.createAccount);

// Route pour obtenir les détails d'un compte
router.get("/:accountId", accountController.getAccount);

// Route pour mettre à jour un compte
router.put("/:accountId", accountController.updateAccount);

// Route pour supprimer un compte
router.delete("/:accountId", accountController.deleteAccount);

module.exports = router;
