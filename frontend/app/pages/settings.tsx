import apiRequest from "@/services/apiRequest";
import { forget_password, forget_password_confirm } from "@/services/auth";
import { getUser, showToast } from "@/utils/helperFunction";
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
import Toast from "react-native-toast-message";
export default function Settings() {
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [isEmailModalVisible, setEmailModalVisible] = useState(false);

  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const [isTokenSendDisabled, setIsTokenSendDisabled] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      title: "Settings",
      headerStyle: { backgroundColor: "#00b4d8" },
      headerTintColor: "#fff",
    });
  }, [navigation]);

  const handleSendToken = async (title: string) => {
    if (password !== confirmPassword) {
      showToast("error", "Passwords do not match!");
      return;
    }
    if (isTokenSendDisabled) {
      showToast(
        "error",
        "Please Hold, check your Mail or Trash, you can resend in 3 mins"
      );
      return;
    }

    const user = await getUser();

    setTimeout(() => {
      setIsTokenSendDisabled(false);
    }, 5000);
    apiRequest
      .post("/auth/send_token", { user_id: user?.id, title })
      .then((res) => {
        if (res?.status == 200) {
          showToast("success", res?.data?.msg);
          setIsTokenSendDisabled(true);
        }
      })
      .catch((err) => {
        console.log("err", err);
        showToast("error", err?.data?.msg);
      });
    setPasswordModalVisible(false);
  };

  const handlePasswordSubmit = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const user = await getUser();
    const newData = {
      confirm_password: confirmPassword,
      password,
      reset_token: token,
      user_id: user?.id,
    };
    forget_password_confirm(newData)
      .then((res) => {
        if (res?.status == 200) {
          showToast("success", res.data.msg || "Reset Was Successful");
          setPasswordModalVisible(false);
          setToken("");
          setPassword("");
          setConfirmPassword("");
          return;
        }
        showToast("error", res?.data.msg);
      })
      .catch(() => {
        showToast("error", "Password updated Failed!");
      });
  };

  async function handleEmailSubmit() {
    if (!email) {
      showToast("error", "Please enter a valid email!");
      return;
    }
    const user = await getUser();
    apiRequest
      .post("/auth/reset_email_confirm", {
        email: email,
        reset_token: token,
        id: user?.id,
      })
      .then((res) => {
        if (res?.status == 200) {
          showToast("success", "Email updated successfully!");
          setEmailModalVisible(false);
        }
        console.log("res email", res);
      })
      .catch((err) => {
        showToast("error", "Email updated failed!");
      });
  }

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
              placeholder="Token"
              value={token}
              onChangeText={setToken}
            />

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
                className="bg-red-500 px-4 py-2 rounded"
                onPress={() => setPasswordModalVisible(false)}
              >
                <Text className="text-white font-semibold">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-green-500 px-4 py-2 rounded"
                onPress={() => {
                  handleSendToken("Password Reset Token");
                }}
                disabled={isTokenSendDisabled}
              >
                <Text className="text-white font-semibold">Send Token</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-blue-500 px-4 py-2 rounded"
                onPress={() => handlePasswordSubmit()}
              >
                <Text className="text-white font-semibold">Submit</Text>
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
              placeholder="Token"
              value={token}
              onChangeText={setToken}
            />

            <TextInput
              className="border border-gray-300 p-3 rounded mb-3"
              placeholder="New Email"
              value={email}
              onChangeText={setEmail}
            />
            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                className="bg-red-500 px-4 py-2 rounded"
                onPress={() => setEmailModalVisible(false)}
              >
                <Text className="text-white font-semibold">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-green-500 px-4 py-2 rounded"
                onPress={() => {
                  handleSendToken("Email Reset Token");
                }}
              >
                <Text className="text-white font-semibold">Send Token</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-blue-500 px-4 py-2 rounded"
                onPress={() => handleEmailSubmit()}
              >
                <Text className="text-white font-semibold">Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Toast />
    </View>
    // </Sidebar>
  );
}
