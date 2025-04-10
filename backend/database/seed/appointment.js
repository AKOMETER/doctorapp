const { faker } = require("@faker-js/faker");
const sequelize = require("../index");
const Appointment = require("../models/Appointment");

const seedAppointments = async (count = 10) => {
  try {
    await sequelize.sync(); // Ensure tables exist

    let appointments = [];
    for (let i = 0; i < count; i++) {
      appointments.push({
        patientId: faker.number.int({ min: 1, max: 10 }), // Assume users exist
        doctorId: faker.number.int({ min: 1, max: 10 }), // Assume doctors exist
        dateTime: faker.date.future(), // Generate a future date
        status: faker.helpers.arrayElement([
          "Pending",
          "Confirmed",
          "Cancelled",
          "Reschedule",
        ]),
        duration: faker.number.int({ min: 1, max: 24 }), // Duration in hours
        reason: faker.lorem.sentence(),
        remark: faker.lorem.sentence(),
      });
    }

    await Appointment.bulkCreate(appointments);
    console.log(`${count} appointments inserted successfully!`);
    process.exit();
  } catch (error) {
    console.error("Error seeding appointments:", error);
    process.exit(1);
  }
};

module.exports = seedAppointments;
