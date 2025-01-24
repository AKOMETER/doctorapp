import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useSidebar } from "../context/SidebarContext";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome for icons
import { useRouter } from "expo-router";
const backendUrl = process.env.EXPO_PUBLIC_BACKENDURL;

const Sidebar = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  const { isOpen, toggleSidebar, user } = useSidebar();
  const router = useRouter();

  const name = user ? user.firstName + " " + user.lastName : "Guest";
  const imageUrl = user
    ? backendUrl + "/" + user.profileImage
    : "https://avatar.iran.liara.run/public/boy?username=Ash";
  return (
    <View style={styles.container}>
      {isOpen && (
        <View style={styles.sidebar}>
          {/* Avatar and Greeting */}
          <View style={styles.userContainer}>
            <Image
              source={{
                uri: imageUrl, // Replace with avatar image URL
              }}
              style={styles.avatar}
            />
            <View style={styles.greeting}>
              <Text style={styles.greetingText}>Hello</Text>
              <Text style={styles.guestText}> {name} </Text>
            </View>
          </View>

          {/* Navigation Items with Icons */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => {
              router.push("/");
              toggleSidebar();
            }}
          >
            <FontAwesome name="home" size={20} color="#000000" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => {
              router.push("/pages/dashboard");
              toggleSidebar();
            }}
          >
            <FontAwesome name="tachometer" size={20} color="#000000" />
            <Text style={styles.navText}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => {
              router.push("/pages/appointments");
              toggleSidebar();
            }}
          >
            <FontAwesome name="calendar" size={20} color="#000000" />
            <Text style={styles.navText}>Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <FontAwesome name="stethoscope" size={20} color="#000000" />
            <Text style={styles.navText}>My Doctors</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <FontAwesome name="envelope" size={20} color="#000000" />
            <Text style={styles.navText}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <FontAwesome name="user" size={20} color="#000000" />
            <Text style={styles.navText}>My Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <FontAwesome name="plus-square" size={20} color="#000000" />
            <Text style={styles.navText}>Pharmacy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <FontAwesome name="shopping-cart" size={20} color="#000000" />
            <Text style={styles.navText}>My Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <FontAwesome name="cogs" size={20} color="#000000" />
            <Text style={styles.navText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.login}
            onPress={() => {
              router.push("/auth/login"); // This will navigate to /auth/login
              toggleSidebar();
            }}
          >
            <FontAwesome name="sign-in" size={20} color="#fff" />
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.header}>
          {/* Icon Button */}
          <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
            <FontAwesome name="bars" size={20} color="#fff" />
          </TouchableOpacity>

          {/* Screen Title */}
          <Text style={styles.title}>{title}</Text>
        </View>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: 250,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    height: 130,
    backgroundColor: "#1f5b92",
    padding: 10,
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
    color: "#000000",
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

export default Sidebar;
