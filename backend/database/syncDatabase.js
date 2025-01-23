const User = require("./models/User");
const Appointment = require("./models/Appointment");
const Notification = require("./models/Notification");
const Message = require("./models/Message");
const Doctor = require("./models/Doctor");
const MyDoctor = require("./models/MyDoctor");
const sequelize = require("./index"); // Sequelize instance

// Define relationships
User.hasMany(Appointment, { foreignKey: "patientId" });
User.hasMany(Appointment, { foreignKey: "doctorId" });
Appointment.belongsTo(User, { as: "Patient", foreignKey: "patientId" });
Appointment.belongsTo(User, { as: "Doctor", foreignKey: "doctorId" });

User.hasMany(Notification, { foreignKey: "userId" });
Notification.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Message, { as: "SentMessages", foreignKey: "senderId" });
User.hasMany(Message, { as: "ReceivedMessages", foreignKey: "receiverId" });
Message.belongsTo(User, { as: "Sender", foreignKey: "senderId" });
Message.belongsTo(User, { as: "Receiver", foreignKey: "receiverId" });

User.hasOne(Doctor, { foreignKey: "userId" });
Doctor.belongsTo(User, { foreignKey: "userId" });

User.hasMany(MyDoctor, { as: "MyDoctors", foreignKey: "patientId" });
User.hasMany(MyDoctor, { as: "Patients", foreignKey: "doctorId" });
MyDoctor.belongsTo(User, { as: "Patient", foreignKey: "patientId" });
MyDoctor.belongsTo(User, { as: "Doctor", foreignKey: "doctorId" });

// Sync database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: false, force: true }); // Use { force: true } to drop and recreate tables
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};

// Export the function
module.exports = syncDatabase;
