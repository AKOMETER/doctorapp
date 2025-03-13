const Transaction = require("../database/models/Transaction");
const User = require("../database/models/User");

const TransactionController = {
  // GET /transactions/
  index: async (req, res) => {
    try {
      const transactions = await Transaction.findAll();
      return res.json(transactions);
    } catch (err) {
      return res
        .status(500)
        .json({ msg: "Failed to fetch transactions", error: err.message });
    }
  },

  // GET /transactions/:id
  show: async (req, res) => {
    try {
      const transaction = await Transaction.findByPk(req.params.id);
      if (!transaction)
        return res.status(404).json({ msg: "Transaction not found" });
      return res.json(transaction);
    } catch (err) {
      return res
        .status(500)
        .json({ msg: "Error fetching transaction", error: err.message });
    }
  },

  // GET /transactions/get_by_user_id/:id
  showByUserID: async (req, res) => {
    try {
      const transactions = await Transaction.findAll({
        where: { userId: req.params.id },
      });
      return res.json(transactions);
    } catch (err) {
      return res
        .status(500)
        .json({ msg: "Error fetching user transactions", error: err.message });
    }
  },

  // POST /transactions/
  store: async (req, res) => {
    try {
      const { userId, paymentMethodId, amount, currency, reference, status } =
        req.body;

      if (!userId || !paymentMethodId || !amount || !reference) {
        return res.status(400).json({ msg: "Required fields are missing" });
      }

      const transaction = await Transaction.create({
        userId,
        paymentMethodId,
        amount,
        currency: currency || "USD",
        status: status || "pending",
        reference,
      });

      // ✅ If transaction is successful, update user's amount
      if (status === "success") {
        const user = await User.findByPk(userId);
        if (user) {
          const currentAmount = parseFloat(user.amount || 0);
          const newAmount = currentAmount + parseFloat(amount);
          user.amount = newAmount.toFixed(2);
          await user.save();
        }
      }

      return res.status(201).json({
        msg: "Transaction created",
        data: transaction,
      });
    } catch (err) {
      return res.status(500).json({
        msg: "Error creating transaction",
        error: err.message,
      });
    }
  },

  // PUT /transactions/:id
  update: async (req, res) => {
    try {
      const transaction = await Transaction.findByPk(req.params.id);
      if (!transaction)
        return res.status(404).json({ msg: "Transaction not found" });

      const { paymentMethodId, amount, currency, status, reference } = req.body;

      transaction.paymentMethodId =
        paymentMethodId || transaction.paymentMethodId;
      transaction.amount = amount || transaction.amount;
      transaction.currency = currency || transaction.currency;
      transaction.status = status || transaction.status;
      transaction.reference = reference || transaction.reference;

      await transaction.save();

      return res.json({ msg: "Transaction updated", data: transaction });
    } catch (err) {
      return res.status(500).json({ msg: "Update failed", error: err.message });
    }
  },

  // PUT /transactions/admin/:id
  adminUpdate: async (req, res) => {
    try {
      const transaction = await Transaction.findByPk(req.params.id);
      if (!transaction)
        return res.status(404).json({ msg: "Transaction not found" });

      Object.assign(transaction, req.body); // admin override
      await transaction.save();

      return res.json({ msg: "Admin update successful", data: transaction });
    } catch (err) {
      return res
        .status(500)
        .json({ msg: "Admin update failed", error: err.message });
    }
  },

  // DELETE /transactions/:id
  destroy: async (req, res) => {
    try {
      const transaction = await Transaction.findByPk(req.params.id);
      if (!transaction)
        return res.status(404).json({ msg: "Transaction not found" });

      await transaction.destroy();
      return res.json({ msg: "Transaction deleted successfully" });
    } catch (err) {
      return res.status(500).json({ msg: "Delete failed", error: err.message });
    }
  },
};

module.exports = TransactionController;
