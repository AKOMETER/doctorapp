const seedUsers = require("./seed/users");
const seedSpecialties = require("./seed/Specialty");
const seedLabs = require("./seed/Lab");
const seedDoctors = require("./seed/doctor");
const seedAppointments = require("./seed/appointment");
const seedPaymentMethods = require("./seed/paymentMethod");
const seedTransactions = require("./seed/transaction");

// seedUsers(10);
// seedSpecialties(10);
// seedLabs(10);
seedPaymentMethods();
// seedDoctors(10);
// seedAppointments(10);
seedTransactions(10);
