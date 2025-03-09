const sequelize = require("../index"); // Sequelize instance
const Specialty = require("../models/Specialty");

const specialties = [
  { name: "Dentist", icon: "dentist.png" },
  { name: "Neurologist", icon: "neurologist.png" },
  { name: "Orthopedic", icon: "arthopedic.jpg" },
  { name: "Cardiologist", icon: "cardiologist.jpg" },
  { name: "Dermatologist", icon: "Dermatologist.jpg" },
  { name: "Pediatrician", icon: "Pediatrician.png" },
  { name: "Psychiatrist", icon: "Psychiatrist.webp" },
  { name: "Radiologist", icon: "Radiologist.webp" },
  { name: "Oncologist", icon: "Oncologist.webp" },
  { name: "ENT Specialist", icon: "ENT_Specialist.webp" },
  {
    name: "Gynecologist",
    icon: "Gynecologist.webp",
  },
  {
    name: "Allergist",
    icon: "Allergist.webp",
  },
  { name: "Urologist", icon: "Urologist.webp" },
  { name: "Gastroenterologist", icon: "Gastroenterologist.png" },
  { name: "Hematologist", icon: "Hematologist.webp" },
  { name: "Endocrinologist", icon: "Endocrinologist.png" },
  {
    name: "Ophthalmologist",
    icon: "Ophthalmologist.png",
  },
  {
    name: "Pulmonologist",
    icon: "Pulmonologist.jpg",
  },
  {
    name: "Nephrologist",
    icon: "Nephrologist.webp",
  },
  {
    name: "Immunologist",
    icon: "Immunologist.png",
  },
];

const seedSpecialties = async () => {
  try {
    // await sequelize.sync({ force: false }); // Ensure database sync without dropping tables
    await sequelize.sync();
    await Specialty.bulkCreate(specialties);
    console.log("Specialties seeded successfully.");
  } catch (error) {
    console.error("Error seeding specialties:", error);
  } finally {
    await sequelize.close();
  }
};
module.exports = seedSpecialties;
