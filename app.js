const express = require("express");
require("dotenv").config(); // Assurez-vous d'installer le package dotenv si ce n'est pas déjà fait

const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Proxy endpoints
app.use(
  "/api/accounts",
  createProxyMiddleware({ target: "http://localhost:3001", changeOrigin: true })
);
app.use(
  "/api/clients",
  createProxyMiddleware({ target: "http://localhost:3002", changeOrigin: true })
);
app.use(
  "/api/transactions",
  createProxyMiddleware({ target: "http://localhost:3003", changeOrigin: true })
);

app.listen(3000, () => {
  console.log("API Gateway running on port 3000");
});
