// jobs/reminderJob.js
const cron = require("node-cron");
const { sendMail } = require("../config/nodemailer");
const { Op } = require("sequelize");
const Appointment = require("../database/models/Appointment");
const User = require("../database/models/User");

const reminderJob = cron.schedule("* * * * *", async () => {
  const now = new Date();

  const timeWindows = [
    { label: "1 Day", diff: 24 * 60 * 60 * 1000 },
    { label: "1 Hour", diff: 60 * 60 * 1000 },
    { label: "10 Minutes", diff: 10 * 60 * 1000 },
  ];

  for (const window of timeWindows) {
    const targetTime = new Date(now.getTime() + window.diff);

    const appointments = await Appointment.findAll({
      where: {
        dateTime: {
          [Op.between]: [
            targetTime,
            new Date(targetTime.getTime() + 60 * 1000),
          ],
        },
      },
      include: [
        { model: User, as: "Patient", attributes: ["email", "name"] }, // Using "Patient"
        { model: User, as: "Doctor", attributes: ["email", "name"] }, // Using "Doctor"
      ],
    });

    for (const appt of appointments) {
      console.log("app", appt);
      if (appt.Patient?.email) {
        // Send email reminder to Patient
        await sendMail(
          appt.Patient.email,
          `Appointment Reminder - ${window.label} Left`,
          `<p>Hello ${appt.Patient.name || "User"},</p>
           <p>This is a reminder that you have an appointment in <strong>${
             window.label
           }</strong> at ${appt.dateTime.toLocaleString()}.</p>
           <p>Please be available on time.</p><br>— Jiconstruct Health`
        );
      }

      if (appt.Doctor?.email) {
        // Optionally, send email reminder to Doctor
        await sendMail(
          appt.Doctor.email,
          `Appointment Reminder - ${window.label} Left`,
          `<p>Hello Dr. ${appt.Doctor.name || "Doctor"},</p>
           <p>This is a reminder that you have an appointment with ${
             appt.Patient.name || "your patient"
           } in <strong>${
            window.label
          }</strong> at ${appt.dateTime.toLocaleString()}.</p>
           <p>Please be on time for the appointment.</p><br>— Jiconstruct Health`
        );
      }
    }
  }

  console.log("Appointment reminders checked at", now.toISOString());
});

module.exports = reminderJob;
