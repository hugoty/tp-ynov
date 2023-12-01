const express = require('express');
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware d'authentification

const router = express.Router();

// Ajouter un article au panier
router.post('/', authMiddleware, cartController.addToCart);

// Obtenir le panier de l'utilisateur
router.get('/', authMiddleware, cartController.getCart);

// Mettre à jour un article dans le panier
router.put('/:articleId', authMiddleware, cartController.updateCartItem);

// Supprimer un article du panier
router.delete('/:articleId', authMiddleware, cartController.removeCartItem);

module.exports = router;
