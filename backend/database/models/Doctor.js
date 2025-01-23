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
    specialty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    availableFrom: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    availableTo: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    ratings: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Doctor;
