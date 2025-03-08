const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");
const sequelize = require("../index");
const User = require("../models/User");

export const seedUsers = async (count = 10) => {
  try {
    await sequelize.sync(); // Ensure tables exist

    let users = [];
    for (let i = 0; i < count; i++) {
      const plainPassword = "password123"; // Default password
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      users.push({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        code: faker.string.alphanumeric(6),
        mobile: faker.phone.number("+91##########"),
        email: faker.internet.email(),
        googleID: faker.datatype.boolean() ? faker.string.uuid() : null,
        facebookID: faker.datatype.boolean() ? faker.string.uuid() : null,
        password: hashedPassword,
        profileImage: faker.image.avatar(),
        role: faker.helpers.arrayElement(["Doctor", "Patient", "Labs"]),
        token: faker.datatype.boolean() ? faker.string.uuid() : null,
        rememberToken: faker.datatype.boolean() ? faker.string.uuid() : null,
        resetToken: null,
        resetTokenExpiry: null,
      });
    }

    await User.bulkCreate(users);
    console.log(`${count} users inserted successfully!`);
    process.exit();
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  }
};
