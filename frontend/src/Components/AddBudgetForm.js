import React, { useState } from 'react';
import axios from "axios";
import { baseURL } from "../Utils/Constant";

const AddBudgetForm = (user) => {
    const [inputName, setInputName] = useState("");
    const [inputAmount, setInputAmount] = useState("");
    const [expenditureName, setExpenditureName] = useState(""); // State for expenditure name
    const [expenditures, setExpenditures] = useState([]); // State for list of expenditures
    const [showApp, setShowApp] = useState(false);

    const addBudget = () => {
        const status = getStatus(Number(inputAmount), 0);
        axios.post(`${baseURL}/save`, {
          budgetName: inputName,
          budgetAmount: inputAmount,
          budgetCurrentAmount: 0,
          status,
          email: user.user.email,
          expenditures: expenditures // Include expenditures array in the request
        })
        .then(() => {
          setShowApp(true); // Set the state to show App component
        })
        .catch((error) => {
          console.error("Error adding budget:", error);
        });
    };

    const addExpenditure = () => {
        if (expenditureName.trim() === "") return; // Don't add empty expenditure names
        setExpenditures([...expenditures, { name: expenditureName, amount: 0 }]); // Set default amount to 0
        setExpenditureName(""); // Clear the input field after adding
    };

    const getStatus = (amount, currentAmount) => {
        if (currentAmount < amount) {
          return "Under Budget";
        } else if (currentAmount === amount) {
          return "Budget Limit Reached";
        } else {
          return "Over Budget Limit";
        }
    };

    return (
        <div>
            <h2>Create New Budget</h2>
            <div>
                <label htmlFor="budgetName">Budget Name:</label>
                <input 
                    type="text" 
                    id="budgetName" 
                    value={inputName} 
                    onChange={(e) => setInputName(e.target.value)} 
                />
            </div>
            <div>
                <label htmlFor="budgetAmount">Budget Amount:</label>
                <input 
                    type="number" 
                    id="budgetAmount" 
                    value={inputAmount} 
                    onChange={(e) => setInputAmount(e.target.value)} 
                />
            </div>
            <div>
                <h3>Expenditures</h3>
                {expenditures.map((expenditure, index) => (
                    <div key={index}>
                        <p>{expenditure.name}: {expenditure.amount}</p>
                    </div>
                ))}
                <div>
                    <input 
                        type="text" 
                        placeholder="Enter Expenditure Name" 
                        value={expenditureName} 
                        onChange={(e) => setExpenditureName(e.target.value)} 
                    />
                    <button type="button" onClick={addExpenditure}>Add Expenditure</button>
                </div>
            </div>
            <button type="button" onClick={addBudget}>Create Budget</button>
        </div>
    );
};

export default AddBudgetForm;