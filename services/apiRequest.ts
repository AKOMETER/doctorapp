import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

// Base URL from env
const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

const apiRequest = {
  get: async (path: string, options: { query?: Record<string, any> } = {}) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const headers = buildHeaders(token);
      const response = await axios.get(buildUrl(path, options.query), {
        headers,
      });
      return response.data;
    } catch (error: any) {
      handleError(error);
    }
  },

  post: async (path: string, data: Record<string, any>, options: any = {}) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const headers = buildHeaders(token);
      const response = await axios.post(`${backendUrl}${path}`, data, {
        headers,
      });
      return response.data;
    } catch (error: any) {
      handleError(error);
    }
  },

  put: async (path: string, data: Record<string, any>, options: any = {}) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const headers = buildHeaders(token);
      const response = await axios.put(`${backendUrl}${path}`, data, {
        headers,
      });
      return response.data;
    } catch (error: any) {
      handleError(error);
    }
  },

  patch: async (path: string, data: Record<string, any>, options: any = {}) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const headers = buildHeaders(token);
      const response = await axios.patch(`${backendUrl}${path}`, data, {
        headers,
      });
      return response.data;
    } catch (error: any) {
      handleError(error);
    }
  },

  delete: async (path: string, options: any = {}) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const headers = buildHeaders(token);
      const response = await axios.delete(`${backendUrl}${path}`, { headers });
      return response.data;
    } catch (error: any) {
      handleError(error);
    }
  },
};

// Helpers
const buildHeaders = (token: string | null) => ({
  Accept: "application/json",
  "Content-Type": "application/json",
  ...(token && { Authorization: `Bearer ${token}` }),
});

const buildUrl = (path: string, query?: Record<string, any>) => {
  const queryStr = query
    ? "?" +
      Object.entries(query)
        .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
        .join("&")
    : "";
  return `${backendUrl}${path}${queryStr}`;
};

const handleError = (error: any) => {
  if (error?.response?.data?.errors) {
    error.response.data.errors.forEach((err: any) => {
      Alert.alert("Error", err.msg || "Something went wrong");
    });
  } else {
    Alert.alert("Error", error?.response?.data?.msg || "Something went wrong");
  }
};

export default apiRequest;
