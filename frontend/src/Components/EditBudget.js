import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "../Utils/Constant";

const EditBudget = ({ id, name, amount, expenditures }) => {
  const [inputName, setInputName] = useState(name);
  const [inputAmount, setInputAmount] = useState(amount);
  const [newExpenditureName, setNewExpenditureName] = useState("");
  const [expendituresList, setExpendituresList] = useState(expenditures);

  const handleSave = () => {
    axios
      .put(`${baseURL}/update/${id}`, {
        budgetName: inputName,
        budgetAmount: inputAmount,
        expenditures: expendituresList
      })
      .then((res) => {
        console.log("Budget updated:", res.data);
        // Optionally, you can handle any UI updates here
      })
      .catch((error) => {
        console.error("Error updating budget:", error);
      });
  };

  const handleDeleteExpenditure = (expenditureId) => {
    const updatedExpenditures = expendituresList.filter(
      (expenditure) => expenditure._id !== expenditureId
    );
    setExpendituresList(updatedExpenditures);
  };

  const handleAddExpenditure = () => {
    if (newExpenditureName.trim() === "") return;
    const newExpenditure = {
      _id: Math.random().toString(36).substr(2, 9), // Generate unique ID
      name: newExpenditureName
    };
    setExpendituresList([...expendituresList, newExpenditure]);
    setNewExpenditureName(""); // Clear input field after adding
  };

  return (
    <div>
      <h2>Edit Budget</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
        />
      </div>
      <button onClick={handleSave}>Save</button>
      <h3>Expenditures</h3>
      <ul>
        {expendituresList.map((expenditure) => (
          <li key={expenditure._id}>
            {expenditure.name}
            <button onClick={() => handleDeleteExpenditure(expenditure._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newExpenditureName}
          onChange={(e) => setNewExpenditureName(e.target.value)}
        />
        <button onClick={handleAddExpenditure}>Add Expenditure</button>
      </div>
    </div>
  );
};

export default EditBudget;
