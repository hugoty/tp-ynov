const express = require('express');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Créer une nouvelle commande
router.post('/', authMiddleware, orderController.createOrder);

// Récupérer les commandes de l'utilisateur connecté
router.get('/myorders', authMiddleware, orderController.getUserOrders);

// Récupérer une commande spécifique par son ID
router.get('/:id', authMiddleware, orderController.getOrderById);

// Mettre à jour le statut d'une commande
router.put('/:id', authMiddleware, orderController.updateOrderStatus);

module.exports = router;
