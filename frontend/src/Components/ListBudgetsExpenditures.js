import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../Utils/Constant';
import ManageExpenditures from './ManageExpenditures';

const ListBudgetsExpenditures = ({ user }) => {
  const [budgets, setBudgets] = useState([]);
  const [selectedBudgetId, setSelectedBudgetId] = useState(null);

  // console.log("user******************", user);


  useEffect(() => {
    axios.get(`${baseURL}/budget/${user.email}`)
      .then((res) => {
        setBudgets(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user.email]);

  const handleManageExpenditures = (budgetId) => {
    setSelectedBudgetId(budgetId);
  };

  const handleExpendituresUpdated = (updatedBudget) => {
    setBudgets(budgets.map(b => b._id === updatedBudget._id ? updatedBudget : b));
    setSelectedBudgetId(null);
  };

  return (
    <div>
      <h2>Current Budgets</h2>
      {selectedBudgetId ? (
        <ManageExpenditures 
          budgetId={selectedBudgetId} 
          onUpdate={handleExpendituresUpdated}
        />
      ) : (
        <ul>
          {budgets.map((budget) => (
            <li key={budget._id}>
              <div>
                <p>Name: {budget.budgetName}</p>
                <p>Budget Amount: {budget.budgetAmount}</p>
                <p>Current Amount: {budget.budgetCurrentAmount}</p>
                <p>Status: {budget.status}</p>
                <button onClick={() => handleManageExpenditures(budget._id)}>Manage Expenditures</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListBudgetsExpenditures;