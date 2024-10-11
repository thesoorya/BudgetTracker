import React, { useState } from 'react';
import './Dashboard.css';
import { useUser } from '@clerk/clerk-react';
import { SignedOut, SignInButton } from "@clerk/clerk-react";

const Dashboard = () => {
    const { user } = useUser();

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [purpose, setPurpose] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            amount,
            description,
            purpose,
            paymentMethod,
        });
    };

    return (
        <main className='dashboard'>
            <header className='dashboard-header'>
                <h1 className='dash-username'>{user ? 'Welcome, ' + user.firstName : 'Login / SignUp to access Tracker'}</h1>
                <p>Budget Tracker is your essential tool for managing finances effectively. Easily log transactions, set personalized budgets, and gain insights into your spending habits. With a user-friendly dashboard and secure access, take control of your financial journey today!</p>
                <SignedOut>
                    <SignInButton mode='modal' className='dashboard-login-btn' />
                </SignedOut>
            </header>

            <div className="dashboard-tracker-form">
                <div className="form-container">
                    <form className="form" onSubmit={handleSubmit}>
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
                                <option value="" disabled>Select Purpose</option>
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
                                <option value="" disabled>Select Payment Method</option>
                                <option value="cash">Cash</option>
                                <option value="credit_card">Credit Card</option>
                                <option value="debit_card">Debit Card</option>
                            </select>
                        </div>
                        <div className="form-submit-btns">
                        <button className="form-submit-btn" type="submit">Add Amount</button>
                        <button className="form-submit-btn" type="submit">Withdraw Amount</button>
                        </div>
                    </form>
                </div>
                <div className='dashboard-tracker-stats'>
                    <div className="tracked-amounts">
                        <div className="tracked-high"></div>
                        <div className="tracked-low"></div>
                    </div>
                    <div className="tracked-expense"></div>
                </div>
            </div>
        </main>
    );
}

export default Dashboard;
