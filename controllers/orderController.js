const Commande = require('../models/order');
const Article = require('../models/article');

const orderController = {
    // Créer une nouvelle commande
    createOrder: async (req, res) => {
        try {
            const { articlesCommandés, total } = req.body;

            // Vous pouvez ajouter ici une logique pour vérifier les stocks des articles

            const nouvelleCommande = new Commande({
                utilisateur: req.userId,
                articlesCommandés,
                total,
            });

            await nouvelleCommande.save();
            res.status(201).json(nouvelleCommande);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    // Récupérer les commandes de l'utilisateur connecté
    getUserOrders: async (req, res) => {
        try {
            const commandes = await Commande.find({ utilisateur: req.userId });
            res.json(commandes);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    // Récupérer une commande spécifique
    getOrderById: async (req, res) => {
        try {
            const commande = await Commande.findById(req.params.id);

            if (!commande) {
                return res.status(404).send('Commande non trouvée');
            }

            res.json(commande);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    // Mettre à jour le statut de la commande
    updateOrderStatus: async (req, res) => {
        try {
            const commande = await Commande.findById(req.params.id);

            if (!commande) {
                return res.status(404).send('Commande non trouvée');
            }

            commande.estLivré = req.body.estLivré;
            commande.dateLivraison = req.body.dateLivraison || commande.dateLivraison;

            await commande.save();
            res.send('Statut de la commande mis à jour');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
};

module.exports = orderController;
