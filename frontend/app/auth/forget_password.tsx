import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { getUser, showToast } from "@/utils/helperFunction";
import apiRequest from "@/services/apiRequest";
import Toast from "react-native-toast-message";

export default function ForgetPasswordScreen() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const handleSubmit = async (title: string) => {
    // Basic validation
    if (!email) {
      showToast("error", "Please fill in both fields.");
      return;
    }

    // Email format validation using regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      showToast("error", "Please enter a valid email address.");
      return;
    }
    const user = await getUser();

    apiRequest
      .post("/auth/send_token", { user_id: user?.id, title })
      .then((res) => {
        if (res?.status == 200) {
          showToast("success", res?.data?.msg);

          setTimeout(() => {
            router.push("/auth/forget_password_confirm");
          }, 1500);
        }
      })
      .catch((err) => {
        console.log("err", err);
        showToast("error", err?.data?.msg);
      });
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
      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => handleSubmit("Forget Password Token")}
      >
        <Text style={styles.resetButtonText}>Send Reset Link</Text>
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
