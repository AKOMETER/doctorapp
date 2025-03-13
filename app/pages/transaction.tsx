import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import apiRequest from "@/services/apiRequest";
import { useSidebar } from "@/context/SidebarContext";

const { width } = Dimensions.get("window");

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
      setTransactions(res);
    } catch (err: any) {
      console.error("Failed to fetch transactions", err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.amount}</Text>
      <Text style={styles.cell}>{item.currency}</Text>
      <Text style={[styles.cell, getStatusStyle(item.status)]}>
        {item.status.toUpperCase()}
      </Text>
    </View>
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "completed":
        return { color: "green", fontWeight: "bold" };
      case "pending":
        return { color: "orange", fontWeight: "bold" };
      case "failed":
        return { color: "red", fontWeight: "bold" };
      default:
        return {};
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Transaction History</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <ScrollView horizontal>
          <View style={styles.table}>
            <View style={styles.headerRow}>
              <Text style={styles.headerCell}>ID</Text>
              <Text style={styles.headerCell}>Amount</Text>
              <Text style={styles.headerCell}>Currency</Text>
              <Text style={styles.headerCell}>Status</Text>
            </View>
            <FlatList
              data={transactions}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={
                <Text style={styles.noData}>No transactions found</Text>
              }
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 20,
    marginBottom: 10,
    color: "#333",
  },
  table: {
    minWidth: width,
    paddingHorizontal: 10,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    paddingVertical: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    color: "#333",
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    color: "#444",
  },
  noData: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#777",
  },
});
