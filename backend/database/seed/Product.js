const { faker } = require("@faker-js/faker");
const Product = require("../models/Product");
const sequelize = require("../index");

const real_data = [
  {
    img: "https://cpimg.tistatic.com/04983658/b/4/Panadol-Paracetamol.jpg",
    name: "Panadol",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSivdAwZWSfk3faEp6TSIyn_ISDLIEhP-pzIQ&s",
    name: "Invocare",
  },
  {
    name: "Mock Up",
    img: "https://img.freepik.com/premium-psd/mockup-plastic-medical-pill-bottle-packaging-medicine-container-with-capsules-isolated_225210-387.jpg",
  },
  {
    name: "Bayer",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0KkbIw3XWZex8VQSoS348cICKU7HuSaIPEw&s",
  },
  {
    name: "Anti Biotic",
    img: "https://www.shutterstock.com/image-photo/antibiotic-drug-open-paper-packaging-600nw-504085291.jpg",
  },
  {
    img: "https://c8.alamy.com/comp/HDE2YW/metformin-prescription-bottle-metformin-is-a-generic-medication-name-HDE2YW.jpg",
    name: "Reno",
  },
];

const seedProducts = async () => {
  try {
    await sequelize.sync(); // Sync without dropping tables
    const Products = [];

    for (let i = 0; i <= 5; i++) {
      Products.push({
        name: real_data[i].name,
        image: real_data[i].img,
        stock: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
        price: faker.number.int({ min: 20, max: 200 }),
        description: faker.lorem.sentence(),
        category: faker.location.city() + ", " + faker.location.country(),
      });
    }

    await Product.bulkCreate(Products);
    console.log("Products seeded successfully.");
  } catch (error) {
    console.error("Error seeding Products:", error);
  } finally {
    process.exit();
  }
};
// seedProducts();
module.exports = seedProducts;
