import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "expo-router";
import apiRequest from "@/services/apiRequest";
import { MessageType, UserType } from "@/utils/dataTypes";
import { FontAwesome } from "@expo/vector-icons";
import { useSidebar } from "@/context/SidebarContext";
import Toast from "react-native-toast-message";

export default function ChatApp() {
  const { user } = useSidebar();
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    apiRequest.get("/user").then((res) => {
      const filtered = (res?.data || [])
        .filter((item: UserType) => !(item.role === "Admin"))
        .filter((item: UserType) => !(item.id === user?.id));
      setUsers(filtered);
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: "Message",
      headerStyle: { backgroundColor: "#00b4d8" },
      headerTintColor: "#fff",
    });
  }, [navigation]);

  const handleSendMessage = (selectedUser: UserType) => {
    if (!message.trim() || !selectedUser) return;

    const tempId = Date.now().toString(); // temporary ID for display
    const newMessage: MessageType = {
      id: tempId,
      senderId: user?.id,
      receiverId: selectedUser?.id || "",
      content: message,
      isRead: false,
      failed: false, // custom flag for UI
    };

    // Show message instantly
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    apiRequest
      .post("/message", newMessage)
      .then((res) => {
        // Optionally replace temporary message with response if needed
      })
      .catch(() => {
        // Mark last message as failed
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempId ? { ...msg, failed: true } : msg
          )
        );
      });
  };

  function handleSelectUser(item: UserType) {
    setSelectedUser(item);
    apiRequest.get(`/message/${user?.id}/${item.id}`).then((res) => {
      setMessages(res?.data || []);
    });
  }

  const renderMessage = ({
    item,
  }: {
    item: MessageType & { failed?: boolean };
  }) => (
    <View
      className={`p-3 rounded-lg mb-2 ${
        item.senderId != user?.id
          ? item.failed
            ? "bg-red-300 self-end"
            : "bg-blue-200 self-end"
          : "bg-gray-300 self-start"
      }`}
    >
      <Text className="text-gray-800">{item.content}</Text>
      <Text className="text-xs text-gray-500 mt-1">
        {new Date(item?.createdAt ?? "").toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </View>
  );

  const renderUsers = ({ item }: { item: UserType }) => (
    <TouchableOpacity
      className={`p-4 mb-2 rounded-lg shadow-md ${
        selectedUser?.id === item.id ? "bg-blue-300" : "bg-white"
      }`}
      onPress={() => handleSelectUser(item)}
    >
      <View className="flex-row items-center space-x-2 gap-3">
        <FontAwesome
          name={user?.role === "Doctor" ? "user-md" : "user"}
          size={28}
          color="#4CAF50"
        />
        <Text className="text-lg font-bold text-gray-800">
          {item.firstName} {item.lastName}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {!selectedUser ? (
        <FlatList
          data={users}
          keyExtractor={(item, index) =>
            item?.id?.toString() ?? index.toString()
          }
          renderItem={renderUsers}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Chat with {selectedUser.firstName} {selectedUser.lastName}
          </Text>

          <FlatList
            data={messages}
            keyExtractor={(item, index) =>
              item?.id?.toString() ?? index.toString()
            }
            renderItem={renderMessage}
            contentContainerStyle={{ flexGrow: 1, marginBottom: 16 }}
          />

          <View className="flex-row items-center bg-white p-3 rounded-lg shadow-md">
            <TextInput
              className="flex-1 text-lg p-3 text-gray-800"
              placeholder="Type your message..."
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity
              className=" px-4 py-2 rounded-lg"
              style={{ backgroundColor: "#1f5b92" }}
              onPress={() => handleSendMessage(selectedUser)}
            >
              <Text className="text-white font-bold">Send</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{ backgroundColor: "#1f5b92" }}
            className="mt-4 bg-gray-600 p-3 rounded-lg items-center"
            onPress={() => setSelectedUser(null)}
          >
            <Text className="text-white font-bold">Back to List</Text>
          </TouchableOpacity>
          <Toast />
        </View>
      )}
    </View>
  );
}
