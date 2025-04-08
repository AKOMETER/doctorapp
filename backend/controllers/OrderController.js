const OrderItem = require("../database/models/OrderItem");
const CartItem = require("../database/models/CartItem");
const User = require("../database/models/User");

exports.checkoutOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user and cart items
    const user = await User.findByPk(userId);
    const cartItems = await CartItem.findAll({ where: { userId } });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    let totalAmount = 0;
    const orderItems = [];

    cartItems.forEach((item) => {
      const amount = item.quantity * item.price;
      totalAmount += amount;

      orderItems.push({
        userId,
        cartItemId: item.id,
        quantity: item.quantity,
        price: item.price,
        amount,
        status: "paid",
      });
    });

    if (user.amount < totalAmount) {
      return res.status(400).json({ message: "Insufficient funds." });
    }

    // Deduct user's balance
    user.amount -= totalAmount;
    await user.save();

    // Save all order items
    await OrderItem.bulkCreate(orderItems);

    // Empty user's cart
    await CartItem.destroy({ where: { userId } });

    return res.status(200).json({
      message: "Order placed successfully",
      orderItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
