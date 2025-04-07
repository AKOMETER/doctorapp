const Appointment = require("../database/models/Appointment");
const Doctor = require("../database/models/Doctor");
const User = require("../database/models/User");

const AppointmentController = {
  // GET /appointments
  async index(req, res) {
    try {
      const appointments = await Appointment.findAll({
        include: [
          {
            model: User,
            as: "Patient",
            attributes: ["id", "firstName", "lastName", "email"],
          },
          {
            model: User,
            as: "Doctor",
            attributes: ["id", "firstName", "lastName", "email"],
          },
        ],
      });
      return res.status(200).json({ data: appointments });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Server error", error: error.message });
    }
  },

  async focus(req, res) {
    try {
      const user = req.user.user;

      console.log(user);
      if (!user) {
        return res.status(401).json({ msg: "Please login first" });
      }

      if (user.role !== "Doctor") {
        return res
          .status(403)
          .json({ msg: "Access denied. Only doctors allowed." });
      }

      const appointments = await Appointment.findAll({
        where: { doctorId: user.id },
        include: [
          {
            model: User,
            as: "Patient",
            attributes: ["id", "firstName", "lastName", "email"],
          },
          {
            model: User,
            as: "Doctor",
            attributes: ["id", "firstName", "lastName", "email"],
          },
        ],
      });

      return res.status(200).json({ data: appointments });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Server error", error: error.message });
    }
  },

  // GET /appointments/:id
  async show(req, res) {
    try {
      const userId = req.params.id; // e.g., /appointments/23

      const appointments = await Appointment.findAll({
        where: { patientId: userId },
        include: [
          {
            model: User,
            as: "Patient",
            attributes: ["id", "firstName", "lastName", "email"],
          },
          {
            model: User,
            as: "Doctor",
            attributes: ["id", "firstName", "lastName", "email"],
          },
        ],
      });

      return res.status(200).json({ data: appointments });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Server error", error: error.message });
    }
  },

  // GET /appointments/:id
  async getOne(req, res) {
    try {
      const id = req.params.id;

      const appointment = await Appointment.findOne({
        where: { id },
        include: [
          {
            model: User,
            as: "Patient",
          },
          {
            model: Doctor,
            as: "doctorProfile", // this matches the alias you just added
            include: [
              {
                model: User,
                as: "user",
              },
            ],
          },
        ],
      });

      if (!appointment) {
        return res.status(404).json({ msg: "Appointment not found" });
      }

      return res.status(200).json({ data: appointment });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Server error", error: error.message });
    }
  },

  // POST /appointments
  async store(req, res) {
    try {
      const { patientId, doctorId, status, dateTime, duration, reason } =
        req.body;
      const appointment = await Appointment.create({
        patientId,
        doctorId,
        status,
        dateTime,
        duration,
        reason,
      });

      return res
        .status(201)
        .json({ msg: "Appointment created", data: appointment });
    } catch (error) {
      return res
        .status(400)
        .json({ msg: "Creation failed", error: error.message });
    }
  },

  // update appointment
  async update(req, res) {
    try {
      const { remark, status } = req.body;
      const appointment = await Appointment.findByPk(req.params.id);
      if (!appointment)
        return res.status(404).json({ msg: "Appointment not found" });

      await appointment.update({ remark, status });

      return res
        .status(200)
        .json({ msg: "Appointment updated", data: appointment });
    } catch (error) {
      return res
        .status(400)
        .json({ msg: "Update failed", error: error.message });
    }
  },

  // DELETE /appointments/:id
  async destroy(req, res) {
    try {
      const specialty = await Appointment.findByPk(req.params.id);
      if (!specialty)
        return res.status(404).json({ msg: "Appointment not found" });

      await specialty.destroy();
      return res.status(200).json({ msg: "Appointment deleted" });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Delete failed", error: error.message });
    }
  },
};

module.exports = AppointmentController;
