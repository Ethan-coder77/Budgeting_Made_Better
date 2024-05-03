const BudgetModel = require("../Models/BudgetModel")

module.exports.getBudget = async (req, res) => {

    var email = req.params.email;
    console.log(email);

    const Budgets = await BudgetModel.find();


    //var Budget = Budgets.filter( function(bud){return (bud.email === email);} );
    var BudgetsReturn = [];

    for (var i = 0; i < Budgets.length; i ++) {
        //console.log(email);
        //console.log("email on budget",Budgets[i].email);
        //console.log(Budgets[i])
        if (Budgets[i].email === email) {
            BudgetsReturn.push(Budgets[i]);
            //Budget = Budgets[i];
            //console.log("match");
        } 
    }
    //console.log("***budget****", Budget);
    res.send(BudgetsReturn)
};

module.exports.saveBudget = async (req, res) => {
    const { budgetName, budgetAmount, budgetCurrentAmount, status, email } = req.body;
    BudgetModel.create({ budgetName, budgetAmount, budgetCurrentAmount, status, email })
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
    const { budgetName, budgetAmount, budgetCurrentAmount, status } = req.body;
    await BudgetModel.findByIdAndUpdate(id, { budgetName, budgetAmount, budgetCurrentAmount, status})
    .then(() => res.send("Updated Data"))

    .catch((err) =>{
        console.log(err);
        res.send({error: err, msg: "Something went wrong"});
    });
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

// module.exports.addExpenditure = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, amount } = req.body;
//         const budget = await BudgetModel.findById(id);
//         if (!budget) {
//             return res.status(404).send({ msg: "Budget not found" });
//         }
//         budget.expenditures.push({ name, amount });
//         await budget.save();
//         res.status(201).send(budget);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({ error: err, msg: "Something went wrong" });
//     }
// };

// module.exports.deleteExpenditure = async (req, res) => {
//     try {
//         const { id, expenditureId } = req.params;
//         const budget = await BudgetModel.findById(id);
//         if (!budget) {
//             return res.status(404).send({ msg: "Budget not found" });
//         }
//         const expenditure = budget.expenditures.id(expenditureId);
//         if (!expenditure) {
//             return res.status(404).send({ msg: "Expenditure not found" });
//         }
//         expenditure.remove();
//         await budget.save();
//         res.send(budget);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({ error: err, msg: "Something went wrong" });
//     }
// };

// module.exports.addReceipt = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { grandTotal, date } = req.body;
//         const budget = await BudgetModel.findById(id);
//         if (!budget) {
//             return res.status(404).send({ msg: "Budget not found" });
//         }
//         budget.receipts.push({ grandTotal, date });
//         await budget.save();
//         res.status(201).send(budget);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({ error: err, msg: "Something went wrong" });
//     }
// };

// module.exports.deleteReceipt = async (req, res) => {
//     try {
//         const { id, receiptId } = req.params;
//         const budget = await BudgetModel.findById(id);
//         if (!budget) {
//             return res.status(404).send({ msg: "Budget not found" });
//         }
//         const receipt = budget.receipts.id(receiptId);
//         if (!receipt) {
//             return res.status(404).send({ msg: "Receipt not found" });
//         }
//         receipt.remove();
//         await budget.save();
//         res.send(budget);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({ error: err, msg: "Something went wrong" });
//     }
// };