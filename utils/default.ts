// defaults.ts

import {
  DoctorType,
  UserType,
  SpecialtyType,
  LabType,
  AppointmentType,
} from "./dataTypes"; // adjust path as needed

export const defaultUser: UserType = {
  id: 0,
  firstName: "",
  lastName: "",
  code: "",
  mobile: "",
  email: "",
  googleID: null,
  facebookID: "",
  profileImage: "",
  role: "",
  token: "",
  rememberToken: "",
  resetToken: null,
  resetTokenExpiry: null,
  createdAt: "",
  updatedAt: "",
};

export const defaultSpecialty: SpecialtyType = {
  id: 0,
  name: "",
  icon: "",
  createdAt: "",
  updatedAt: "",
};

export const defaultLab: LabType = {
  id: 0,
  name: "",
  image: "",
  description: "",
  location: "",
  createdAt: "",
  updatedAt: "",
};

export const defaultDoctor: DoctorType = {
  id: 0,
  userId: 0,
  bio: "",
  availableFrom: "",
  availableTo: "",
  ratings: 0,
  location: "",
  price: "",
  specialtyName: "",
  labName: "",
  image: "",

  education: "",
  Specialties: [],
  Labs: [],
  service: "",
  experience: "",
  createdAt: "",
  updatedAt: "",
  user: defaultUser,
};

export const defaultAppointment: AppointmentType = {
  id: 0,
  patientId: 0,
  doctorId: 0,
  dateTime: "",
  duration: 0,
  status: "",
  reason: "",
  remarks: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  Patient: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
  },
  Doctor: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
  },
};
