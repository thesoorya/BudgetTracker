import React, { useContext, useState } from "react";
import "./Dashboard.css";
import { useUser } from "@clerk/clerk-react";
import { StoreContext } from "../../context/Store";
import BarChart from "../../components/BarChart/BarChart";
import DonutChart from "../../components/DonutChart/DonutChart";

const Dashboard = () => {
  const { user } = useUser();
  const { addRecord, getHighestCredited, getHighestDebited, getTotalAmount } =
    useContext(StoreContext);

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [purpose, setPurpose] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleRecord = (e, type) => {
    e.preventDefault();
    addRecord({
      userId: user.id,
      date: new Date(),
      description: description,
      amount,
      category: purpose,
      paymentMethod: paymentMethod,
      isCreditedOrDebited: type,
    });

    setAmount("");
    setDescription("");
    setPurpose("");
    setPaymentMethod("");
  };

  return (
    <>
      <div className="dashboard">
        <header className="dashboard-header">
          <p className="dashboard-username">
            {user
              ? "Welcome, " + user.firstName
              : "Login / SignUp to access Tracker"}
          </p>
          <p className="dashboard-desc">
            Budget Tracker is your essential tool for managing finances
            effectively. Easily log transactions, set personalized budgets, and
            gain insights into your spending habits.
          </p>
        </header>

        <div className="total-amount">
          <h3 className={`${getTotalAmount() > 0 ? "credited" : "debited"}`}>
            Portfolio: {getTotalAmount()}
          </h3>
        </div>

        <div className="dashboard-tracker-form">
          <div className="form-container">
            <form className="form">
              <div className="form-group">
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="Enter the amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
                <input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Purpose
                  </option>
                  <option value="food">Food</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="transport">Transport</option>
                  <option value="bills">Bills</option>
                  <option value="shopping">Shopping</option>
                </select>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Payment Method
                  </option>
                  <option value="UPI">UPI</option>
                  <option value="cash">Cash</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="debit_card">Debit Card</option>
                </select>
              </div>
              <div className="form-submit-btns">
                <button
                  className="form-submit-btn"
                  type="submit"
                  onClick={(e) => handleRecord(e, "credited")}
                >
                  Add Amount
                </button>
                <button
                  className="form-submit-btn"
                  type="submit"
                  onClick={(e) => handleRecord(e, "debited")}
                >
                  Withdraw Amount
                </button>
              </div>
            </form>
          </div>
          <div className="dashboard-tracker-stats">
            <div className="tracked-amounts">
              <div className="tracked-high">
                <p className="tracked-title">Max Credited</p>
                {getHighestCredited() ? (
                  <div>
                    <p className="tracked-amount">
                      ₹{getHighestCredited().amount}
                    </p>
                    <p className="tracked-date">
                      {new Date(getHighestCredited().date).toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <p>No credited transactions available</p>
                )}
              </div>

              <div className="tracked-low">
                <p className="tracked-title">Max Debited</p>
                {getHighestDebited() ? (
                  <div>
                    <p className="tracked-amount">
                      ₹{getHighestDebited().amount}
                    </p>
                    <p className="tracked-date">
                      {new Date(getHighestDebited().date).toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <p>No debited transactions available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="graphs">
        <BarChart />
        <DonutChart />
      </div>
    </>
  );
};

export default Dashboard;
