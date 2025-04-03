import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import apiRequest from "@/services/apiRequest";
import { useSidebar } from "@/context/SidebarContext";

export default function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSidebar();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await apiRequest.get(
        `/transaction/get_by_user_id/${user?.id}`
      );
      if (res) setTransactions(res?.data);
    } catch (err: any) {
      console.error("Failed to fetch transactions", err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 font-bold";
      case "pending":
        return "text-yellow-600 font-bold";
      case "failed":
        return "text-red-600 font-bold";
      default:
        return "text-gray-500";
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View className="flex-row bg-white py-3 border-b border-gray-200">
      <Text className="flex-1 text-center text-sm text-gray-800">
        {item.id}
      </Text>
      <Text className="flex-1 text-center text-sm text-gray-800">
        {item.amount}
      </Text>
      <Text className="flex-1 text-center text-sm text-gray-800">
        {item.currency}
      </Text>
      <Text
        className={`flex-1 text-center text-sm ${getStatusStyle(item.status)}`}
      >
        {item.status.toUpperCase()}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100 pt-5">
      <Text className="text-xl font-bold text-gray-800 px-5 mb-3">
        Transaction History
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <ScrollView horizontal>
          <View className="min-w-full px-2">
            <View className="flex-row bg-gray-200 py-3 rounded-t-lg">
              <Text className="flex-1 text-center font-bold text-sm text-gray-700">
                ID
              </Text>
              <Text className="flex-1 text-center font-bold text-sm text-gray-700">
                Amount
              </Text>
              <Text className="flex-1 text-center font-bold text-sm text-gray-700">
                Currency
              </Text>
              <Text className="flex-1 text-center font-bold text-sm text-gray-700">
                Status
              </Text>
            </View>

            <FlatList
              data={transactions}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={
                <Text className="text-center mt-5 text-gray-500">
                  No transactions found
                </Text>
              }
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
