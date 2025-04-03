// defaults.ts

import {
  DoctorType,
  UserType,
  SpecialtyType,
  LabType,
  AppointmentType,
  IsUserLoggedInType,
  MedicalRecordType,
} from "./dataTypes"; // adjust path as needed

export const defaultUser: UserType = {
  id: "",
  firstName: "",
  lastName: "",
  code: "",
  mobile: "",
  email: "",
  googleID: null,
  facebookID: "",
  amount: 0,
  profileImage: "",
  role: "",
  cartItem: [],
  token: "",
  rememberToken: "",
  resetToken: null,
  resetTokenExpiry: null,
  createdAt: "",
  updatedAt: "",
};

export const defaultSpecialty: SpecialtyType = {
  id: "",
  name: "",
  icon: "",
  createdAt: "",
  updatedAt: "",
};

export const defaultLab: LabType = {
  id: "",
  name: "",
  image: "",
  description: "",
  location: "",
  createdAt: "",
  updatedAt: "",
};

export const defaultDoctor: DoctorType = {
  id: "",
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
  id: "",
  patientId: 0,
  doctorId: 0,
  dateTime: "",
  duration: 0,
  status: "",
  reason: "",
  remarks: null,
  createdAt: "",
  updatedAt: "",
  Patient: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  },
  Doctor: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  },
};

export const defaultIsUserLogged: IsUserLoggedInType = {
  status: false,
  user: defaultUser,
  msg: "",
  cart: [],
};

export const defaultMedicalRecord: MedicalRecordType = {
  bloodGroup: "",
  bloodType: "",
  genotype: "",
  allergies: "",
  chronicDiseases: "",
  medicalNote: "",
};
