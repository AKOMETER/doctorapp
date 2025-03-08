const { DataTypes } = require("sequelize");
const sequelize = require("../index"); // Sequelize instance

const Doctor = sequelize.define(
  "Doctor",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    availableFrom: {
      type: DataTypes.STRING, // Example: "09:00 AM"
      allowNull: true,
    },
    availableTo: {
      type: DataTypes.STRING, // Example: "05:00 PM"
      allowNull: true,
    },
    ratings: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // Example: 50.00
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    education: {
      type: DataTypes.JSON, // Stores school, location, year as JSON
      allowNull: true,
    },
    service: {
      type: DataTypes.JSON, // Stores services as an array: ["Cleaning", "Repair"]
      allowNull: true,
    },
    experience: {
      type: DataTypes.JSON, // Stores experience details (name, location, year)
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Doctor;
