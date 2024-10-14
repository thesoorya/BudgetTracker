import { useUser } from "@clerk/clerk-react";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const StoreContext = createContext();

const Store = ({ children }) => {
  const { user } = useUser();
  const [records, setRecords] = useState([]);

  const baseURL = "https://budgettracker-server-y6kp.onrender.com/api/finance"

  useEffect(() => {
    if (user && user.id) {
      getRecord();
    }
  }, [user]);

  const addRecord = async (details) => {
    try {
      const response = await axios.post(`${baseURL}/`, details);
      if (response.data.success) {
        toast.success("Record Added");
        getRecord();
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while adding the record");
    }
  };

  const getRecord = async () => {
    try {
      const response = await axios.get(`${baseURL}/getuserbyid/${user.id}`);
      if (response.data.success) {
        setRecords(response.data.records);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRecord = async (id) => {
    try {
      const response = await axios.delete(`${baseURL}/${id}`);
      if (response.data.success) {
        toast.success("Record Deleted");
        setRecords(records.filter((record) => record._id !== id));
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the record");
    }
  };

  const getHighestCredited = () => {
    const creditedRecords = records.filter(
      (record) => record.isCreditedOrDebited === "credited"
    );
    if (creditedRecords.length === 0) return null;

    let highestCreditedRecord = creditedRecords[0];
    creditedRecords.forEach((record) => {
      if (record.amount > highestCreditedRecord.amount) {
        highestCreditedRecord = record;
      }
    });

    return highestCreditedRecord;
  };

  const getHighestDebited = () => {
    const debitedRecords = records.filter(
      (record) => record.isCreditedOrDebited === "debited"
    );
    if (debitedRecords.length === 0) return null;

    let highestDebitedRecord = debitedRecords[0];
    debitedRecords.forEach((record) => {
      if (record.amount > highestDebitedRecord.amount) {
        highestDebitedRecord = record;
      }
    });

    return highestDebitedRecord;
  };

  const getTotalAmount = () => {
    return records.reduce((total, record) => {
      return (
        total +
        (record.isCreditedOrDebited === "credited"
          ? record.amount
          : -record.amount)
      );
    }, 0);
  };

  const value = {
    addRecord,
    getRecord,
    records,
    setRecords,
    getHighestCredited,
    getHighestDebited,
    getTotalAmount,
    deleteRecord,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default Store;
