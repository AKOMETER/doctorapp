const { faker } = require("@faker-js/faker");
const Transaction = require("../models/Transaction");
const sequelize = require("../index"); // Sequelize instance

const seedTransactions = async (count) => {
  try {
    // await sequelize.sync({ force: false });
    await sequelize.sync();

    const transactions = [];
    for (let i = 0; i < count; i++) {
      transactions.push({
        userId: faker.number.int({ min: 1, max: 10 }),
        paymentMethodId: faker.number.int({ min: 1, max: 5 }),
        amount: faker.finance.amount(10, 500, 2),
        currency: "USD",
        status: faker.helpers.arrayElement(["pending", "completed", "failed"]),
        reference: faker.string.uuid(),
      });
    }

    await Transaction.bulkCreate(transactions);
    console.log("Transactions seeded successfully.");
  } catch (error) {
    console.error("Error seeding transactions:", error);
  } finally {
    process.exit();
  }
};

module.exports = seedTransactions;
