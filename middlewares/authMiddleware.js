const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        // Récupérer le token de l'en-tête Authorization
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).send('Accès refusé. Aucun token fourni.');
        }

        const token = authHeader.split(' ')[1];

        // Vérifier le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Ajouter l'ID de l'utilisateur à l'objet de requête
        req.userId = decoded.id;

        next();
    } catch (err) {
        res.status(400).send('Token invalide.');
    }
};

module.exports = authMiddleware;
