const { DataTypes } = require("sequelize");
const sequelize = require("../index"); // Sequelize instance

const Specialty = sequelize.define(
  "Specialty",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

module.exports = Specialty;
