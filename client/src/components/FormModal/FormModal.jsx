import React, { useContext, useState } from 'react'
import { StoreContext } from '../../context/Store';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/clerk-react';
import './FormModal.css'

const FormModal = ({ recordId, isModalOpen, setIsModalOpen }) => {

    const { user } = useUser()
    const { getRecord } = useContext(StoreContext)
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [purpose, setPurpose] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");

    const editRecord = async () => {

        if (!amount || !description || !purpose || !paymentMethod) {
            toast.error('Please fill in all the fields');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/finance/${recordId}`, {
                userId: user.id,
                description: description,
                amount,
                category: purpose,
                paymentMethod: paymentMethod,
            });
            if (response.data.success) {
                toast.success('Record Edited')
                getRecord()
            }
        } catch (error) {
            console.error(error);
        }
        setIsModalOpen(!isModalOpen)
    };

    return (
        <div className='formModal'>
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
            <div className='form-modal-btns'>
                <button onClick={editRecord}>Save Changes</button>
                <button onClick={() => setIsModalOpen(!isModalOpen)}>Cancel</button>
            </div>
        </div>
    )
}

export default FormModal