import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../Utils/Constant';

const ManageExpenditures = ({ budgetId, onUpdate }) => {
  const [expenditures, setExpenditures] = useState([]);
  const [expenditureValues, setExpenditureValues] = useState({});

  useEffect(() => {
    axios.get(`${baseURL}/budget/id/${budgetId}`)
      .then((res) => {
        const budget = res.data;
        if (budget && budget.expenditures) {
          setExpenditures(budget.expenditures);
          // Initialize expenditure values
          const initialValues = {};
          budget.expenditures.forEach(exp => {
            initialValues[exp._id] = exp.amount || 0;
          });
          setExpenditureValues(initialValues);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [budgetId]);

  const handleExpenditureChange = (expenditureId, value) => {
    setExpenditureValues({
      ...expenditureValues,
      [expenditureId]: value
    });
  };

  const handleUpdateExpenditures = () => {
    const totalExpenditures = Object.values(expenditureValues).reduce((acc, val) => acc + Number(val), 0);

    axios.put(`${baseURL}/budget/update-expenditures/${budgetId}`, { totalExpenditures })
      .then((res) => {
        onUpdate(res.data); // Notify parent component about the update
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h3>Manage Expenditures</h3>
      {expenditures.length > 0 ? (
        <ul>
          {expenditures.map((expenditure) => (
            <li key={expenditure._id}>
              <label>{expenditure.name}</label>
              <input
                type="number"
                value={expenditureValues[expenditure._id] || 0}
                onChange={(e) => handleExpenditureChange(expenditure._id, e.target.value)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenditures available</p>
      )}
      <button onClick={handleUpdateExpenditures}>Update Budget</button>
    </div>
  );
};

export default ManageExpenditures;