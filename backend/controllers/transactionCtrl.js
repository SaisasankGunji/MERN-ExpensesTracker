const asyncHandler = require("express-async-handler");
const Transaction = require("../model/Transaction");

const transactionController = {
  //! Add Transaction
  create: asyncHandler(async (req, res) => {
    const { type, category, amount, date, description } = req.body;

    if (!amount || !type || !date) {
      res.status(400);
      throw new Error("Type, amount, and date are required");
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      type,
      category,
      amount,
      date,
      description,
    });

    res.status(201).json(transaction);
  }),

  //! Get Filtered Transactions
  getFilteredTransactions: asyncHandler(async (req, res) => {
    const { startDate, endDate, type, category } = req.query;
    let filters = { user: req.user._id };

    if (startDate) {
      filters.date = { ...filters.date, $gte: new Date(startDate) };
    }
    if (endDate) {
      filters.date = { ...filters.date, $lte: new Date(endDate) };
    }
    if (type) {
      filters.type = type;
    }
    if (category) {
      if (category !== "All") {
        filters.category =
          category === "Uncategorized" ? "Uncategorized" : category;
      }
    }

    const transactions = await Transaction.find(filters).sort({ date: -1 });
    res.json(transactions);
  }),

  //! Update Transaction
  update: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction || transaction.user.toString() !== req.user.id) {
      res.status(404);
      throw new Error("Transaction not found or user not authorized");
    }

    transaction.type = req.body.type || transaction.type;
    transaction.category = req.body.category || transaction.category;
    transaction.amount = req.body.amount || transaction.amount;
    transaction.date = req.body.date || transaction.date;
    transaction.description = req.body.description || transaction.description;

    const updatedTransaction = await transaction.save();
    res.status(200).json(updatedTransaction);
  }),

  //! Delete Transaction
  delete: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction || transaction.user.toString() !== req.user.id) {
      res.status(404);
      throw new Error("Transaction not found or user not authorized");
    }

    await transaction.deleteOne();
    res.status(200).json({ message: "Transaction removed successfully" });
  }),
};

module.exports = transactionController;
