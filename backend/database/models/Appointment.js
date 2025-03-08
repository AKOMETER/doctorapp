const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const Appointment = sequelize.define(
  "Appointment",
  {
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // Refers to the Users table
        key: "id",
      },
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // Refers to the Users table
        key: "id",
      },
    },
    dateTime: {
      type: DataTypes.DATE, // Supports both date and time
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER, // Duration in minutes
      allowNull: false,
      defaultValue: 30, // Default appointment duration is 30 minutes
    },
    status: {
      type: DataTypes.ENUM("Pending", "Confirmed", "Cancelled", "Completed"),
      defaultValue: "Pending",
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    remarks: {
      type: DataTypes.TEXT, // Additional notes by the doctor
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Appointment;
