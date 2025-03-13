import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useSidebar } from "@/context/SidebarContext";
import apiRequest from "@/services/apiRequest";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function Payment() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethodId, setSelectedMethodId] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const { user } = useSidebar();
  const fetchPaymentMethods = async () => {
    try {
      apiRequest.get("/payment-method").then((res) => {
        setPaymentMethods(res);
      });
    } catch (error) {
      console.error("Failed to load methods", error);
    }
  };

  const handleTransaction = async () => {
    if (!selectedMethodId || !amount) return alert("Select method & amount");

    const payload = {
      userId: user?.id, // Replace with actual user ID
      paymentMethodId: selectedMethodId,
      amount: parseFloat(amount),
      currency,
      reference: "TXN" + Date.now(), // simple unique reference
    };

    console.log("payload", payload);
    try {
      apiRequest.post("/transaction", payload);
      setSelectedMethodId(null);
      setAmount("");
    } catch (err) {
      console.error("Transaction error:", err);
      alert("Transaction failed");
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);
  const router = useRouter();
  return (
    <ScrollView style={{ padding: 16 }}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 10,
          paddingHorizontal: 8,
          marginVertical: 5,
          marginLeft: 16,
        }}
        onPress={() => {
          router.push("/pages/transaction");
        }}
      >
        <FontAwesome name="line-chart" size={20} color="#000000" />
        <Text style={{ marginLeft: 10, fontSize: 16, color: "#000000" }}>
          Transaction List
        </Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Select Payment Method
      </Text>

      {paymentMethods.map((method: any) => (
        <TouchableOpacity
          key={method.id}
          onPress={() => setSelectedMethodId(method.id)}
          style={{
            padding: 10,
            backgroundColor:
              selectedMethodId === method.id ? "#d0f0ff" : "#eee",
            marginVertical: 6,
            borderRadius: 6,
          }}
        >
          <Text>
            {method.name} ({method.type})
          </Text>
        </TouchableOpacity>
      ))}

      <TextInput
        placeholder="Enter Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
      />

      <TextInput
        placeholder="Currency (optional)"
        value={currency}
        onChangeText={setCurrency}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />

      <Button title="Make Payment" onPress={handleTransaction} />
    </ScrollView>
  );
}
