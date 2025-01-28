import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Modal, StyleSheet } from "react-native";

export default function Settings() {
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [isEmailModalVisible, setEmailModalVisible] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    // Set header title dynamically
    navigation.setOptions({
      title: "Settings", // New title
      headerStyle: { backgroundColor: "#00b4d8" },
      headerTintColor: "#fff",
    });
  }, [navigation]);

  const handlePasswordUpdate = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Call the update user URL here
    alert("Password updated successfully!");
    setPasswordModalVisible(false);
  };

  const handleEmailUpdate = () => {
    if (!email) {
      alert("Please enter a valid email!");
      return;
    }
    // Call the update user URL here
    alert("Email updated successfully!");
    setEmailModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Change Password */}
      <Button
        title="Change Password"
        onPress={() => setPasswordModalVisible(true)}
      />
      <Modal
        visible={isPasswordModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <View style={styles.buttonContainer}>
              <Button title="Update Password" onPress={handlePasswordUpdate} />
              <Button
                title="Cancel"
                onPress={() => setPasswordModalVisible(false)}
                color="red"
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Change Email */}
      <Button title="Change Email" onPress={() => setEmailModalVisible(true)} />
      <Modal
        visible={isEmailModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Email</Text>
            <TextInput
              style={styles.input}
              placeholder="New Email"
              value={email}
              onChangeText={setEmail}
            />
            <View style={styles.buttonContainer}>
              <Button title="Update Email" onPress={handleEmailUpdate} />
              <Button
                title="Cancel"
                onPress={() => setEmailModalVisible(false)}
                color="red"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    margin: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
