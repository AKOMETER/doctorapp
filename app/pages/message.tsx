import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doctors } from "@/utils/data";
import { useNavigation } from "expo-router";
import Sidebar from "@/components/sidebar";

interface Message {
  id: string;
  sender: "user" | "doctor";
  text: string;
  timestamp: string;
}

interface Doctor {
  id: number;
  name: string;
  image: string;
}

export default function ChatApp() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});
  const navigation = useNavigation();

  useEffect(() => {
    const loadMessages = async () => {
      const storedMessages = await AsyncStorage.getItem("chatMessages");
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    };
    loadMessages();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: "Message",
      headerStyle: { backgroundColor: "#00b4d8" },
      headerTintColor: "#fff",
    });
  }, [navigation]);

  useEffect(() => {
    const saveMessages = async () => {
      await AsyncStorage.setItem("chatMessages", JSON.stringify(messages));
    };
    saveMessages();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedDoctor) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: message,
      timestamp: new Date().toLocaleString(),
    };

    const doctorId = selectedDoctor.id.toString();
    setMessages((prevMessages) => ({
      ...prevMessages,
      [doctorId]: [...(prevMessages[doctorId] || []), newMessage],
    }));

    setMessage("");

    setTimeout(() => {
      const replyMessage: Message = {
        id: Date.now().toString(),
        sender: "doctor",
        text: `Hello, this is ${selectedDoctor.name}. How can I help you?`,
        timestamp: new Date().toLocaleString(),
      };
      setMessages((prevMessages) => ({
        ...prevMessages,
        [doctorId]: [...(prevMessages[doctorId] || []), replyMessage],
      }));
    }, 1000);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      className={`p-3 rounded-lg mb-2 ${
        item.sender === "user"
          ? "bg-blue-200 self-end"
          : "bg-gray-300 self-start"
      }`}
    >
      <Text className="text-gray-800">{item.text}</Text>
      <Text className="text-xs text-gray-500 mt-1">{item.timestamp}</Text>
    </View>
  );

  const renderDoctor = ({ item }: { item: Doctor }) => (
    <TouchableOpacity
      className={`p-4 mb-2 rounded-lg shadow-md ${
        selectedDoctor?.id === item.id ? "bg-blue-300" : "bg-white"
      }`}
      onPress={() => setSelectedDoctor(item)}
    >
      <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    // <Sidebar title="Message">
    <View className="flex-1 bg-gray-100 p-4">
      {!selectedDoctor && (
        <FlatList
          data={doctors}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderDoctor}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      {selectedDoctor && (
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Chat with {selectedDoctor.name}
          </Text>
          <FlatList
            data={messages[selectedDoctor.id.toString()] || []}
            keyExtractor={(item) => item.id}
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
              className="bg-blue-500 px-4 py-2 rounded-lg"
              onPress={handleSendMessage}
            >
              <Text className="text-white font-bold">Send</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="mt-4 bg-gray-600 p-3 rounded-lg items-center"
            onPress={() => setSelectedDoctor(null)}
          >
            <Text className="text-white font-bold">Back to Doctors</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
    // </Sidebar>
  );
}
