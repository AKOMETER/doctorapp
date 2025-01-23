import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Homepage from "./pages/homePage";
import Menu from "@/components/menu";
import SideBar from "@/components/sidebar";

const Home = () => {
  const [authDropdownVisible, setAuthDropdownVisible] = useState(false);

  const toggleAuthDropdown = () => {
    setAuthDropdownVisible(!authDropdownVisible);
  };

  return (
    <View style={styles.container}>
      <ScrollView scrollEventThrottle={16} bounces={false}>
        <SideBar style="auto">
          <Homepage />
        </SideBar>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  content: {
    padding: 16,
    fontSize: 16,
    color: "#333",
  },
});

export default Home;
