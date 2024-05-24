import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "../Utils/Constant";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { VscAdd, VscDebugRestart } from "react-icons/vsc";

const List = ({ id, budget, setUpdateUI, handleEdit }) => {
  const [addAmount, setAddAmount] = useState("");

  const removeBudget = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      setUpdateUI((prevState) => !prevState);
    });
  };

  const setCurrentAmountToZero = () => {
    const updatedStatus = getStatus(budget.budgetAmount, 0);
    axios
      .put(`${baseURL}/update/${id}`, { budgetCurrentAmount: 0, status: updatedStatus })
      .then((res) => {
        setUpdateUI((prevState) => !prevState);
      })
      .catch((error) => {
        console.log("Error setting current amount to zero:", error);
      });
  };

  const increaseCurrentAmount = () => {
    const amountToAdd = parseInt(addAmount);
    if (!isNaN(amountToAdd)) {
      const updatedCurrentAmount = budget.budgetCurrentAmount + amountToAdd;
      const updatedStatus = getStatus(budget.budgetAmount, updatedCurrentAmount);
      axios
        .put(`${baseURL}/update/${id}`, { budgetCurrentAmount: updatedCurrentAmount, status: updatedStatus })
        .then((res) => {
          setAddAmount("");
          setUpdateUI((prevState) => !prevState);
        })
        .catch((error) => {
          console.log("Error updating current amount:", error);
        });
    } else {
      console.log("Invalid amount to add.");
    }
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Under Budget":
        return "green-text";
      case "Budget Limit Reached":
        return "yellow-text";
      case "Over Budget Limit":
        return "red-text";
      default:
        return "";
    }
  };

  return (
    <div>
      <ul>
        <li>
          <div className="column">{budget.budgetName}</div>
          <div className="column">{budget.budgetAmount}</div>
          <div className="column">{budget.budgetCurrentAmount}</div>
          <div className={`column ${getStatusColor(budget.status)}`}>{budget.status}</div>
          <div className="column">
            <div className="icon_holder">
              <BiEditAlt className="icon" title="Edit" onClick={() => handleEdit(id)} />
              <BsTrash className="icon" title="Delete" onClick={removeBudget} />
              <VscDebugRestart className="icon" title="Revert current to 0" onClick={setCurrentAmountToZero} />
              <div className="input_holder">
                <input type="number" value={addAmount} onChange={(e) => setAddAmount(e.target.value)} placeholder="Insert to update current" />
                <VscAdd className="icon" title="Increase" onClick={increaseCurrentAmount} />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default List;
