const { DataTypes } = require("sequelize");
const sequelize = require("../index"); // Sequelize instance

// Define the Estate model
const Estate = sequelize.define(
  "Estate",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Ensures the name is not empty
      },
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "locations",
        key: "id",
      },
    },
    director: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estimate: {
      type: DataTypes.FLOAT, // Numeric field for financial estimates
      allowNull: false,
      validate: {
        isFloat: true, // Ensures the value is a number
      },
    },
    area: {
      type: DataTypes.STRING, // Represents the size or region of the estate
      allowNull: true,
    },
    amenities: {
      type: DataTypes.JSON, // Use JSON for storing arrays
    },
    nearbyLocations: {
      type: DataTypes.JSON, // Use JSON for storing arrays
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active", // Options: "active", "development", "completed"
    },
    price_range: {
      type: DataTypes.STRING, // Example: "50M-100M"
      allowNull: true,
    },
    show: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    number_of_units: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = Estate;
