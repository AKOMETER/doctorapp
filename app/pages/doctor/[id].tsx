import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { doctors } from "@/utils/data";
import Overview from "@/components/doctor_overview";

const Tab = createBottomTabNavigator();

function Tab2() {
  return (
    <View style={styles.container}>
      <Text>Tab 2 Content</Text>
    </View>
  );
}

export default function DoctorDetails() {
  const navigation = useNavigation();
  const { id }: { id: string } = useLocalSearchParams();
  const specialtyId = id?.split("=")[1] ? parseInt(id.split("=")[1], 10) : NaN;
  const doctor = doctors[specialtyId - 1];

  useEffect(() => {
    // Set header title dynamically
    navigation.setOptions({
      title: "Doctor Profile", // New title
      headerStyle: { backgroundColor: "#00b4d8" },
      headerTintColor: "#fff",
    });
  }, [navigation]);

  console.log(specialtyId);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: [styles.tabBarStyle],
        tabBarPosition: "top", // Ensure tabs appear at the top
      }}
    >
      {/* Overview Tab */}
      <Tab.Screen
        name="Overview"
        options={{ title: "Overview" }}
        children={() => <Overview doctor={doctor} id={specialtyId} />}
      />

      {/* Reviews Tab */}
      <Tab.Screen
        name="Reviews"
        component={Tab2}
        options={{ title: "Review" }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarStyle: {
    position: "absolute",
    elevation: 0, // Removes shadow for Android
    backgroundColor: "#fff",
    height: 60,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
