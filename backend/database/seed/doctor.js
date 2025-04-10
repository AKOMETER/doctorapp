const { faker } = require("@faker-js/faker");
const sequelize = require("../index"); // Sequelize instance
const Doctor = require("../models/Doctor");

const seedDoctors = async (count = 10) => {
  try {
    await sequelize.sync(); // Ensure tables exist

    // const doctors_images = [
    //   "https://as1.ftcdn.net/jpg/05/62/06/98/1000_F_562069833_HqiCBc63YvqQafkOwsmmXWjWafKEdFLD.jpg",
    //   "https://c8.alamy.com/comp/2JK0RRB/these-results-are-looking-good-a-handsome-young-doctor-standing-alone-in-his-clinic-and-using-a-digital-tablet-2JK0RRB.jpg",
    //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvbD_IMsaCe0Ygm1agyt8p7igV58GAdnp81Q&s",
    //   "https://thumbs.dreamstime.com/b/beautiful-successful-female-doctor-13011820.jpg",
    //   "https://img.freepik.com/free-photo/portrait-beautiful-blonde-female-doctor_329181-1230.jpg?semt=ais_hybrid&w=740",
    //   "https://cbx-prod.b-cdn.net/COLOURBOX61425590.jpg?width=800&height=800&quality=70",
    //   "https://img.freepik.com/free-photo/portrait-handsome-young-doctor_23-2148352011.jpg",
    //   "https://img.freepik.com/free-photo/cheerful-young-medic-hospital_23-2147763852.jpg",
    //   "https://media.istockphoto.com/id/483192178/photo/ill-have-to-fit-as-a-fiddle.jpg?s=612x612&w=0&k=20&c=C-94ghGWJosb6l3-sJT_uJghT2GdcBHlkKyX_vbrcl4=",
    //   "https://c8.alamy.com/comp/D3YH2G/female-doctor-standing-with-her-arms-crossed-and-smiling-D3YH2G.jpg",
    //   "https://cbx-prod.b-cdn.net/COLOURBOX61542861.jpg?width=800&height=800&quality=70",
    // ];

    const doctors_images = [
      "https://static.vecteezy.com/system/resources/previews/024/585/358/non_2x/3d-happy-cartoon-doctor-cartoon-doctor-on-transparent-background-generative-ai-d.d",
      "https://static.vecteezy.com/system/resources/previews/024/585/326/non_2x/3d-happy-cartoon-doctor-cartoon-doctor-on-transparent-background-generative-ai-d.d",
      "https://static.vecteezy.com/system/resources/previews/024/585/403/non_2x/3d-happy-cartoon-doctor-cartoon-doctor-on-transparent-background-generative-ai-d.png",
      "https://static.vecteezy.com/system/resources/previews/024/585/399/non_2x/3d-happy-cartoon-doctor-cartoon-doctor-on-transparent-background-generative-ai-png.png",
      "https://static.vecteezy.com/system/resources/previews/053/237/197/non_2x/happy-3d-cartoon-doctor-holding-clipboard-healthcare-medical-checkup-png.png",
      "https://static.vecteezy.com/system/resources/previews/024/585/299/non_2x/3d-happy-cartoon-doctor-cartoon-doctor-on-transparent-background-generative-ai-png.png",
      "https://static.vecteezy.com/system/resources/previews/046/380/856/non_2x/3d-cute-cartoon-male-doctor-png.png",
      "https://png.pngtree.com/png-clipart/20231003/original/pngtree-3d-happy-cartoon-doctor-cartoon-doctor-generative-ai-png-image_13247511.png",
      "https://i.pinimg.com/474x/16/7c/c9/167cc9c96c2302638429c1c986feea39.jpg",
      "https://png.pngtree.com/png-clipart/20240826/original/pngtree-cartoon-career-female-doctor-png-image_15854227.png",
      "https://png.pngtree.com/png-clipart/20250117/original/pngtree-female-doctor-cartoon-style-stethoscope-png-image_20045591.d",
    ];

    let doctors = [];
    for (let i = 0; i < 7; i++) {
      doctors.push({
        userId: faker.number.int({ min: 1, max: 10 }), // Assume users exist
        lab: faker.number.int({ min: 1, max: 5 }), // Assume labs exist
        specialty: faker.number.int({ min: 1, max: 5 }), // Assume specialties exist
        bio: faker.lorem.sentence(),
        availableFrom: "09:00 AM",
        availableTo: "05:00 PM",
        ratings: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
        location: faker.location.city() + ", " + faker.location.country(),
        price: faker.number.float({ min: 20, max: 200, precision: 0.01 }),
        image: doctors_images[i],
        education: {
          school: faker.person.jobTitle(),
          location: faker.location.city(),
          year: faker.number.int({ min: 2000, max: 2024 }),
        },
        service: ["Consultation", "Surgery", "Therapy"].slice(
          0,
          faker.number.int({ min: 1, max: 3 })
        ),
        experience: {
          name: faker.person.jobTitle(),
          location: faker.location.city(),
          year: faker.number.int({ min: 2010, max: 2024 }),
        },
      });
    }

    await Doctor.bulkCreate(doctors);
    console.log(`${count} doctors inserted successfully!`);
    process.exit();
  } catch (error) {
    console.error("Error seeding doctors:", error);
    process.exit(1);
  }
};
module.exports = seedDoctors;
