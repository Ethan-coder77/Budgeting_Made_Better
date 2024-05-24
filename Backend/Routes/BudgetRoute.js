const { Router } = require("express");
const { getBudget, getBudgetById, saveBudget, updateBudget, deleteBudget, addExpenditure, deleteExpenditure,updateExpenditures, addReceipt, deleteReceipt } = require("../Controller/BudgetController");

const router = Router();

// Budget routes
router.get("/budget/:email", getBudget);
router.get('/budget/id/:id', getBudgetById); // Note the route change
router.post("/save", saveBudget);
router.put("/update/:id", updateBudget);
router.delete("/delete/:id", deleteBudget);

// Expenditure routes
router.post("/budget/:id/expenditure", addExpenditure);
router.delete("/budget/:id/expenditure/:expenditureId", deleteExpenditure);
router.put("/budget/update-expenditures/:budgetId",updateExpenditures);


// Receipt routes
router.post("/budget/:id/receipt", addReceipt);
router.delete("/budget/:id/receipt/:receiptId", deleteReceipt);

module.exports = router;
