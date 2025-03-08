const { faker } = require("@faker-js/faker");
const Lab = require("../models/Lab");
const sequelize = require("../config/database");

export const seedLabs = async () => {
  try {
    await sequelize.sync({ force: false }); // Sync without dropping tables

    const labs = [];

    for (let i = 0; i < 10; i++) {
      labs.push({
        name: faker.company.name(),
        image: faker.image.url(), // Generates a random image URL
        description: faker.lorem.sentence(),
        location: faker.location.city() + ", " + faker.location.country(),
      });
    }

    await Lab.bulkCreate(labs);
    console.log("Labs seeded successfully.");
  } catch (error) {
    console.error("Error seeding labs:", error);
  } finally {
    process.exit();
  }
};
