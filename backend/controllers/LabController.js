const Lab = require("../database/models/Lab");
const User = require("../database/models/User");

const LabController = {
  // GET /labs
  async index(req, res) {
    try {
      const labs = await Lab.findAll();
      return res.status(200).json({ data: labs });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Server error", error: error.message });
    }
  },

  // GET /labs/:id
  async show(req, res) {
    try {
      const lab = await Lab.findByPk(req.params.id);
      if (!lab) return res.status(404).json({ msg: "Lab not found" });

      const doctors = await lab.getDoctors({
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "firstName", "lastName", "email"],
          },
        ],
      });

      const doctorsWithLabName = doctors.map((doc) => {
        const doctorObj = doc.toJSON();
        doctorObj.labName = lab.name;
        return doctorObj;
      });

      return res.status(200).json({ data: doctorsWithLabName });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Server error", error: error.message });
    }
  },

  // POST /labs
  async store(req, res) {
    try {
      const { name, description, image, location } = req.body;
      const lab = await Lab.create({ name, description, image, location });

      return res.status(201).json({ msg: "Lab created", data: lab });
    } catch (error) {
      return res
        .status(400)
        .json({ msg: "Creation failed", error: error.message });
    }
  },

  // PUT /labs/:id
  async update(req, res) {
    try {
      const { name, description, image, location } = req.body;
      const lab = await Lab.findByPk(req.params.id);
      if (!lab) return res.status(404).json({ msg: "Lab not found" });

      await lab.update({ name, description, image, location });

      return res.status(200).json({ msg: "Lab updated", data: lab });
    } catch (error) {
      return res
        .status(400)
        .json({ msg: "Update failed", error: error.message });
    }
  },
  // DELETE /labs/:id
  async destroy(req, res) {
    try {
      const lab = await Lab.findByPk(req.params.id);
      if (!lab) return res.status(404).json({ msg: "Lab not found" });

      await lab.destroy();
      return res.status(200).json({ msg: "Lab deleted" });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Delete failed", error: error.message });
    }
  },
};

module.exports = LabController;
