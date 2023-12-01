const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        unique: true,
    },
    prix: {
        type: Number,
        required: true,
    },
    quantite: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    categorie: {
        type: String,
        required: true,
    },
    image: String
});

module.exports = mongoose.model('Article', articleSchema);
