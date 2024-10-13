import React, { useContext } from "react";
import { useUser } from "@clerk/clerk-react";
import { StoreContext } from "../../context/Store";
import { MdOutlineDelete } from "react-icons/md";
import "./Transaction.css";

const Transaction = () => {
  const { records, deleteRecord } = useContext(StoreContext);
  const { user } = useUser();

  return (
    <div className="transaction-container">
      <h4 className="transaction-title">Transaction Records</h4>
      <ul className="transaction-list">
        {records && records.length > 0 ? (
          [...records].reverse().map((record) => (
            <li className="transaction-item" key={record._id}>
              <div
                className="transaction-delete"
                onClick={() => deleteRecord(record._id)}
              >
                <MdOutlineDelete />
              </div>
              <div className="transaction-amount">
                <p
                  className={`t-amount ${
                    record.isCreditedOrDebited === "credited"
                      ? "credited"
                      : "debited"
                  }`}
                >
                  <small>₹{record.amount}</small>
                </p>
                <p>
                  <small>{record.isCreditedOrDebited}</small>
                </p>
                <div className="transaction-dates">
                  <small>{new Date(record.date).toLocaleDateString()}</small>
                  {" , "}
                  <small>{new Date(record.date).toLocaleTimeString()}</small>
                </div>
              </div>

              <div className="transaction-details">
                <small>{record.category}</small>{" "}
                <small>({record.paymentMethod})</small>
              </div>
            </li>
          ))
        ) : user ? (
          <p className="no-records">No transaction records found.</p>
        ) : (
          <p className="no-records">
            Please log in or sign up to view your transaction records.
          </p>
        )}
      </ul>
    </div>
  );
};

export default Transaction;
