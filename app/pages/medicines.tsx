import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

const Medicines = () => {
  const medicines = [
    {
      id: 1,
      name: "Amoxicillin",
      usage: "Antibiotic - Treats infections",
      stock: "Available",
    },
    {
      id: 2,
      name: "Paracetamol",
      usage: "Pain relief and fever reduction",
      stock: "Low Stock",
    },
    {
      id: 3,
      name: "Ibuprofen",
      usage: "Anti-inflammatory",
      stock: "Out of Stock",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Medicines</Text>
      {medicines.map((medicine) => (
        <View key={medicine.id} style={styles.card}>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/5523/5523306.png" }}
            style={styles.avatar}
          />
          <View style={styles.cardContent}>
            <Text style={styles.medicineName}>{medicine.name}</Text>
            <Text style={styles.subText}>{medicine.usage}</Text>
            <Text
              style={[
                styles.stockStatus,
                medicine.stock === "Available"
                  ? styles.available
                  : medicine.stock === "Low Stock"
                  ? styles.lowStock
                  : styles.outOfStock,
              ]}
            >
              {medicine.stock}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  subText: {
    fontSize: 14,
    color: "#666",
  },
  stockStatus: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  available: {
    color: "green",
  },
  lowStock: {
    color: "orange",
  },
  outOfStock: {
    color: "red",
  },
});

export default Medicines;
