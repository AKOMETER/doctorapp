import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";
import "../global.css";

export default function RootLayout() {
  return (
    <React.Fragment>
      <Stack>
        {/* Main Screens */}
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="parcel-details"
          options={{
            headerShown: false,
          }}
        />

        {/* Auth Screens */}
        <Stack.Screen
          name="auth/login"
          options={{
            title: "Login",
            headerStyle: { backgroundColor: "blue" },
            headerTintColor: "white",
          }}
        />
          <Stack.Screen
          name="auth/forget_password"
          options={{
            title: "forget_password",
            headerStyle: { backgroundColor: "blue" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="auth/register"
          options={{
            title: "Register",
            headerStyle: { backgroundColor: "blue" },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </React.Fragment>
  );
}
