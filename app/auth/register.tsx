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
import { register } from "@/services/auth";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleAlert } from "@/utils/helperFunction";
const RegisterScreen = () => {
  const [selectedRole, setSelectedRole] = useState("Patient");
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    code: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    const { first_name, last_name, email, password, confirmPassword } =
      formData;

    // Check if passwords match
    if (password !== confirmPassword || password.trim() === "") {
      handleAlert("Error", "Passwords Do Not Match");
      return;
    }

    // Basic validation for required fields
    if (!first_name || first_name.trim() === "") {
      handleAlert("Error", "First Name is required.");
      return;
    }

    if (!last_name || last_name.trim() === "") {
      handleAlert("Error", "Last Name is required.");
      return;
    }

    if (!email || email.trim() === "") {
      handleAlert("Error", "Email is required.");
      return;
    }

    // Email format validation using regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      handleAlert("Error", "Please enter a valid email address.");
      return;
    }

    const newData = {
      role: selectedRole,
      firstName: formData.first_name,
      lastName: formData.last_name,
      email: formData.email,
      code: formData.code,
      mobile: formData.mobile,
      password: formData.password,
    };

    try {
      const data = await register(newData);
      if (!data) {
        return;
      }
      handleAlert("Success", "Registration Successful");
      console.log(data);
      //clear form data
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobile: "",
        code: "",
      });

      // Save token and user data to AsyncStorage
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      //redirect to dashboard
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (error: any) {
      console.log(error);
      handleAlert("Error", "Registration Failed" || error?.response?.data.msg);
    }
  };

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.back()}
      >
        <Icon name="close" size={20} color="#000" />
      </TouchableOpacity>

      {/* Illustration */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/8189/8189797.png",
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Register Text */}
      <Text style={styles.title}>Register</Text>

      {/* Role Selection */}
      <View style={styles.roleContainer}>
        {["Doctor", "Patient", "Labs"].map((role) => (
          <TouchableOpacity
            key={role}
            style={[
              styles.roleButton,
              selectedRole === role && styles.roleButtonSelected,
            ]}
            onPress={() => setSelectedRole(role)}
          >
            <Text
              style={[
                styles.roleText,
                selectedRole === role && styles.roleTextSelected,
              ]}
            >
              {role}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={formData.first_name}
            onChangeText={(value) => handleChange("first_name", value)}
          />
          <Icon name="user" size={20} color="#000" style={styles.inputIcon} />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={formData.last_name}
            onChangeText={(value) => handleChange("last_name", value)}
          />
          <Icon name="user" size={20} color="#000" style={styles.inputIcon} />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(value) => handleChange("email", value)}
          />
          <Icon
            name="envelope"
            size={20}
            color="#000"
            style={styles.inputIcon}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Code"
            value={formData.code}
            onChangeText={(value) => handleChange("code", value)}
          />
          <Icon name="phone" size={20} color="#000" style={styles.inputIcon} />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Mobile no"
            value={formData.mobile}
            onChangeText={(value) => handleChange("mobile", value)}
          />
          <Icon name="mobile" size={20} color="#000" style={styles.inputIcon} />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={formData.password}
            onChangeText={(value) => handleChange("password", value)}
          />
          <Icon name="lock" size={20} color="#000" style={styles.inputIcon} />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={formData.confirmPassword}
            onChangeText={(value) => handleChange("confirmPassword", value)}
          />
          <Icon name="lock" size={20} color="#000" style={styles.inputIcon} />
        </View>
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text
          style={styles.loginLink}
          onPress={() => router.push("/auth/login")}
        >
          Login Now!
        </Text>
      </Text>
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
  roleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  roleButton: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  roleButtonSelected: {
    borderColor: "#0056B3",
    backgroundColor: "#EAF3FF",
  },
  roleText: {
    fontSize: 14,
    color: "#888",
  },
  roleTextSelected: {
    color: "#0056B3",
  },
  formContainer: {
    marginBottom: 20,
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
  registerButton: {
    backgroundColor: "#0056B3",
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  registerButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    textAlign: "center",
    fontSize: 14,
    color: "#888",
  },
  loginLink: {
    color: "#0056B3",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;
