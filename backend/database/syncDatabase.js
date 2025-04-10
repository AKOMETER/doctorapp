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
const MedicalRecord = require("./models/MedicalRecord");
const Record = require("./models/Record");
const CartItem = require("./models/CartItem");
const Product = require("./models/Product");

// Define relationships
User.hasMany(Appointment, {
  foreignKey: "patientId",
  as: "AppointmentsAsPatient",
});
User.hasMany(Appointment, {
  foreignKey: "doctorId",
  as: "AppointmentsAsDoctor",
});

//appointment
Appointment.belongsTo(User, { as: "Patient", foreignKey: "patientId" });
Appointment.belongsTo(User, { as: "Doctor", foreignKey: "doctorId" });

//doctor and appointment
Appointment.belongsTo(Doctor, { foreignKey: "doctorId", as: "doctorProfile" });
Doctor.hasMany(Appointment, { foreignKey: "doctorId" });

//notification
User.hasMany(Notification, { foreignKey: "userId" });
Notification.belongsTo(User, { foreignKey: "userId" });

//send message and received message
User.hasMany(Message, { as: "SentMessages", foreignKey: "senderId" });
User.hasMany(Message, { as: "ReceivedMessages", foreignKey: "receiverId" });

Message.belongsTo(User, { as: "Sender", foreignKey: "senderId" });
Message.belongsTo(User, { as: "Receiver", foreignKey: "receiverId" });

//doctor
Doctor.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasOne(Doctor, { foreignKey: "userId", as: "doctor" });

//medical record
MedicalRecord.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasOne(MedicalRecord, { foreignKey: "userId", as: "medicalRecord" });

//record
Record.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasOne(Record, { foreignKey: "userId", as: "record" });

Record.belongsTo(Doctor, { foreignKey: "doctorId", as: "doctor" });
Doctor.hasOne(Record, { foreignKey: "doctorId", as: "record" });

//my doctor
User.hasMany(MyDoctor, { as: "MyDoctors", foreignKey: "patientId" });
User.hasMany(MyDoctor, { as: "Patients", foreignKey: "doctorId" });

MyDoctor.belongsTo(User, { as: "Patient", foreignKey: "patientId" });
MyDoctor.belongsTo(User, { as: "Doctor", foreignKey: "doctorId" });

//transaction
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

//many to many doctor and lab / doctor and speciality
Doctor.belongsToMany(Lab, { through: DoctorLab });
Lab.belongsToMany(Doctor, { through: DoctorLab });

Doctor.belongsToMany(Specialty, { through: DoctorSpecialty });
Specialty.belongsToMany(Doctor, { through: DoctorSpecialty });

//product and cart
User.hasMany(CartItem, { foreignKey: "userId" });
CartItem.belongsTo(User, { foreignKey: "userId" });

Product.hasMany(CartItem, { foreignKey: "productId" });
CartItem.belongsTo(Product, { foreignKey: "productId" });

// Sync database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: false });
    // await sequelize.sync({ alter: true, force: true });

    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};

// Export the function
module.exports = syncDatabase;
