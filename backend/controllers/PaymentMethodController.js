const PaymentMethod = require("../database/models/PaymentMethod");

const PaymentMethodController = {
  // GET /payment-methods/
  index: async (req, res) => {
    try {
      const methods = await PaymentMethod.findAll();
      return res.json(methods);
    } catch (err) {
      return res
        .status(500)
        .json({ msg: "Failed to fetch payment methods", error: err.message });
    }
  },

  // GET /payment-methods/:id
  show: async (req, res) => {
    try {
      const method = await PaymentMethod.findByPk(req.params.id);
      if (!method)
        return res.status(404).json({ msg: "Payment method not found" });
      return res.json(method);
    } catch (err) {
      return res.status(500).json({ msg: "Error", error: err.message });
    }
  },

  // GET /payment-methods/get_by_user_id/:id (optional customization logic)
  showByUserID: async (req, res) => {
    try {
      // If you're linking methods to specific users later, adjust this query
      const methods = await PaymentMethod.findAll(); // Placeholder logic
      return res.json(methods);
    } catch (err) {
      return res.status(500).json({ msg: "Error", error: err.message });
    }
  },

  // POST /payment-methods/
  store: async (req, res) => {
    try {
      const { name, type } = req.body;
      if (!name || !type)
        return res.status(400).json({ msg: "Name and type are required" });

      const method = await PaymentMethod.create({ name, type });
      return res
        .status(201)
        .json({ msg: "Payment method created", data: method });
    } catch (err) {
      return res
        .status(500)
        .json({ msg: "Creation failed", error: err.message });
    }
  },

  // PUT /payment-methods/:id
  update: async (req, res) => {
    try {
      const { name, type } = req.body;
      const method = await PaymentMethod.findByPk(req.params.id);
      if (!method) return res.status(404).json({ msg: "Not found" });

      method.name = name || method.name;
      method.type = type || method.type;
      await method.save();

      return res.json({ msg: "Updated successfully", data: method });
    } catch (err) {
      return res.status(500).json({ msg: "Update failed", error: err.message });
    }
  },

  // PUT /payment-methods/admin/:id
  adminUpdate: async (req, res) => {
    try {
      const method = await PaymentMethod.findByPk(req.params.id);
      if (!method) return res.status(404).json({ msg: "Not found" });

      Object.assign(method, req.body); // full update flexibility for admin
      await method.save();

      return res.json({ msg: "Admin update successful", data: method });
    } catch (err) {
      return res
        .status(500)
        .json({ msg: "Admin update failed", error: err.message });
    }
  },

  // DELETE /payment-methods/:id
  destroy: async (req, res) => {
    try {
      const method = await PaymentMethod.findByPk(req.params.id);
      if (!method) return res.status(404).json({ msg: "Not found" });

      await method.destroy();
      return res.json({ msg: "Deleted successfully" });
    } catch (err) {
      return res.status(500).json({ msg: "Delete failed", error: err.message });
    }
  },
};

module.exports = PaymentMethodController;
