import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../Utils/Constant';
import List from './List';
import EditBudget from './EditBudget';

const MainList = ({user}) => {
  const [budgets, setBudgets] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [editBudgetId, setEditBudgetId] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/budget/${user.email}`)
      .then((res) => {
        setBudgets(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user.email]);

  const handleEdit = (id) => {
    setEditBudgetId(id);
  };

  const handleCloseEdit = () => {
    setEditBudgetId(null);
  };

  return (
    <main>
      {editBudgetId ? (
        <EditBudget
          id={editBudgetId}
          name={budgets.find((b) => b._id === editBudgetId).budgetName}
          amount={budgets.find((b) => b._id === editBudgetId).budgetAmount}
          expenditures={budgets.find((b) => b._id === editBudgetId).expenditures}
          onClose={handleCloseEdit}
          setUpdateUI={setUpdateUI}
        />
      ) : (
        <div>
          {budgets.map((budget) => (
            <List
              key={budget._id}
              id={budget._id}
              budget={budget}
              setUpdateUI={setUpdateUI}
              handleEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default MainList;