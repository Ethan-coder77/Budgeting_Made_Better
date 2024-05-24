const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenditureSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

const ReceiptSchema = new Schema({
    grandTotal: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const BudgetSchema = new Schema({
    budgetName: {
        type: String,
        required: true
    },
    budgetAmount: {
        type: Number,
        required: true
    },
    budgetCurrentAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    expenditures: [ExpenditureSchema],
    receipts: [ReceiptSchema]
});

const userSchema = new Schema ({

});

module.exports = mongoose.model("Budget", BudgetSchema);