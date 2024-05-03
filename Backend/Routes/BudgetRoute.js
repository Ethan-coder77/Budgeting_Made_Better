const {Router} = require("express");

const { getBudget, saveBudget, updateBudget, deleteBudget } = require("../Controller/BudgetController");

const router = Router();

router.get("/budget/:email", getBudget);
router.post("/save", saveBudget);
router.put("/update/:id", updateBudget);
router.delete("/delete/:id", deleteBudget);

module.exports = router;