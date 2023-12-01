require("dotenv").config(); // Assurez-vous d'installer le package dotenv si ce n'est pas déjà fait
const express = require("express");
const connectDB = require("./database"); // Assurez-vous que le chemin est correct
const transactionRouter = require("./transaction-routes/transactionRoutes"); // Assurez-vous que le chemin est correct

const app = express();
app.use(express.json());

connectDB();

app.use("/api/transactions", transactionRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Transaction service listening on port ${PORT}`);
});

module.exports = app;
