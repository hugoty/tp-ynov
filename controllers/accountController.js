const Account = require("../models/account");

// Créer un nouveau compte
exports.createAccount = async (req, res) => {
  try {
    const { clientId, balance } = req.body;

    const newAccount = new Account({
      client: clientId,
      balance,
    });

    const account = await newAccount.save();
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir les détails d'un compte
exports.getAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un compte
exports.updateAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const { balance } = req.body;

    const account = await Account.findByIdAndUpdate(
      accountId,
      { balance },
      { new: true }
    );

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un compte
exports.deleteAccount = async (req, res) => {
  try {
    const { accountId } = req.params;

    const account = await Account.findByIdAndDelete(accountId);

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
