import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from './Utils/Constant';
import MainList from './Components/MainList';
import AddBudgetForm from './Components/AddBudgetForm';
import Status from './Components/Status';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';
import ListBudgetsExpenditures from './Components/ListBudgetsExpenditures';

const App = ({ user }) => {
  const [budgets, setBudgets] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);

  useEffect(() => {
    axios.get(`${baseURL}/budget/${user.email}`).then((res) => {
      setBudgets(res.data);
    });
  }, [updateUI]);


  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/budgets" element={<ListBudgetsExpenditures user={user} />} />
          <Route path="/main-list" element={<MainList user={user} budgets={budgets} />} />
          <Route path="/add-new" element={<AddBudgetForm user={user} />} />
          <Route path="/status" element={<Status budgets={budgets} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
