const { DataTypes } = require("sequelize");
const sequelize = require("../index"); // Sequelize instance

const MedicalRecord = sequelize.define(
  "MedicalRecord",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    bloodGroup: {
      type: DataTypes.STRING,
    },
    bloodType: {
      type: DataTypes.STRING,
    },
    genotype: {
      type: DataTypes.STRING,
    },
    allergies: {
      type: DataTypes.TEXT,
    },
    chronicDiseases: {
      type: DataTypes.TEXT,
    },
    medicalNote: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    tableName: "MedicalRecords",
  }
);

module.exports = MedicalRecord;
