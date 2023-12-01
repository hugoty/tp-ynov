const Article = require('../models/article');

const articleController = {
    getAllArticles: async (req, res) => {
        try {
            const articles = await Article.find();
            res.json(articles);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    addArticle: async (req, res) => {
        try {
            const { nom, prix, quantite, description, categorie } = req.body;
            const newArticle = new Article({
                nom,
                prix,
                quantite,
                description,
                categorie
            });

            await newArticle.save();
            res.status(201).json(newArticle);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    getArticleByName: async (req, res) => {
        try {
            const article = await Article.findOne({ nom: req.params.nom });
            if (article) {
                res.json(article);
            } else {
                res.status(404).send('Article non trouvé');
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    updateArticle: async (req, res) => {
        try {
            const article = await Article.findOneAndUpdate(
                { nom: req.params.nom },
                { $set: req.body },
                { new: true }
            );
            if (article) {
                res.json(article);
            } else {
                res.status(404).send('Article non trouvé');
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
};

module.exports = articleController;
