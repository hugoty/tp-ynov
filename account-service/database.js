const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://dbtpAL:ZEVFaruspZabRGEl@clustertp.2akw8ou.mongodb.net/dbTpAlDB?retryWrites=true&w=majority');
;
        console.log('Connecté à MongoDB');
    } catch (err) {
        console.error('Erreur de connexion à MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
