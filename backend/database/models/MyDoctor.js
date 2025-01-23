const { DataTypes } = require("sequelize");
const sequelize = require("../index"); // Sequelize instance

const MyDoctor = sequelize.define(
  "MyDoctor",
  {
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = MyDoctor;
