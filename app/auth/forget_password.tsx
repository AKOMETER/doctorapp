import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function ForgetPasswordScreen() {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    if (email.trim() === "") {
      Alert.alert("Error", "Please enter your email address.");
    } else {
      Alert.alert("Reset Link Sent", `A reset link has been sent to ${email}.`);
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
      <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
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
