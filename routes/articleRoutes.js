const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// Route pour obtenir tous les articles
router.get('/', articleController.getAllArticles);

// Route pour ajouter un article
router.post('/add', articleController.addArticle);

// Route pour obtenir un article spécifique par son nom
router.get('/:nom', articleController.getArticleByName);

// Route pour mettre à jour un article spécifique par son nom
router.put('/:nom', articleController.updateArticle);



module.exports = router;
