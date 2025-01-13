import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import HeadBanner from "@/components/HeadBanner";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { parcels_data } from "@/utils/constants";
import { router } from "expo-router";

const Home = () => {
  const [authDropdownVisible, setAuthDropdownVisible] = useState(false);

  const toggleAuthDropdown = () => {
    setAuthDropdownVisible(!authDropdownVisible);
  };

  const navigateTo = (path: string) => {
    router.push(path);
    setAuthDropdownVisible(false);
  };

  return (
    <ScrollView scrollEventThrottle={16} bounces={false}>
      <HeadBanner />
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 16,
  },
  authDropdown: {
    position: "absolute",
    top: 50,
    right: 16,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 10,
  },
  authOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  authText: {
    fontSize: 16,
    fontWeight: "500",
  },
  quickAccessRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  quickAccessCard: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardIconContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  cardContent: {
    marginLeft: 12,
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "500",
  },
  subText: {
    fontSize: 14,
    color: "#757575",
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
});

export default Home;
