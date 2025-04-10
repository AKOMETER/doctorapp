const seedUsers = require("./seed/users");
const seedSpecialties = require("./seed/Specialty");
const seedLabs = require("./seed/Lab");
const ProductLabs = require("./seed/Product");
const seedDoctors = require("./seed/doctor");
const seedAppointments = require("./seed/appointment");
const seedPaymentMethods = require("./seed/paymentMethod");
const seedTransactions = require("./seed/transaction");
const seedProducts = require("./seed/Product");

// seedUsers(10);
// seedSpecialties(10);
// seedLabs(10);

// seedPaymentMethods();
// seedDoctors(10);
// seedAppointments(10);
// seedTransactions(10);
seedProducts(10);

/**
 * //populate doctor lab
 * INSERT INTO `DoctorSpecialties`(`DoctorId`, `SpecialtyId`) VALUES
(1,1), (1,2),
(2,1), (2,2),
(3,1), (3,2),
(4,1), (4,2),
(5,1), (5,2),
(6,1), (6,2),
(7,1), (7,2);
 */
