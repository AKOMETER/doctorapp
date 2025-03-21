const CartItem = require("../database/models/CartItem");
const Product = require("../database/models/Product");

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check if item already exists in cart
    let item = await CartItem.findOne({ where: { userId, productId } });

    if (item) {
      item.quantity += quantity;
      await item.save();
    } else {
      item = await CartItem.create({ userId, productId, quantity });
    }

    res.status(201).json({ message: "Item added to cart", item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user's cart items
exports.getUserCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const items = await CartItem.findAll({
      where: { userId },
      include: [{ model: Product }],
    });

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const item = await CartItem.findByPk(id);
    if (!item) return res.status(404).json({ message: "Cart item not found" });

    item.quantity = quantity;
    await item.save();

    res.status(200).json({ message: "Cart item updated", item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove item from cart
exports.removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await CartItem.findByPk(id);
    if (!item) return res.status(404).json({ message: "Cart item not found" });

    await item.destroy();
    res.status(200).json({ message: "Cart item removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
