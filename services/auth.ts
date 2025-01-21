import axios from "axios";
import Toast from "react-native-toast-message";

const backendUrl = process.env.EXPO_PUBLIC_BACKENDURL; // Get the BACKENDURL from the .env file

// Axios instance
const api = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    console.log(response);
    return response.data;
  } catch (error) {
    if (error.response.data.errors) {
      const errs = error.response.data.errors;

      errs.map((err) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: err.msg || "Something went wrong. Please try again.",
        });
      });
      return;
    }

    Toast.show({
      type: "error",
      text1: "Error",
      text2:
        error.response?.data?.msg || "Something went wrong. Please try again.",
    });
  }
};

export const register = async (data) => {
  try {
    const response = await api.post("/auth/register",data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.response);
    if (error.response.data.errors) {
      const err = error.response.data.errors;

      errs.foreach((err) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: err.msg || "Something went wrong. Please try again.",
        });
      });
      return;
    }

    Toast.show({
      type: "error",
      text1: "Error",
      text2:
        error.response?.data?.msg || "Something went wrong. Please try again.",
    });
  }
};
