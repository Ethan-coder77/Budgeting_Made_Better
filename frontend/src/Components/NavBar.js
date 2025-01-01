import React from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.css";

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/budgets">List Budgets</Link>
                </li>
                <li>
                    <Link to="/main-list">List</Link>
                </li>
                <li>
                    <Link to="/add-new">Add New</Link>
                </li>
                <li>
                    <Link to="/status">Status</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;