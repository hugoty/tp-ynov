const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Utilisateur'
    },
    articles: [
        {
            article: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Article'
            },
            quantite: {
                type: Number,
                required: true,
            }
        }
    ]
});

module.exports = mongoose.model('Panier', cartSchema);
