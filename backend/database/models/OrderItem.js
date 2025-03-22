const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const CartItem = sequelize.define(
  "OrderItem",
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    cartItemId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "paid", "failed"),
      defaultValue: "pending",
    },
  },
  {
    timestamps: true,
    tableName: "OrderItems",
  }
);

module.exports = CartItem;
