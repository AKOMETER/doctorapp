const Specialty = require("../database/models/Specialty");

const SpecialtyController = {
  // GET /specialties
  async index(req, res) {
    try {
      const specialties = await Specialty.findAll();
      return res.status(200).json({ data: specialties });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Server error", error: error.message });
    }
  },

  // GET /specialties/:id
  async show(req, res) {
    try {
      const specialty = await Specialty.findByPk(req.params.id);
      if (!specialty)
        return res.status(404).json({ msg: "Specialty not found" });

      return res.status(200).json({ data: specialty });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Server error", error: error.message });
    }
  },

  // POST /specialties
  async store(req, res) {
    try {
      const { name, description } = req.body;
      const specialty = await Specialty.create({ name, description });

      return res
        .status(201)
        .json({ msg: "Specialty created", data: specialty });
    } catch (error) {
      return res
        .status(400)
        .json({ msg: "Creation failed", error: error.message });
    }
  },

  // PUT /specialties/:id
  async update(req, res) {
    try {
      const { name, description } = req.body;
      const specialty = await Specialty.findByPk(req.params.id);
      if (!specialty)
        return res.status(404).json({ msg: "Specialty not found" });

      await specialty.update({ name, description });

      return res
        .status(200)
        .json({ msg: "Specialty updated", data: specialty });
    } catch (error) {
      return res
        .status(400)
        .json({ msg: "Update failed", error: error.message });
    }
  },

  // DELETE /specialties/:id
  async destroy(req, res) {
    try {
      const specialty = await Specialty.findByPk(req.params.id);
      if (!specialty)
        return res.status(404).json({ msg: "Specialty not found" });

      await specialty.destroy();
      return res.status(200).json({ msg: "Specialty deleted" });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Delete failed", error: error.message });
    }
  },
};

module.exports = SpecialtyController;
