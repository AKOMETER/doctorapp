const { DataTypes } = require("sequelize");
const sequelize = require("../index"); // Sequelize instance

const MedicalRecord = sequelize.define(
  "Record",
  {
    userId: {
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
        model: "Doctors",
        key: "id",
      },
    },
    diagnosis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    treatment: {
      type: DataTypes.TEXT,
    },
    prescription: {
      type: DataTypes.TEXT,
    },
    doctorNote: {
      type: DataTypes.TEXT,
    },
    recordDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
    tableName: "Records",
  }
);

module.exports = MedicalRecord;
