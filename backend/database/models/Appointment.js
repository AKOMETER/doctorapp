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
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Confirmed", "Cancelled", "Completed"),
      defaultValue: "Pending",
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Appointment;
