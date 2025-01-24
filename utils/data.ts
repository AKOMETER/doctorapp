export const specialities = [
  {
    id: 1,
    name: "Dentist",
    icon: "https://img.icons8.com/color/64/tooth.png",
    url: "/pages/specialities/id=1",
  },
  {
    id: 2,
    name: "Neurologist",
    icon: "https://img.icons8.com/color/64/brain.png",
    url: "/pages/specialities/id=2",
  },
  {
    id: 3,
    name: "Orthopedic",
    icon: "https://img.icons8.com/color/64/orthopedic.png",
    url: "/pages/specialities/id=3",
  },
  {
    id: 4,
    name: "Cardiologist",
    icon: "https://img.icons8.com/color/64/heart-health.png",
    url: "/pages/specialities/id=4",
  },
];

export const lab = [];

export const doctors = [
  {
    id: 1,
    name: "Dr. Zara K",
    location: "Coimbatore, India",
    price: "₹50.00 / per slot",
    rating: 4.5,
    specialty: 1,
    lab: 1,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    url: "/pages/doctor/id=1",
    education: {
      school: "MBBS",
      location: "PSG",
      year: "2020",
    },
    service: ["Cleaning", "repair"],
    experience: {
      name: "Junior Doctor",
      location: "PSG",
      year: "2021",
    },
  },
  {
    id: 2,
    name: "Dr. Waseem Sabra",
    location: "Cherrybrook, Australia",
    price: "₹2.45 / per slot",
    rating: 4.0,
    specialty: 2,
    lab: 2,
    image: "https://randomuser.me/api/portraits/men/47.jpg",
    url: "/pages/doctor/id=2",
    education: {
      school: "MBBS",
      location: "PSG",
      year: "2020",
    },
    service: ["Cleaning", "repair"],
    experience: {
      name: "Junior Doctor",
      location: "PSG",
      year: "2021",
    },
  },
];

export const appointments = [
  { id: 1, patient: "John Doe", status: "Confirmed", date: "2024-12-10" },
  { id: 2, patient: "Jane Smith", status: "Pending", date: "2024-12-11" },
  { id: 3, patient: "Alice Brown", status: "Cancelled", date: "2024-12-12" },
];
