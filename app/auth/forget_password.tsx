import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { forget_password } from "@/services/auth";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { handleAlert } from "@/utils/helperFunction";
export default function ForgetPasswordScreen() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const handleSubmit = async () => {
    // Basic validation
    if (!email) {
      handleAlert("Error", "Please fill in both fields.");
      return;
    }

    // Email format validation using regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      handleAlert("Error", "Please enter a valid email address.");
      return;
    }

    try {
      await forget_password(email);
      handleAlert("Success", "Check Your Mail For Token");

      setTimeout(() => {
        router.push("/auth/forget_password_confirm");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forget Password</Text>
      <Text style={styles.instruction}>
        Enter your email address below to receive a password reset link.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity style={styles.resetButton} onPress={handleSubmit}>
        <Text style={styles.resetButtonText}>Send Reset Link</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 28,
    color: "blue",
    marginBottom: 20,
    fontWeight: "600",
  },
  instruction: {
    fontSize: 16,
    color: "grey",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "90%",
    padding: 12,
    marginVertical: 10,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  resetButton: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 20,
  },
  resetButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
