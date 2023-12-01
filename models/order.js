const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Utilisateur'
    },
    articlesCommandés: [
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
    ],
    total: {
        type: Number,
        required: true,
    },
    estLivré: {
        type: Boolean,
        default: false,
    },
    dateLivraison: Date
});

module.exports = mongoose.model('Commande', orderSchema);
