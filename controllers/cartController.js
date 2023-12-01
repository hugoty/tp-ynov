const Panier = require('../models/cart');
const Article = require('../models/article');

const cartController = {
    // Ajouter un article au panier
    addToCart: async (req, res) => {
        try {
            const { articleId, quantite } = req.body;

            // Récupérer le panier de l'utilisateur ou en créer un nouveau
            let panier = await Panier.findOne({ utilisateur: req.userId });
            if (!panier) {
                panier = new Panier({
                    utilisateur: req.userId,
                    articles: []
                });
            }

            // Vérifier si l'article existe déjà dans le panier
            const articleIndex = panier.articles.findIndex(item => item.article.toString() === articleId);
            if (articleIndex > -1) {
                // Mise à jour de la quantité si l'article est déjà dans le panier
                panier.articles[articleIndex].quantite += quantite;
            } else {
                // Ajouter l'article au panier
                panier.articles.push({ article: articleId, quantite });
            }

            await panier.save();
            res.status(201).send('Article ajouté au panier');
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    // Obtenir le panier de l'utilisateur
    getCart: async (req, res) => {
        try {
            const panier = await Panier.findOne({ utilisateur: req.userId }).populate('articles.article');
            if (!panier) {
                return res.status(404).send('Panier non trouvé');
            }

            res.json(panier);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    // Mettre à jour un article dans le panier
    updateCartItem: async (req, res) => {
        try {
            const { articleId, quantite } = req.body;

            const panier = await Panier.findOne({ utilisateur: req.userId });
            if (!panier) {
                return res.status(404).send('Panier non trouvé');
            }

            // Mise à jour de la quantité de l'article
            const articleIndex = panier.articles.findIndex(item => item.article.toString() === articleId);
            if (articleIndex > -1) {
                panier.articles[articleIndex].quantite = quantite;
                await panier.save();
                res.send('Quantité mise à jour dans le panier');
            } else {
                res.status(404).send('Article non trouvé dans le panier');
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    // Supprimer un article du panier
    removeCartItem: async (req, res) => {
        try {
            const { articleId } = req.params;

            const panier = await Panier.findOne({ utilisateur: req.userId });
            if (!panier) {
                return res.status(404).send('Panier non trouvé');
            }

            // Supprimer l'article du panier
            panier.articles = panier.articles.filter(item => item.article.toString() !== articleId);
            await panier.save();
            res.send('Article supprimé du panier');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
};

module.exports = cartController;
