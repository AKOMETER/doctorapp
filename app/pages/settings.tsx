import Sidebar from "@/components/sidebar";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";

export default function Settings() {
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [isEmailModalVisible, setEmailModalVisible] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "Settings",
      headerStyle: { backgroundColor: "#00b4d8" },
      headerTintColor: "#fff",
    });
  }, [navigation]);

  const handlePasswordUpdate = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
    setPasswordModalVisible(false);
  };

  const handleEmailUpdate = () => {
    if (!email) {
      alert("Please enter a valid email!");
      return;
    }
    alert("Email updated successfully!");
    setEmailModalVisible(false);
  };

  return (
    // <Sidebar title="Settings">
    <View className="flex-1 p-5 bg-gray-100">
      {/* Change Password */}
      <TouchableOpacity
        className="bg-blue-500 py-3 px-5 rounded-lg mb-4"
        onPress={() => setPasswordModalVisible(true)}
      >
        <Text className="text-white text-center font-semibold">
          Change Password
        </Text>
      </TouchableOpacity>

      <Modal visible={isPasswordModalVisible} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-4/5 p-6 bg-white rounded-lg">
            <Text className="text-lg font-bold mb-3">Change Password</Text>
            <TextInput
              className="border border-gray-300 p-3 rounded mb-3"
              placeholder="New Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              className="border border-gray-300 p-3 rounded mb-3"
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                className="bg-green-500 px-4 py-2 rounded"
                onPress={handlePasswordUpdate}
              >
                <Text className="text-white font-semibold">Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-red-500 px-4 py-2 rounded"
                onPress={() => setPasswordModalVisible(false)}
              >
                <Text className="text-white font-semibold">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Change Email */}
      <TouchableOpacity
        className="bg-blue-500 py-3 px-5 rounded-lg"
        onPress={() => setEmailModalVisible(true)}
      >
        <Text className="text-white text-center font-semibold">
          Change Email
        </Text>
      </TouchableOpacity>

      <Modal visible={isEmailModalVisible} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-4/5 p-6 bg-white rounded-lg">
            <Text className="text-lg font-bold mb-3">Change Email</Text>
            <TextInput
              className="border border-gray-300 p-3 rounded mb-3"
              placeholder="New Email"
              value={email}
              onChangeText={setEmail}
            />
            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                className="bg-green-500 px-4 py-2 rounded"
                onPress={handleEmailUpdate}
              >
                <Text className="text-white font-semibold">Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-red-500 px-4 py-2 rounded"
                onPress={() => setEmailModalVisible(false)}
              >
                <Text className="text-white font-semibold">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
    // </Sidebar>
  );
}
