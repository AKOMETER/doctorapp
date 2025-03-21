export interface SpecialtyType extends TimeStampType {
  id?: string;
  name: string;
  icon: string;
}

export interface DoctorType extends TimeStampType {
  id?: string;
  userId: number;
  bio: string;
  availableFrom: string;
  availableTo: string;
  ratings: number;
  location: string;
  price: string;
  specialtyName?: string;
  labName?: string;
  image: string;
  education: string;
  service: string;
  experience: string;
  Specialties: SpecialtyType[];
  Labs: LabType[];
  user?: UserType;
}

export interface UserType extends TimeStampType {
  id?: string;
  firstName: string;
  lastName: string;
  code: string;
  mobile: string;
  email: string;
  googleID: null;
  amount: number;
  facebookID: string;
  profileImage: string;
  role: string;
  token: string;
  rememberToken: string;
  resetToken: null;
  resetTokenExpiry: null;
}

export interface LabType extends TimeStampType {
  id?: string;
  name: string;
  image: string;
  description: string;
  location: string;
}

export interface AppointmentType extends TimeStampType {
  id?: string;
  patientId: number;
  doctorId: number;
  dateTime: string;
  duration: number;
  status: string;
  reason: string;
  remarks: string | null;
  Patient: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  Doctor: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}
export interface MessageType extends TimeStampType {
  id?: string;
  senderId: string;
  receiverId: string;
  content: string;
  isRead?: boolean;
  failed?: boolean;
}

export interface TimeStampType {
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductType extends TimeStampType {
  id?: string;
  name: string;
  image: string;
  description: string;
  price: number | string;
  stock: number | string;
  category: string;
}
