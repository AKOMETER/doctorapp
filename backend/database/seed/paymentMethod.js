const PaymentMethod = require("../models/PaymentMethod");
const sequelize = require("../index"); // Sequelize instance

export const seedPaymentMethods = async () => {
  try {
    await sequelize.sync({ force: false });

    const methods = [
      { name: "Visa", type: "credit_card" },
      { name: "MasterCard", type: "credit_card" },
      { name: "PayPal", type: "mobile_wallet" },
      { name: "Stripe", type: "mobile_wallet" },
      { name: "Bank Transfer", type: "bank_transfer" },
    ];

    await PaymentMethod.bulkCreate(methods);
    console.log("Payment methods seeded successfully.");
  } catch (error) {
    console.error("Error seeding payment methods:", error);
  } finally {
    process.exit();
  }
};
