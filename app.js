const express = require("express");
const helmet = require("helmet");
const transactionRoutes = require("./transaction-service/transaction-routes/transactionRoutes");
const clientRoutes = require("./client-service/client-routes/clientRoutes");
const accountRoutes = require("./account-service/account-routes/accountRoutes");

const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./db/database");
const cors = require("cors");
require("dotenv").config();

connectDB();

const app = express();
app.use(helmet());
app.use(express.json());
app.use(errorHandler);
app.use(cors());

app.use("/transactions", transactionRoutes);
app.use("/accounts", accountRoutes);
app.use("/clients", clientRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
