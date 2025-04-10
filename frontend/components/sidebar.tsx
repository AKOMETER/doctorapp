import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useSidebar } from "../context/SidebarContext";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome for icons
import { useRouter } from "expo-router";
import apiRequest from "@/services/apiRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItemType, IsUserLoggedInType, UserType } from "@/utils/dataTypes";
import { defaultUser } from "@/utils/default";

const backendUrl = process.env.EXPO_PUBLIC_BACKENDURL;

const Sidebar = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  const router = useRouter();
  const { toggleSidebar, isOpen, user, isUserLoggedIn } = useSidebar();

  async function handleLogout() {
    await AsyncStorage.setItem("token", "");
    await AsyncStorage.setItem("user", "");
    router.push("/auth/login");
  }
  const name =
    (user?.firstName || user?.lastName) && isUserLoggedIn?.user
      ? user?.firstName + " " + user?.lastName
      : "Guest";
  const imageUrl =
    user?.profileImage && isUserLoggedIn?.user
      ? backendUrl + "/" + user?.profileImage
      : "https://avatar.iran.liara.run/public/boy?username=Ash";

  // console.log("user", user, "isUserLoggedIn", isUserLoggedIn);
  return (
    <View style={styles.container}>
      {isOpen && (
        <View style={styles.sidebar}>
          {/* Close Button */}
          <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
            <FontAwesome name="close" size={24} color="#000" />
          </TouchableOpacity>

          {/* Avatar and Greeting */}
          <View style={styles.userContainer}>
            <Image
              source={{
                uri: imageUrl,
              }}
              style={styles.avatar}
            />
            <View style={styles.greeting}>
              <Text style={styles.greetingText}>Hello</Text>
              <Text style={styles.guestText}>{name}</Text>
              <Text style={styles.guestText}>£ {user?.amount || 0}</Text>
            </View>
          </View>

          {/* Navigation Items with Icons */}
          <View style={styles.content_all}>
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
            {user?.role == "Patient" && (
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
            )}

            {user?.role == "Patient" && (
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => {
                  router.push("/pages/payment");
                  toggleSidebar();
                }}
              >
                <FontAwesome name="money" size={20} color="#000000" />
                <Text style={styles.navText}>Payment</Text>
              </TouchableOpacity>
            )}

            {user?.role == "Admin" && isUserLoggedIn?.user && (
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => {
                  router.push("/pages/admin");
                  toggleSidebar();
                }}
              >
                <FontAwesome name="crosshairs" size={20} color="#000000" />
                <Text style={styles.navText}>Manage</Text>
              </TouchableOpacity>
            )}

            {(user?.role == "Doctor" || user?.role == "Patient") && (
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => {
                  router.push("/pages/message");
                  toggleSidebar();
                }}
              >
                <FontAwesome name="envelope" size={20} color="#000000" />
                <Text style={styles.navText}>Message</Text>
              </TouchableOpacity>
            )}
            {user?.role !== "Admin" && isUserLoggedIn?.user && (
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => {
                  router.push("/pages/cart");
                  toggleSidebar();
                }}
              >
                <View className="flex-row items-center space-x-2">
                  <FontAwesome name="shopping-cart" size={20} color="#000000" />
                  <Text style={styles.navText}>Cart</Text>
                </View>

                {(isUserLoggedIn?.cart?.length || 0) > 0 && (
                  <View className="bg-red-600 w-6 h-6 rounded-full items-center justify-center ml-2">
                    <Text className="text-white text-xs font-bold">
                      {isUserLoggedIn?.cart?.length || 0}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            )}

            {user?.role == "Doctor" && (
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => {
                  router.push("/pages/doctorAdmin");
                  toggleSidebar();
                }}
              >
                <FontAwesome name="cube" size={20} color="#000000" />
                <Text style={styles.navText}>Admin</Text>
              </TouchableOpacity>
            )}

            {(user?.role == "Doctor" || user?.role == "Patient") && (
              <TouchableOpacity
                onPress={() => {
                  router.push("/pages/profile");
                  toggleSidebar();
                }}
                style={styles.navItem}
              >
                <FontAwesome name="user" size={20} color="#000000" />
                <Text style={styles.navText}>My Profile</Text>
              </TouchableOpacity>
            )}

            {(user?.role == "Doctor" || user?.role == "Patient") && (
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => {
                  router.push("/pages/settings");
                  toggleSidebar();
                }}
              >
                <FontAwesome name="cogs" size={20} color="#000000" />
                <Text style={styles.navText}>Settings</Text>
              </TouchableOpacity>
            )}

            {!isUserLoggedIn?.status ? (
              <TouchableOpacity
                style={styles.login}
                onPress={() => {
                  router.push("/auth/login");
                  toggleSidebar();
                }}
              >
                <FontAwesome name="sign-in" size={20} color="#fff" />
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.login}
                onPress={() => {
                  handleLogout();
                }}
              >
                <FontAwesome name="sign-in" size={20} color="#fff" />
                <Text style={styles.loginText}>Logout</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.header}>
          {/* Menu Icon Button */}
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
    marginLeft: 5,
    fontSize: 20,
    color: "#fff",
  },
});

export default Sidebar;
