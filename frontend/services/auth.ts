import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "@/utils/helperFunction";

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL; // Get the BACKENDURL from the .env file

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
  console.log("email and password", email, password);
  try {
    const response = await api.post("/auth/login", { email, password });

    return response?.data;
  } catch (error: any) {
    if (error.response.data.errors) {
      const errs: any[] = error.response.data.errors;

      errs.forEach((err) => {
        showToast("error", err.msg || "Something went wrong");
      });
    }

    showToast("error", error.response?.data?.msg || "Something went wrong");
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
        showToast("error", err.msg || "Something went wrong");
      });
    }

    showToast("error", error.response?.data?.msg || "Something went wrong");
  }
};

export const forget_password = async (data: Record<string, any>) => {
  try {
    const response = await api.post("/auth/forget_password", data);
    return response;
  } catch (error: any) {
    if (error.response.data.errors) {
      const errs: any[] = error.response.data.errors;

      errs.forEach((err) => {
        showToast("error", err.msg || "Something went wrong");
      });
    }

    showToast("error", error.response?.data?.msg || "Something went wrong");
  }
};

export const forget_password_confirm = async (data: Record<string, any>) => {
  try {
    const response = await api.post("/auth/forget_password_confirm", data);
    return response;
  } catch (error: any) {
    if (error.response.data.errors) {
      const errs: any[] = error.response.data.errors;

      errs.forEach((err) => {
        showToast("error", err.msg || "Something went wrong");
      });
    }

    showToast("error", error.response?.data?.msg || "Something went wrong");
  }
};

export const isLogged = async () => {
  try {
    const response = await api.get("/users/is_logged");
    console.log("response", response);
    return response.data;
  } catch (error: any) {
    if (error.response.data.errors) {
      const errs: any[] = error.response.data.errors;

      errs.forEach((err) => {
        showToast("error", err.msg || "Something went wrong");
      });
    }

    showToast("error", error.response?.data?.msg || "Something went wrong");
  }
};

export const updateUser = async (id: string, data: Record<string, any>) => {
  try {
    const response = await api.put(`/user/${id}`, data);
    return response;
  } catch (error: any) {
    if (error.response.data.errors) {
      const errs: any[] = error.response.data.errors;

      errs.forEach((err) => {
        showToast("error", err.msg || "Something went wrong");
      });
    }
    console.log("data", error);
    showToast("error", error.response?.data?.msg || "Something went wrong");
  }
};
