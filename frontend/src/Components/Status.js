import React from 'react';
import BudgetStatus from './BudgetStatus'
import './status.css';

const Status = ({ budgets }) => {
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Under Budget":
//         return styles.green;
//       case "Budget Limit Reached":
//         return styles.yellow;
//       case "Over Budget Limit":
//         return styles.red;
//       default:
//         return styles.black;
//     }
//   };

  return (
    <div>
      {/* Render the legend */}
      <div className="legend"> {/* Use regular class name here */}
        <div className="legendItem"> {/* Use regular class name here */}
          <span className="legendDot" style={{ backgroundColor: 'green' }}></span>
          Under Budget
        </div>
        <div className="legendItem"> {/* Use regular class name here */}
          <span className="legendDot" style={{ backgroundColor: 'yellow' }}></span>
          Budget Limit Reached
        </div>
        <div className="legendItem"> {/* Use regular class name here */}
          <span className="legendDot" style={{ backgroundColor: 'red' }}></span>
          Over Budget Limit
        </div>
      </div>
      <div>
        <ul>
            {budgets.map((budget) =>
              <BudgetStatus
                name={budget.name}
                amount={budget.budgetAmount}
                status={budget.status}
                currentAmount={budget.budgetCurrentAmount}
                />
            )}
        </ul>
      </div>

    </div>
  );
};

export default Status;
