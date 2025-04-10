const { faker } = require("@faker-js/faker");
const Lab = require("../models/Lab");
const sequelize = require("../index");

const real_data = [
  {
    img: "https://www.acentech.com/wp-content/uploads/2015/11/brigham-and-womens-interior-acentech-01.jpg",
    name: "Brigham & Women's Hospital Hale Lab",
  },
  {
    img: "https://media.gettyimages.com/id/458683895/photo/new-mexico-scientific-laboratories-building.jpg?s=612x612&w=gi&k=20&c=FQCsYyCnvVURP8qA3YBDXiIa0kFfhFSI0ftLT2raFfs=",
    name: "Getty labs",
  },
  {
    name: "Regional CLinic Labs",
    img: "https://c8.alamy.com/comp/W13NN7/hospital-laboratory-department-W13NN7.jpg",
  },
  {
    name: "almg labs",
    img: "https://cdn.labmanager.com/assets/articleNo/27115/aImg/49622/2017-03070-000-n21-medium-m.jpg",
  },
  {
    name: "lite labs",
    img: "https://mgmcgrath.com/wp-content/uploads/2014/10/3m280-4.jpg",
  },
  {
    img: "https://www.acentech.com/wp-content/uploads/2015/11/brigham-and-womens-interior-acentech-01.jpg",
    name: "Brigham & Women's Hospital Hale Lab",
  },
  {
    img: "https://media.gettyimages.com/id/458683895/photo/new-mexico-scientific-laboratories-building.jpg?s=612x612&w=gi&k=20&c=FQCsYyCnvVURP8qA3YBDXiIa0kFfhFSI0ftLT2raFfs=",
    name: "Getty labs",
  },
  {
    name: "Regional CLinic Labs",
    img: "https://c8.alamy.com/comp/W13NN7/hospital-laboratory-department-W13NN7.jpg",
  },
  {
    name: "almg labs",
    img: "https://cdn.labmanager.com/assets/articleNo/27115/aImg/49622/2017-03070-000-n21-medium-m.jpg",
  },
  {
    name: "lite labs",
    img: "https://mgmcgrath.com/wp-content/uploads/2014/10/3m280-4.jpg",
  },
  {
    img: "https://media.gettyimages.com/id/458683895/photo/new-mexico-scientific-laboratories-building.jpg?s=612x612&w=gi&k=20&c=FQCsYyCnvVURP8qA3YBDXiIa0kFfhFSI0ftLT2raFfs=",
    name: "Getty labs",
  },
];

const seedLabs = async () => {
  try {
    // await sequelize.sync({ force: false }); // Sync without dropping tables
    await sequelize.sync();
    const labs = [];

    for (let i = 0; i < 10; i++) {
      labs.push({
        name: real_data[i].name,
        image: real_data[i].img, // Generates a random image URL
        description: faker.lorem.sentence(),
        location: faker.location.city() + ", " + faker.location.country(),
      });
    }

    await Lab.bulkCreate(labs);
    console.log("Labs seeded successfully.");
  } catch (error) {
    console.error("Error seeding labs:", error);
  } finally {
    process.exit();
  }
};

// seedLabs();
module.exports = seedLabs;
