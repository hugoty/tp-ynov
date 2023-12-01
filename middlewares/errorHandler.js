const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).send('Une erreur est survenue');
};

module.exports = errorHandler;
