const { faker } = require("@faker-js/faker");
const sequelize = require("../index");
const Appointment = require("../models/Appointment");

export const seedAppointments = async (count = 10) => {
  try {
    await sequelize.sync(); // Ensure tables exist

    let appointments = [];
    for (let i = 0; i < count; i++) {
      appointments.push({
        patientId: faker.number.int({ min: 1, max: 10 }), // Assume users exist
        doctorId: faker.number.int({ min: 1, max: 10 }), // Assume doctors exist
        dateTime: faker.date.future(), // Random future date
        status: faker.helpers.arrayElement([
          "Pending",
          "Confirmed",
          "Cancelled",
          "Completed",
        ]),
        reason: faker.lorem.sentence(),
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
