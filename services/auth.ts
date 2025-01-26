import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const backendUrl = process.env.EXPO_PUBLIC_BACKENDURL; // Get the BACKENDURL from the .env file

// Axios instance
const api = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios interceptor to add Bearer token to each request
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token"); // Get token from AsyncStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error: any) {
    if (error.response.data.errors) {
      const errs: any[] = error.response.data.errors;

      errs.forEach((err) => {
        Alert.alert("Error", err.msg || "Something went wrong");
      });
    }

    Alert.alert("Error", error.response?.data?.msg || "Something went wrong");
  }
};

export const register = async (data: Record<string, any>) => {
  try {
    const response = await api.post("/auth/register", data);
    return response.data;
  } catch (error: any) {
    if (error.response.data.errors) {
      const errs: any[] = error.response.data.errors;

      errs.forEach((err) => {
        Alert.alert("Error", err.msg || "Something went wrong");
      });
    }

    Alert.alert("Error", error.response?.data?.msg || "Something went wrong");
  }
};

export const forget_password = async (email: string) => {
  try {
    const response = await api.post("/auth/forget_password", email);
    console.log(response);
    return response.data;
  } catch (error: any) {
    if (error.response.data.errors) {
      const errs: any[] = error.response.data.errors;

      errs.forEach((err) => {
        Alert.alert("Error", err.msg || "Something went wrong");
      });
    }

    Alert.alert("Error", error.response?.data?.msg || "Something went wrong");
  }
};

export const forget_password_confirm = async (data: Record<string, any>) => {
  try {
    const response = await api.post("/auth/forget_password_confirm", data);
    return response.data;
  } catch (error: any) {
    if (error.response.data.errors) {
      const errs: any[] = error.response.data.errors;

      errs.forEach((err) => {
        Alert.alert("Error", err.msg || "Something went wrong");
      });
    }

    Alert.alert("Error", error.response?.data?.msg || "Something went wrong");
  }
};

export const isLogged = async () => {
  try {
    const response = await api.get("/users/is_logged");
    return response.data;
  } catch (error: any) {
    if (error.response.data.errors) {
      const errs: any[] = error.response.data.errors;

      errs.forEach((err) => {
        Alert.alert("Error", err.msg || "Something went wrong");
      });
    }

    Alert.alert("Error", error.response?.data?.msg || "Something went wrong");
  }
};

export const updateUser = async (id: string, data: Record<string, any>) => {
  try {
    const response = await api.put(`/users/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response.data.errors) {
      const errs: any[] = error.response.data.errors;

      errs.forEach((err) => {
        Alert.alert("Error", err.msg || "Something went wrong");
      });
    }

    Alert.alert("Error", error.response?.data?.msg || "Something went wrong");
  }
};
