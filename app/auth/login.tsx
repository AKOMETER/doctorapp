import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message"; // Toast for notifications
import { login } from "@/services/auth";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Handle form input changes (email, password)
  const handleFormChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    const { email, password } = formData;

    // Basic validation
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in both fields.",
      });
      return;
    }

    try {
      const data = await login(email, password);
      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: "You are now logged in!",
      });

  // Save token and user data to AsyncStorage
             await AsyncStorage.setItem("token", data.response.token);
             await AsyncStorage.setItem("user", JSON.stringify(data.response.user));


       setTimeout(() => {
              router.push("/pages/dashboard");
            }, 2000);


    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.response.data.msg,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton}>
        <Icon name="close" size={20} color="#000" />
      </TouchableOpacity>

      {/* Illustration */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/2913/2913608.png",
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Login Text */}
      <Text style={styles.title}>LOGIN Book Doctor Appointment</Text>

      {/* Form */}
      <View style={styles.inputContainer}>
        {/* Email Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => handleFormChange("email", text)}
          />
          <Icon
            name="envelope"
            size={20}
            color="#000"
            style={styles.inputIcon}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={formData.password}
            onChangeText={(text) => handleFormChange("password", text)}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon
              name={showPassword ? "eye-slash" : "eye"}
              size={20}
              color="#000"
              style={styles.inputIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity
        onPress={() => {
          router.push("/auth/forget_password"); // This will navigate to /auth/login
        }}
      >
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
        <Text style={styles.loginButtonText}>Login Now</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <Text style={styles.signUpText}>
        Don't have a Login?{" "}
        <Text
          style={styles.signUpLink}
          onPress={() => {
            router.push("/auth/register"); // This will navigate to /auth/login
          }}
        >
          Signup Now!
        </Text>
      </Text>

      {/* Toast Container */}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: "flex-start",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  inputIcon: {
    marginLeft: 10,
  },
  forgotPassword: {
    textAlign: "right",
    marginBottom: 20,
    fontSize: 14,
    color: "#888",
  },
  loginButton: {
    backgroundColor: "#0056B3",
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpText: {
    textAlign: "center",
    fontSize: 14,
    color: "#888",
  },
  signUpLink: {
    color: "#0056B3",
    fontWeight: "bold",
  },
});

export default LoginScreen;
