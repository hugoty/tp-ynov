const mongoose = require("mongoose");
const { Schema } = mongoose;

const accountSchema = new Schema(
  {
    client: { type: Schema.Types.ObjectId, ref: "client" },
    balance: Number, // Simple balance field without currency or other specifics
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);
