import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Homepage from "./pages/homePage";
import SideBar from "@/components/sidebar";
import Toast from "react-native-toast-message";

const Home = () => {
  return (
    <View style={styles.container}>
      <Toast />
      <ScrollView scrollEventThrottle={16} bounces={false}>
        <SideBar title="Home">
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
