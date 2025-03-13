const Doctor = require("../database/models/Doctor");
const Lab = require("../database/models/Lab");
const Specialty = require("../database/models/Specialty");
const User = require("../database/models/User");

const DoctorController = {
  // GET /doctor
  async index(req, res) {
    try {
      const doctors = await Doctor.findAll({
        include: [
          {
            model: User,
            as: "user",
            attributes: { exclude: ["password"] },
          },
          {
            model: Specialty,
            through: { attributes: [] }, // exclude junction table data
          },
          {
            model: Lab,
            through: { attributes: [] }, // exclude junction table data
          },
        ],
      });
      return res.status(200).json({ data: doctors });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Server error", error: error.message });
    }
  },
  // GET /doctor/:id
  async show(req, res) {
    try {
      const doctor = await Doctor.findByPk(req.params.id, {
        include: [
          {
            model: User,
            as: "user",
            attributes: { exclude: ["password"] },
          },
          {
            model: Specialty,
            through: { attributes: [] },
          },
          {
            model: Lab,
            through: { attributes: [] },
          },
        ],
      });

      if (!doctor) return res.status(404).json({ msg: "Doctor not found" });

      return res.status(200).json({ data: doctor });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Server error", error: error.message });
    }
  },

  async showByUserID(req, res) {
    try {
      const doctor = await Doctor.findOne({
        where: { userId: req.params.id },
        include: [
          {
            model: User,
            as: "user",
            attributes: { exclude: ["password"] },
          },
          {
            model: Specialty,
            through: { attributes: [] },
          },
          {
            model: Lab,
            through: { attributes: [] },
          },
        ],
      });

      if (!doctor) return res.status(404).json({ msg: "Doctor not found" });

      return res.status(200).json({ data: doctor });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Server error", error: error.message });
    }
  },
  // POST /doctor
  async store(req, res) {
    try {
      const { name, description } = req.body;
      const doctor = await Doctor.create({ name, description });

      return res.status(201).json({ msg: "Doctor created", data: doctor });
    } catch (error) {
      return res
        .status(400)
        .json({ msg: "Creation failed", error: error.message });
    }
  },

  // PUT /doctor/:id
  async update(req, res) {
    try {
      const {
        bio,
        availableFrom,
        availableTo,
        location,
        price,
        image,
        education,
        service,
        experience,
        labIds,
        specificationIds,
      } = req.body;

      const doctor = await Doctor.findOne({ where: { userId: req.params.id } });
      if (!doctor) return res.status(404).json({ msg: "Doctor not found" });

      await doctor.update({
        bio,
        availableFrom,
        availableTo,
        location,
        price,
        image,
        education:
          typeof education === "string" ? JSON.parse(education) : education,
        service: typeof service === "string" ? JSON.parse(service) : service,
        experience:
          typeof experience === "string" ? JSON.parse(experience) : experience,
      });

      // Update Labs
      if (labIds && Array.isArray(labIds)) {
        await doctor.setLabs(labIds);
      }

      // Update Specialties
      if (specificationIds && Array.isArray(specificationIds)) {
        await doctor.setSpecialties(specificationIds);
      }

      return res.status(200).json({ msg: "Doctor updated", data: doctor });
    } catch (error) {
      return res
        .status(400)
        .json({ msg: "Update failed", error: error.message });
    }
  },
  // DELETE /doctor/:id
  async destroy(req, res) {
    try {
      const Doctor = await Doctor.findByPk(req.params.id);
      if (!Doctor) return res.status(404).json({ msg: "Doctor not found" });

      await Doctor.destroy();
      return res.status(200).json({ msg: "Doctor deleted" });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Delete failed", error: error.message });
    }
  },
};

module.exports = DoctorController;
