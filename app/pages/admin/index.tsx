import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
export default function index() {
  const router = useRouter();
  return (
    <ScrollView>
      <View>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            router.push("/pages/admin/doctor");
          }}
        >
          <FontAwesome name="ambulance" size={20} color="#000000" />
          <Text style={styles.navText}>Doctor Edit </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            router.push("/pages/admin/labs");
          }}
        >
          <FontAwesome name="braille" size={20} color="#000000" />
          <Text style={styles.navText}>Lab Edit </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            router.push("/pages/admin/specification");
          }}
        >
          <FontAwesome name="users" size={20} color="#000000" />
          <Text style={styles.navText}>Specification Edit </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            router.push("/pages/admin/product");
          }}
        >
          <FontAwesome name="product-hunt" size={20} color="#000000" />
          <Text style={styles.navText}>Product Edit </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content_all: {
    backgroundColor: "#fff",
    height: "100%",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#1f5b92",
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 250,
    height: "100%",
    backgroundColor: "#1f5b92",
    paddingTop: 20,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
    marginRight: 10,
    backgroundColor: "#1f5b92",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    height: 130,
    backgroundColor: "#1f5b92",
  },
  avatar: {
    width: 70,
    height: 70,
    marginLeft: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#007bff",
    marginRight: 10,
  },
  greeting: {
    flexDirection: "column",
  },
  greetingText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  guestText: {
    fontSize: 14,
    color: "#fff",
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginVertical: 5,
    marginLeft: 16,
  },
  navText: {
    marginLeft: 10,
    fontSize: 16,
    color: "blue",
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000000",
    padding: 10,
  },
  menuButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#0056b3",
  },
  title: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    marginLeft: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
  login: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: "#da3e82",
    width: 100,
    borderRadius: 50,
    marginTop: 50,
    marginLeft: 16,
  },
  loginText: {
    marginLeft: 10,
    fontSize: 20,
    color: "#fff",
  },
});
