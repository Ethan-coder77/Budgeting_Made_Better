import React, { useState } from 'react';
import './AddNew.css'; // Import CSS file for styling if needed

const AddNew = ({updateBudget, expenditures }) => {
  const [expenditureAmounts, setExpenditureAmounts] = useState({});
    console.log("Update Budget", updateBudget);
  const handleExpenditureChange = (expenditureId, amount) => {
    setExpenditureAmounts(prevState => ({
      ...prevState,
      [expenditureId]: parseFloat(amount)
    }));
  };

  const handleAddToCurrentAmount = () => {
    let totalAmount = updateBudget.budgetCurrentAmount;

    for (const expenditureId in expenditureAmounts) {
      totalAmount += expenditureAmounts[expenditureId];
    }

    return totalAmount;
  };

  const handleResetExpenditureAmounts = () => {
    setExpenditureAmounts({});
  };

  const handleSubmit = () => {
    const updatedBudget = {
      ...updateBudget,
      budgetCurrentAmount: handleAddToCurrentAmount()
    };
    updateBudget(updatedBudget);
    handleResetExpenditureAmounts();
  };

  return (
    <div>
      <h2>Budget Editor</h2>
      <div className="expenditures">
      {updateBudget.expenditures.map((expenditure) => (
          <div key={expenditure._id} className="expenditure">
            <span>{expenditure.name}</span>
            <input
              type="number"
              value={expenditureAmounts[expenditure._id] || ''}
              onChange={(e) => handleExpenditureChange(expenditure._id, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="currentAmount">Current Amount: ${handleAddToCurrentAmount()}</div>
      <button onClick={handleSubmit}>Update Budget</button>
      <button onClick={handleResetExpenditureAmounts}>Reset Expenditure Amounts</button>
    </div>
  );
};

export default AddNew;