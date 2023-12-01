const Transaction = require("../transaction-model/transaction");
const Account = require("../../account-service/account-model/account");

// Ajouter une transaction
exports.createTransaction = async (req, res) => {
  try {
    const { accountId, amount } = req.body;

    // Créer une nouvelle transaction
    const transaction = new Transaction({ account: accountId, amount });
    await transaction.save();

    // Mettre à jour le solde du compte
    const account = await Account.findById(accountId);
    account.balance += amount;
    await account.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir toutes les transactions pour un compte
exports.getTransactionsByAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const transactions = await Transaction.find({ account: accountId });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;

    // Trouver la transaction et vérifier son existence
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Si la transaction existe, la supprimer
    await Transaction.findByIdAndRemove(transactionId);

    // Mise à jour du solde du compte après la suppression de la transaction
    const account = await Account.findById(transaction.account);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    // Assurez-vous de gérer correctement les crédits et les débits
    account.balance -= transaction.amount;
    await account.save();

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//
