import React, { useContext, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { StoreContext } from "../../context/Store";
import "./Transaction.css";
import FormModal from "../../components/FormModal/FormModal";

const Transaction = () => {
  const { records, deleteRecord } = useContext(StoreContext);
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);

  function handleModal(recordId) {
    setSelectedRecordId(recordId);
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div className="transaction-container">
      <h4 className="transaction-title">Transaction Records</h4>
      <ul className="transaction-list">
        {records && records.length > 0 ? (
          [...records].reverse().map((record) => (
            <li className="transaction-item" key={record._id}>
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

              <div>
                <button
                  className="transaction-edit"
                  onClick={() => handleModal(record._id)}
                >
                  Edit
                </button>
                <button
                  className="transaction-delete"
                  onClick={() => deleteRecord(record._id)}
                >
                  Delete
                </button>
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

      {isModalOpen && (
        <div className="modal-edit">
          <FormModal recordId={selectedRecordId} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default Transaction;
