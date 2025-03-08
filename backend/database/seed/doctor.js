const { faker } = require("@faker-js/faker");
const sequelize = require("../index"); // Sequelize instance
const Doctor = require("../models/Doctor");

export const seedDoctors = async (count = 10) => {
  try {
    await sequelize.sync(); // Ensure tables exist

    let doctors = [];
    for (let i = 0; i < count; i++) {
      doctors.push({
        userId: faker.number.int({ min: 1, max: 10 }), // Assume users exist
        lab: faker.number.int({ min: 1, max: 5 }), // Assume labs exist
        specialty: faker.number.int({ min: 1, max: 5 }), // Assume specialties exist
        bio: faker.lorem.sentence(),
        availableFrom: "09:00 AM",
        availableTo: "05:00 PM",
        ratings: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
        location: faker.location.city() + ", " + faker.location.country(),
        price: faker.number.float({ min: 20, max: 200, precision: 0.01 }),
        image: faker.image.avatar(),
        education: {
          school: faker.person.jobTitle(),
          location: faker.location.city(),
          year: faker.number.int({ min: 2000, max: 2024 }),
        },
        service: ["Consultation", "Surgery", "Therapy"].slice(
          0,
          faker.number.int({ min: 1, max: 3 })
        ),
        experience: {
          name: faker.person.jobTitle(),
          location: faker.location.city(),
          year: faker.number.int({ min: 2010, max: 2024 }),
        },
      });
    }

    await Doctor.bulkCreate(doctors);
    console.log(`${count} doctors inserted successfully!`);
    process.exit();
  } catch (error) {
    console.error("Error seeding doctors:", error);
    process.exit(1);
  }
};
