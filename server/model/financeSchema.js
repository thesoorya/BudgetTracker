const mongoose = require("mongoose");

const financeSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    date: { type: Date },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    isCreditedOrDebited: { type: String, required: true },
    transactionMonth: { type: Number }
  },
  { timeStamps: true }
);

financeSchema.pre("save", function (next) {
  const transactionDate = this.date;
  const month = transactionDate.getUTCMonth() + 1;
  this.transactionMonth = month;
  next();
});

const Finance = mongoose.model("Finance", financeSchema);

module.exports = Finance;
