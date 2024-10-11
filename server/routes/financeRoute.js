const express = require("express");
const router = express.Router();
const Finance = require("../model/financeSchema");

router.get("/getuserbyid/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const records = await Finance.find({ userId });

    if (records.length === 0) {
      return res.status(404).json({ success: false, message: "No records found for the user." });
    }

    res.status(200).json({ success: true, message: "Records fetched successfully.", records });
  } catch (err) {
    res.status(500).json({ success: false, error: "An error occurred while fetching the records.", details: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const newRecordBody = req.body;
    const newRecord = new Finance(newRecordBody);
    const savedRecord = await newRecord.save();

    res.status(201).json({ success: true, message: "Record created successfully.", savedRecord });
  } catch (err) {
    res.status(500).json({ success: false, error: "An error occurred while saving the record.", details: err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedRecordBody = req.body;
    const record = await Finance.findByIdAndUpdate(id, updatedRecordBody, { new: true });

    if (!record) {
      return res.status(404).json({ success: false, message: "Record not found." });
    }

    res.status(200).json({ success: true, message: "Record updated successfully.", record });
  } catch (err) {
    res.status(500).json({ success: false, error: "An error occurred while updating the record.", details: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const record = await Finance.findByIdAndDelete(id);

    if (!record) {
      return res.status(404).json({ success: false, message: "Record not found." });
    }

    res.status(200).json({ success: true, message: "Record deleted successfully.", record });
  } catch (err) {
    res.status(500).json({ success: false, error: "An error occurred while deleting the record.", details: err });
  }
});

module.exports = router;
