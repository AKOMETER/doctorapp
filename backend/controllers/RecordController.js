const MedicalRecord = require("../database/models/MedicalRecord");

// Create a new medical record
exports.createRecord = async (req, res) => {
  try {
    const {
      userId,
      doctorId,
      diagnosis,
      treatment,
      prescription,
      doctorNote,
      recordDate,
    } = req.body;

    const record = await MedicalRecord.create({
      userId,
      doctorId,
      diagnosis,
      treatment,
      prescription,
      doctorNote,
      recordDate,
    });

    res.status(201).json({ message: "Record created", record });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all records
exports.getAllRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.findAll();
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get record by ID
exports.getRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await MedicalRecord.findByPk(id);

    if (!record) return res.status(404).json({ message: "Record not found" });

    res.status(200).json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update record
exports.updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const record = await MedicalRecord.findByPk(id);
    if (!record) return res.status(404).json({ message: "Record not found" });

    await record.update(data);
    res.status(200).json({ message: "Record updated", record });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete record
exports.deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await MedicalRecord.findByPk(id);
    if (!record) return res.status(404).json({ message: "Record not found" });

    await record.destroy();
    res.status(200).json({ message: "Record deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
