const BudgetModel = require("../Models/BudgetModel")


module.exports.getBudget = async (req, res) => {

    var email = req.params.email;
    console.log(email);

    const Budgets = await BudgetModel.find();


    var BudgetsReturn = [];

    for (var i = 0; i < Budgets.length; i ++) {
        if (Budgets[i].email === email) {
            BudgetsReturn.push(Budgets[i]);
        } 
    }
    res.send(BudgetsReturn)
};

module.exports.saveBudget = async (req, res) => {
    const { budgetName, budgetAmount, budgetCurrentAmount, status, email, expenditures, receipts } = req.body;
    BudgetModel.create({ budgetName, budgetAmount, budgetCurrentAmount, status, email, expenditures, receipts })
    .then((data) => {
        console.log("Saved Data...");
        res.status(201).send(data)
    }).catch((err) =>{
        console.log(err);
        res.send({error: err, msg: "Something went wrong"});
    });
};


module.exports.updateBudget = async (req, res) => {
    const { id } = req.params;
    const { budgetName, budgetAmount, budgetCurrentAmount, status, expenditures, receipts } = req.body;

    try {
        // Treat each expenditure as a new object without _id
        const updatedExpenditures = expenditures.map(expenditure => ({
            name: expenditure.name,
            amount: expenditure.amount || 0
        }));

        await BudgetModel.findByIdAndUpdate(id, { budgetName, budgetAmount, budgetCurrentAmount, status, expenditures: updatedExpenditures, receipts });
        res.send("Updated Data");
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "An error occurred while updating the budget" });
    }
};



module.exports.deleteBudget = async (req, res) => {
    const {id} = req.params
    BudgetModel.findByIdAndDelete(id)
    .then(() => res.send("Deleted Data"))

    .catch((err) =>{
        console.log(err);
        res.send({error: err, msg: "Something went wrong"});
    });
};
module.exports.getBudgetById = async (req, res) => {
    const budgetId = req.params.id;
  
    try {
      const budget = await BudgetModel.findById(budgetId);
      if (budget) {
        res.send(budget);
      } else {
        res.status(404).send({ error: "Budget not found" });
      }
    } catch (err) {
      res.status(500).send({ error: "Something went wrong" });
    }
  };

module.exports.addExpenditure = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, amount } = req.body;
        const budget = await BudgetModel.findById(id);
        if (!budget) {
            return res.status(404).send({ msg: "Budget not found" });
        }
        budget.expenditures.push({ name, amount });
        await budget.save();
        res.status(201).send(budget);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err, msg: "Something went wrong" });
    }
};

module.exports.deleteExpenditure = async (req, res) => {
    try {
        const { id, expenditureId } = req.params;
        const budget = await BudgetModel.findById(id);
        if (!budget) {
            return res.status(404).send({ msg: "Budget not found" });
        }
        const expenditure = budget.expenditures.id(expenditureId);
        if (!expenditure) {
            return res.status(404).send({ msg: "Expenditure not found" });
        }
        expenditure.remove();
        await budget.save();
        res.send(budget);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err, msg: "Something went wrong" });
    }
};
module.exports.updateExpenditures = async (req, res) => {
    const { budgetId } = req.params;
    const { totalExpenditures } = req.body;
  
    try {
      const budget = await BudgetModel.findById(budgetId);
      if (!budget) {
        return res.status(404).send({ error: "Budget not found" });
      }
  
      budget.budgetCurrentAmount += totalExpenditures;
  
      // Reset expenditure amounts
      budget.expenditures.forEach(expenditure => {
        expenditure.amount = 0;
      });
  
      await budget.save();
      res.send(budget);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "An error occurred while updating expenditures" });
    }
  };

module.exports.addReceipt = async (req, res) => {
    try {
        const { id } = req.params;
        const { grandTotal, date } = req.body;
        const budget = await BudgetModel.findById(id);
        if (!budget) {
            return res.status(404).send({ msg: "Budget not found" });
        }
        budget.receipts.push({ grandTotal, date });
        await budget.save();
        res.status(201).send(budget);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err, msg: "Something went wrong" });
    }
};

module.exports.deleteReceipt = async (req, res) => {
    try {
        const { id, receiptId } = req.params;
        const budget = await BudgetModel.findById(id);
        if (!budget) {
            return res.status(404).send({ msg: "Budget not found" });
        }
        const receipt = budget.receipts.id(receiptId);
        if (!receipt) {
            return res.status(404).send({ msg: "Receipt not found" });
        }
        receipt.remove();
        await budget.save();
        res.send(budget);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err, msg: "Something went wrong" });
    }
};