import React, { useEffect, useState } from 'react';
import List from "./Components/List";
import axios from "axios";
import { baseURL } from "./Utils/Constant";

const App = (user) => {
  const [inputName, setInputName] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [budgets, setBudgets] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    alert("getting budget");
    console.log("getting budget");
    console.log("user",user);
    axios.get(`${baseURL}/budget/` + user.user.email)
      .then((res) => {
        console.log("res.data",res.data);
        setBudgets(res.data);
      });
  }, [updateUI]);

  const addBudget = () => {
    const status = getStatus(Number(inputAmount), 0);
    axios.post(`${baseURL}/save`, { budgetName: inputName, budgetAmount: inputAmount, budgetCurrentAmount: 0, status, email: user.user.email })
      .then((res) => {
        console.log(res.data);
        setInputName("");
        setInputAmount("");
        setUpdateUI((prevState) => !prevState);
      });
  };

  const updateMode = (id, name, amount) => {
    setInputName(name);
    setInputAmount(amount);
    setUpdateId(id);
  };

  const updateBudget = () => {
    const updatedBudget = budgets.find(b => b._id === updateId);
    if (!updatedBudget) {
      console.error("Budget not found for update");
      return;
    }
    const updatedStatus = getStatus(Number(inputAmount), updatedBudget.budgetCurrentAmount);
    axios.put(`${baseURL}/update/${updateId}`, { budgetName: inputName, budgetAmount: inputAmount, status: updatedStatus })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setUpdateId(null);
        setInputName("");
        setInputAmount("");
      })
      .catch((error) => {
        console.log("Error updating budget:", error);
      });
  };
  
  
  

  // Function to calculate budget status
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
    <main>
      <h1 className="title">Budgeting Made Better</h1>
      <div className="input_holder">
        <input type="text" placeholder="Enter Budget Name" value={inputName} onChange={(e) => setInputName(e.target.value)} />
        <input type="number" placeholder="Enter Budget Amount" value={inputAmount} onChange={(e) => setInputAmount(e.target.value)} />
        <button type="submit" onClick={updateId ? updateBudget : addBudget}>
          {updateId ? "Update Budget" : "Add Budget"}
        </button>
      </div>
      <div className="table-header">
        <div className="column">Name</div>
        <div className="column">Budget Amount</div>
        <div className="column">Current Amount</div>
        <div className="column">Status</div>
        <div className="column">Action</div>
      </div>
      <ul>
        {budgets.map((budget) => (
          <List
            key={budget._id}
            id={budget._id}
            budget={budget}
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}
          />
        ))}
      </ul>
    </main>
  );
};

export default App;


