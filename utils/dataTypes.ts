export interface SpecialtyType {
  id: number;
  name: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export interface DoctorType {
  id: number;
  userId: number;
  bio: string;
  availableFrom: string;
  availableTo: string;
  ratings: number;
  location: string;
  price: string;
  image: string;
  education: JSON;
  Specialties: SpecialtyType[];
  Labs: LabType[];
  service: JSON;
  experience: JSON;
  createdAt: string;
  updatedAt: string;
  user: UserType;
}

export interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  code: string;
  mobile: string;
  email: string;
  googleID: null;
  facebookID: string;
  profileImage: string;
  role: string;
  token: string;
  rememberToken: string;
  resetToken: null;
  resetTokenExpiry: null;
  createdAt: string;
  updatedAt: string;
}

export interface LabType {
  id: number;
  name: string;
  image: string;
  description: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}
