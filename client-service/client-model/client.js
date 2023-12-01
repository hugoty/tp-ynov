const mongoose = require("mongoose");
const { Schema } = mongoose;

const clientSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  motDePasse: {
    type: String,
    required: true,
  },
});
const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
