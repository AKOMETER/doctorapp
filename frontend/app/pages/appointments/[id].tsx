import StatusBadge from "@/components/StatusBadge";
import RescheduleComponent from "@/components/rescheduleButton";
import apiRequest from "@/services/apiRequest";
import { AppointmentType } from "@/utils/dataTypes";
import { showToast } from "@/utils/helperFunction";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function ShowAppointment() {
  const navigation = useNavigation();
  const { id }: { id: string } = useLocalSearchParams();
  const [appointment, setAppointment] = useState<AppointmentType | null>();

  useEffect(() => {
    navigation.setOptions({
      title: "Appointment Details ",
      headerStyle: { backgroundColor: "#00b4d8" },
      headerTintColor: "#fff",
    });
  }, [navigation]);

  useEffect(() => {
    apiRequest.get(`/appointment/get_one/${id}`).then((res) => {
      if (res?.data?.data) setAppointment(res?.data?.data);
    });
  }, []);

  async function handleStatusChange(status: string) {
    apiRequest
      .put(`/appointment/${appointment?.id}`, {
        status,
      })
      .then((res) => {
        console.log("res", res);
        showToast("success", "Cancelled", "Appointment Cancelled successfully");
      })
      .catch((err) => {
        showToast("error", "Error", "Failed to update appointment");
      });
  }

  const router = useRouter();

  return (
    <ScrollView className="bg-gray-100 p-4">
      <View className="items-center mb-6">
        {/* <FontAwesome name="binoculars" size={28} color="#4CAF50" /> */}
        <Text className="text-lg font-extrabold  text-green-700 mt-2">
          Virtual Hospital
        </Text>
      </View>

      {appointment ? (
        <ScrollView>
          <SafeAreaView>
            <View className="h-screen relative flex flex-column ">
              <View className="flex flex-wrap flex-row justify-between gap-3">
                <View className="bg-white items-center justify-center rounded-2xl p-4 w-[48%] shadow-md flex-row">
                  <Image
                    source={{ uri: appointment?.doctorProfile?.image }}
                    className="w-16 h-16 rounded-full" // Adjust image size as needed
                  />
                </View>

                <View className="bg-white rounded-2xl p-4 w-[48%] shadow-md">
                  <Text className="text-gray-700 text-sm font-medium">
                    {appointment?.doctorProfile?.user?.firstName +
                      " " +
                      appointment?.doctorProfile?.user?.lastName}
                  </Text>
                </View>

                <View className="bg-white rounded-2xl p-4 w-[48%] shadow-md items-center">
                  <MaterialIcons name="access-time" size={28} color="blue" />
                </View>

                <View className="bg-white rounded-2xl p-4 w-[48%] shadow-md">
                  <Text className="text-gray-700 text-sm font-medium">
                    {new Date(appointment?.dateTime).toDateString()}
                  </Text>
                </View>

                <View className="bg-white rounded-2xl p-4 w-[48%] shadow-md items-center">
                  <MaterialIcons name="access-time" size={28} color="blue" />
                </View>

                <View className="bg-white rounded-2xl p-4 w-[48%] shadow-md">
                  <Text className="text-gray-700 text-sm font-medium">
                    {new Date(appointment?.dateTime).toLocaleTimeString()}
                  </Text>
                </View>

                <View className="bg-white rounded-2xl p-4 w-[48%] shadow-md items-center">
                  <MaterialIcons name="place" size={28} color="blue" />
                </View>

                <View className="bg-white rounded-2xl p-4 w-[48%] shadow-md">
                  <Text className="text-gray-700 text-sm font-medium">
                    {appointment?.doctorProfile?.location}
                  </Text>
                </View>

                <View className="bg-white rounded-2xl p-4 w-[48%] shadow-md items-center">
                  <MaterialIcons name="check-circle" size={28} color="blue" />
                </View>

                <View className="bg-white rounded-2xl p-4 w-[48%] shadow-md">
                  <StatusBadge
                    status={
                      appointment?.status as
                        | "pending"
                        | "confirmed"
                        | "cancelled"
                        | "completed"
                    }
                  />
                </View>
              </View>

              <View className="fixed top-80 w-full">
                <RescheduleComponent id={id} />
                <Pressable
                  className="mb-9"
                  onPress={() => {
                    handleStatusChange("Cancelled");
                  }}
                >
                  <View>
                    <Text className="rounded-3xl w-full m-0 p-4 text-center text-white bg-red-500">
                      Cancel Appointment
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center px-4 mt-10">
          <Text className="text-lg font-semibold text-gray-600 mb-4">
            No Appointment Found
          </Text>
          <Pressable
            onPress={() => router.push("/pages/doctor")}
            className="bg-green-500 px-6 py-3 rounded-lg"
          >
            <Text className="text-white font-semibold text-sm">
              Update Medical Records
            </Text>
          </Pressable>
        </View>
      )}
      <Toast />
    </ScrollView>
  );
}
