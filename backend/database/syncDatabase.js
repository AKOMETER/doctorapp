const User = require("./models/User");
const Lab = require("./models/Lab");
const Specialty = require("./models/Specialty");
const Notification = require("./models/Notification");
const Message = require("./models/Message");
const Doctor = require("./models/Doctor");
const sequelize = require("./index"); // Sequelize instance
const Transaction = require("./models/Transaction");
const PaymentMethod = require("./models/PaymentMethod");
const MyDoctor = require("./models/MyDoctor");
const Appointment = require("./models/Appointment");

// Define relationships
User.hasMany(Appointment, {
  foreignKey: "patientId",
  as: "AppointmentsAsPatient",
});
User.hasMany(Appointment, {
  foreignKey: "doctorId",
  as: "AppointmentsAsDoctor",
});

Appointment.belongsTo(User, { as: "Patient", foreignKey: "patientId" });
Appointment.belongsTo(User, { as: "Doctor", foreignKey: "doctorId" });

User.hasMany(Notification, { foreignKey: "userId" });
Notification.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Message, { as: "SentMessages", foreignKey: "senderId" });
User.hasMany(Message, { as: "ReceivedMessages", foreignKey: "receiverId" });

Message.belongsTo(User, { as: "Sender", foreignKey: "senderId" });
Message.belongsTo(User, { as: "Receiver", foreignKey: "receiverId" });

Doctor.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasOne(Doctor, { foreignKey: "userId", as: "doctor" });

User.hasMany(MyDoctor, { as: "MyDoctors", foreignKey: "patientId" });
User.hasMany(MyDoctor, { as: "Patients", foreignKey: "doctorId" });

MyDoctor.belongsTo(User, { as: "Patient", foreignKey: "patientId" });
MyDoctor.belongsTo(User, { as: "Doctor", foreignKey: "doctorId" });

Transaction.belongsTo(User, { foreignKey: "userId" });
Transaction.belongsTo(PaymentMethod, { foreignKey: "paymentMethodId" });
User.hasMany(Transaction, { foreignKey: "userId" });

// Junction Table for Doctor ↔ Lab
const DoctorLab = sequelize.define("DoctorLab", {}, { timestamps: false });

// Junction Table for Doctor ↔ Specialty
const DoctorSpecialty = sequelize.define(
  "DoctorSpecialty",
  {},
  { timestamps: false }
);

//many to many
Doctor.belongsToMany(Lab, { through: DoctorLab });
Lab.belongsToMany(Doctor, { through: DoctorLab });

Doctor.belongsToMany(Specialty, { through: DoctorSpecialty });
Specialty.belongsToMany(Doctor, { through: DoctorSpecialty });

// Sync database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: false }); // Use { force: true } to drop and recreate tables
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};

// Export the function
module.exports = syncDatabase;
