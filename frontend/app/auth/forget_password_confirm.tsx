import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { forget_password_confirm } from "@/services/auth";
import { useRouter } from "expo-router";
import { showToast } from "@/utils/helperFunction";
import Toast from "react-native-toast-message";
export default function ForgetPasswordScreen() {
  const [formData, setFormData] = useState({
    reset_token: "",
    password: "",
    confirm_password: "",
  });
  const router = useRouter();
  const handleSubmit = async () => {
    // Basic validation
    if (
      formData.password != formData.confirm_password ||
      formData.password == ""
    ) {
      showToast("error", "Please fill in both fields.");
      return;
    }

    try {
      await forget_password_confirm(formData);
      showToast("success", "Password Reset Successfully");

      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.instruction}>
        Enter your email address below to receive a password reset link.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Token"
        keyboardType={undefined}
        value={formData.reset_token}
        onChangeText={(text) => setFormData({ ...formData, reset_token: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        keyboardType={undefined}
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        keyboardType={undefined}
        value={formData.confirm_password}
        onChangeText={(text) =>
          setFormData({ ...formData, confirm_password: text })
        }
      />
      <TouchableOpacity style={styles.resetButton} onPress={handleSubmit}>
        <Text style={styles.resetButtonText}>Confirm</Text>
      </TouchableOpacity>
      <Toast />
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
