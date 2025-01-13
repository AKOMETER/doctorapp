import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import RadioGroup from "react-native-radio-buttons-group";

export default function RegisterScreen() {
  const [selectedRole, setSelectedRole] = useState("Doctor");

  const roles = [
    { id: "1", label: "Health Care Proffessional", value: "Health Care Proffessional" },
    { id: "2", label: "Patient", value: "Patient" },
    { id: "3", label: "Admin", value: "Admin" },
  ];

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.radioGroup}>
        {roles.map((role) => (
          <TouchableOpacity
            key={role.id}
            style={[
              styles.radioOption,
              selectedRole === role.value && styles.radioOptionSelected,
            ]}
            onPress={() => handleRoleChange(role.value)}
          >
            <Text style={styles.radioText}>{role.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput style={styles.input} placeholder="First Name" />
      <TextInput style={styles.input} placeholder="Last Name" />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
      <View style={styles.row}>
        <TextInput style={[styles.input, styles.codeInput]} placeholder="Code" />
        <TextInput
          style={[styles.input, styles.mobileInput]}
          placeholder="Mobile no"
          keyboardType="phone-pad"
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  radioGroup: {
    flexDirection: "row",
    marginBottom: 20,
  },
  radioOption: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    backgroundColor: "#f9f9f9",
  },
  radioOptionSelected: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  radioText: {
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  codeInput: {
    flex: 1,
    marginRight: 10,
  },
  mobileInput: {
    flex: 2,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007BFF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
