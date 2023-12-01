const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    account: { type: Schema.Types.ObjectId, ref: "Account" },
    amount: Number, // Positive for credit, negative for debit
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
