import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doctors } from "@/utils/data"; // Importing doctors data
import { useNavigation } from "expo-router";

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
  // Load messages from AsyncStorage on mount
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
    // Set header title dynamically
    navigation.setOptions({
      title: "Message", // New title
      headerStyle: { backgroundColor: "#00b4d8" },
      headerTintColor: "#fff",
    });
  }, [navigation]);

  // Save messages to AsyncStorage whenever they change
  useEffect(() => {
    const saveMessages = async () => {
      await AsyncStorage.setItem("chatMessages", JSON.stringify(messages));
    };
    saveMessages();
  }, [messages]);

  // Handle sending a message
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

    // Simulate doctor's reply
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

  // Render a single chat message
  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.message,
        item.sender === "user" ? styles.userMessage : styles.doctorMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  // Render doctor selection
  const renderDoctor = ({ item }: { item: Doctor }) => (
    <TouchableOpacity
      style={[
        styles.doctorItem,
        selectedDoctor?.id === item.id && styles.selectedDoctor,
      ]}
      onPress={() => setSelectedDoctor(item)}
    >
      <Text style={styles.doctorName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Doctor Selection */}
      {!selectedDoctor && (
        <FlatList
          data={doctors}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderDoctor}
          contentContainerStyle={styles.doctorList}
        />
      )}

      {/* Chat Interface */}
      {selectedDoctor && (
        <View style={styles.chatContainer}>
          <Text style={styles.chatHeader}>Chat with {selectedDoctor.name}</Text>
          <FlatList
            data={messages[selectedDoctor.id.toString()] || []}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={styles.messagesList}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type your message..."
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendMessage}
            >
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedDoctor(null)}
          >
            <Text style={styles.backButtonText}>Back to Doctors</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  doctorList: {
    paddingBottom: 20,
  },
  doctorItem: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  selectedDoctor: {
    backgroundColor: "#d1e7ff",
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  chatContainer: {
    flex: 1,
  },
  chatHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  messagesList: {
    flexGrow: 1,
    marginBottom: 16,
  },
  message: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  userMessage: {
    backgroundColor: "#d1e7ff",
    alignSelf: "flex-end",
  },
  doctorMessage: {
    backgroundColor: "#e9ecef",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 14,
    color: "#333",
  },
  timestamp: {
    fontSize: 10,
    color: "#666",
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
  sendButton: {
    padding: 12,
    backgroundColor: "#007bff",
    borderRadius: 8,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#6c757d",
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
