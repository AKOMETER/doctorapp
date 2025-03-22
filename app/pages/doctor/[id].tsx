import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Overview from "@/components/doctor_overview";
import apiRequest from "@/services/apiRequest";
import { DoctorType } from "@/utils/dataTypes";

const Tab = createBottomTabNavigator();

function Tab2() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text></Text>
    </View>
  );
}

export default function DoctorDetails() {
  const navigation = useNavigation();
  const { id }: { id: string } = useLocalSearchParams();
  const [doctor, setDoctor] = useState<DoctorType>();

  useEffect(() => {
    // Set header title dynamically
    navigation.setOptions({
      title: "Doctor Profile", // New title
      headerStyle: { backgroundColor: "#00b4d8" },
      headerTintColor: "#fff",
    });
  }, [navigation]);

  useEffect(() => {
    apiRequest.get(`/doctor/${id}`).then((res) => {
      if (res) setDoctor(res?.data.data);
    });
  }, []);

  return (
    // <Sidebar title="Doctor Profile">
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "white",
          height: 64, // h-16
          borderTopLeftRadius: 16, // rounded-t-lg
          borderTopRightRadius: 16,
          elevation: 0, // shadow-none
          shadowOpacity: 0,
        },
        tabBarPosition: "top", // Ensures tabs appear at the top
      }}
    >
      {/* Overview Tab */}
      <Tab.Screen
        name="Overview"
        options={{ title: "Overview" }}
        children={() => <Overview doctor={doctor} />}
      />

      {/* Reviews Tab */}
      <Tab.Screen
        name="Reviews"
        children={() => <Tab2 />}
        options={{ title: "Review" }}
      />
    </Tab.Navigator>
    // </Sidebar>
  );
}
