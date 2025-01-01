import React from 'react';

const BudgetStatus = ({name, status, amount, currentAmount }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Status: {status}</p>
      <p>Amount: {amount}</p>
      <p>Current Amount: {currentAmount}</p>
    </div>
  );
};

export default BudgetStatus;