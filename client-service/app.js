require("dotenv").config(); // Assurez-vous d'installer le package dotenv si ce n'est pas déjà fait
const express = require("express");
const connectDB = require("./database"); // Assurez-vous que le chemin est correct
const clientRoutes = require("./client-routes/clientRoutes"); // Assurez-vous que le chemin est correct

const app = express();
app.use(express.json());

connectDB();

app.use("/api/clients", clientRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Client service listening on port ${PORT}`);
});

module.exports = app;
