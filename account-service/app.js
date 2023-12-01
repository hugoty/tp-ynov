require("dotenv").config(); // Assurez-vous d'installer le package dotenv si ce n'est pas déjà fait
const express = require("express");
const connectDB = require("./database"); // Assurez-vous que le chemin est correct
const accountRouter = require("./account-routes/accountRoutes"); // Assurez-vous que le chemin est correct

const app = express();
app.use(express.json());

connectDB();

app.use("/api/accounts", accountRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Client service listening on port ${PORT}`);
});

module.exports = app;
